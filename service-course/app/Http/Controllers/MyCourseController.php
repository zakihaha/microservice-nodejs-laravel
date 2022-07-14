<?php

namespace App\Http\Controllers;

use App\Models\MyCourse;
use Illuminate\Http\Request;

class MyCourseController extends Controller
{
    public function index(Request $request, MyCourse $myCourses)
    {
        $myCourses = $myCourses->newQuery();

        if ($request->has('chapter_id')) {
            $myCourses->where('chapter_id', $request->chapter_id);
        }

        return response()->json([
            'status' => 'success',
            'data' => $myCourses->get()
        ]);
    }

    public function show(MyCourse $myCourse)
    {
        return response()->json([
            'status' => 'success',
            'data' => $myCourse
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

        $myCourse = MyCourse::create($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $myCourse
        ]);
    }

    public function update(Request $request, MyCourse $myCourse)
    {
        $request->validate([
            'course_id' => 'required|integer|exists:courses,id',
            'user_id' => 'required|integer',
        ]);

        $myCourse->update($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $myCourse
        ]);
    }

    public function destroy(MyCourse $myCourse)
    {
        $myCourse->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'MyCourse deleted'
        ]);
    }
}
