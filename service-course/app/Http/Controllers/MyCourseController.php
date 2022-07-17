<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\MyCourse;
use Illuminate\Http\Request;

class MyCourseController extends Controller
{
    public function index(Request $request, MyCourse $myCourses)
    {
        $myCourses = $myCourses->newQuery();

        if ($request->has('user_id')) {
            $myCourses->where('user_id', $request->user_id);
        }

        return response()->json([
            'status' => 'success',
            'data' => $myCourses->with('course')->get()
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'course_id' => 'required|integer|exists:courses,id',
            'user_id' => 'required|integer',
        ]);

        $user = getUser($request->user_id);

        if ($user['status'] == 'error') {
            return response()->json([
                'status' => $user['status'],
                'http_code' => $user['http_code'],
                'message' => $user['message']
            ], $user['http_code']);
        }

        $isExistMyCourse = MyCourse::where('course_id', $request->course_id)
            ->where('user_id', $request->user_id)
            ->exists();

        if ($isExistMyCourse) {
            return response()->json([
                'status' => 'error',
                'message' => 'You have already enrolled in this course'
            ], 409);
        }

        $course = Course::find($request->course_id);

        if ($course->type === 'premium') {
            $order = orderCourse([
                'user' => $user['data'],
                'course' => $course,
            ]);

            if ($order['status'] == 'error') {
                return response()->json([
                    'status' => $order['status'],
                    'http_code' => $order['http_code'],
                    'message' => $order['message']
                ], $order['http_code']);
            }

            return response()->json([
                'status' => $order['status'],
                'data' => $order['data']
            ], 201);
        }

        $myCourse = MyCourse::create($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $myCourse
        ]);
    }

    public function createPremiumCourse(Request $request)
    {
        $myCourse = MyCourse::create($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $myCourse
        ]);
    }
}
