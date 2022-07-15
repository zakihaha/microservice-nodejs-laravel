<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'course_id' => 'required|integer|exists:courses,id',
            'user_id' => 'required|integer',
            'rating' => 'required|integer|between:1,5',
            'note' => 'string',
        ]);

        $user = getUser($request->user_id);

        if ($user['status'] == 'error') {
            return response()->json([
                'status' => 'error',
                'message' => $user['message']
            ], $user['http_code']);
        }

        $isExistReview = Review::where('course_id', $request->course_id)
            ->where('user_id', $request->user_id)
            ->exists();

        if ($isExistReview) {
            return response()->json([
                'status' => 'error',
                'message' => 'You have already reviewed this course'
            ], 409);
        }

        $review = Review::create($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $review
        ]);
    }

    public function update(Request $request, Review $review)
    {
        $request->validate([
            'rating' => 'integer|between:1,5',
            'note' => 'string',
        ]);

        $review->update([
            'rating' => $request->rating,
            'note' => $request->note,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $review
        ]);
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Review deleted'
        ]);
    }
}
