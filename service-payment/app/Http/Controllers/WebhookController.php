<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\PaymentLog;
use Illuminate\Http\Request;

class WebhookController extends Controller
{
    public function midtransHandler(Request $request)
    {
        $data = $request->all();

        $signatureKey = $data['signature_key'];
        $orderId = $data['order_id'];
        $statusCode = $data['status_code'];
        $grossAmount = $data['gross_amount'];
        $fraudStatus = $data['fraud_status'];
        $transactionStatus = $data['transaction_status'];
        $paymentType = $data['payment_type'];

        $serverKey = env('MIDTRANS_SERVER_KEY');

        $isValid = hash_equals($signatureKey, hash('sha512', $orderId . $statusCode . $grossAmount . $serverKey));

        if (!$isValid) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid Request',
            ], 400);
        }

        $orderIdNumber = explode('-', $orderId)[0];
        $order = Order::find($orderIdNumber);

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order not found',
            ], 404);
        }

        if ($order->status === 'success') {
            return response()->json([
                'status' => 'error',
                'message' => 'Order already success',
            ], 405);
        }

        if ($statusCode === '200') {
            $order->status = 'success';
            $order->save();
        }

        // transactionStatus handling logic
        if ($transactionStatus == 'capture') {
            if ($fraudStatus == 'challenge') {
                $order->status = 'challenge';
            } else if ($fraudStatus == 'accept') {
                $order->status = 'success';
            }
        } else if ($transactionStatus == 'settlement') {
            $order->status = 'success';
        } else if (
            $transactionStatus == 'cancel' ||
            $transactionStatus == 'deny' ||
            $transactionStatus == 'expire'
        ) {
            $order->status = 'failure';
        } else if ($transactionStatus == 'pending') {
            $order->status = 'pending';
        }

        $order->save();

        $logOrder = [
            'order_id' => $orderIdNumber,
            'payment_type' => $paymentType,
            'status' => $transactionStatus,
            'raw_response' => json_encode($data),
        ];

        PaymentLog::create($logOrder);

        if ($order->status === 'success') {
            // do something
        }

        return response()->json([
            'status' => 'success',
        ], 200);
    }
}
