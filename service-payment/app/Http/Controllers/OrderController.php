<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request, Order $orders)
    {
        $orders = $orders->newQuery();

        if ($request->has('user_id')) {
            $orders->where('user_id', $request->get('user_id'));
        }

        return response()->json([
            'status' => 'success',
            'data' => $orders->get(),
        ]);
    }

    public function create(Request $request)
    {
        $user = $request->user;
        $course = $request->course;

        $order = Order::create([
            'user_id' => $user['id'],
            'course_id' => $course['id'],
        ]);

        $midtransParams = [
            'transaction_details' => [
                'order_id' => $order->id . '-' . \Str::random(5),
                'gross_amount' => $course['price']
            ],
            'item_details' => [
                [
                    'id' => $course['id'],
                    'price' => $course['price'],
                    'quantity' => 1,
                    'name' => $course['name'],
                    'brand' => 'Zaki',
                    'category' => 'Course Programming',
                ]
            ],
            'customer_details' => [
                'first_name' => $user['name'],
                'email' => $user['email'],
            ],
        ];

        $midtransSnapUrl = $this->getMidtransSnapUrl($midtransParams);

        $order->snap_url = $midtransSnapUrl;

        $order->metadata = [
            'user_id' => $user['id'],
            'course_id' => $course['id'],
            'course_price' => $course['price'],
            'course_name' => $course['name'],
            'course_thumbnail' => $course['thumbnail'],
            'course_level' => $course['level'],
        ];

        $order->save();

        return response()->json([
            'status' => 'success',
            'data' => $order
        ]);
    }

    private function getMidtransSnapUrl($params)
    {
        \Midtrans\Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        \Midtrans\Config::$isProduction = (bool) env('MIDTRANS_IS_PRODUCTION');
        \Midtrans\Config::$isSanitized = true;
        \Midtrans\Config::$is3ds = (bool) env('MIDTRANS_IS_3DS');

        $snapUrl = \Midtrans\Snap::createTransaction($params)->redirect_url;
        return $snapUrl;
    }
}
