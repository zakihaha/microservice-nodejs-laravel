<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(Request $request, Course $courses)
    {
        $courses = $courses->newQuery();

        if ($request->has('q')) {
            $courses->where('name', 'like', "%" . $request->q . "%");
        }

        if ($request->has('status')) {
            $courses->where('status', $request->status);
        }

        return response()->json([
            'status' => 'success',
            'data' => $courses->paginate(10)
        ]);
    }

    public function show(Course $course)
    {
        return response()->json([
            'status' => 'success',
            'data' => $course
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            "mentor_id" => 'required|integer|exists:mentors,id',
            "name" => 'required|string',
            "certificate" => 'required|boolean',
            "thumbnail" => 'string|url',
            "type" => 'required|in:free,premium',
            "status" => 'required|in:draft,published',
            "price" => 'integer',
            "level" => 'required|in:all-level,beginner,intermediate,advanced',
            "description" => 'string',
        ]);

        $course = Course::create($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $course
        ]);
    }

    public function update(Request $request, Course $course)
    {
        $request->validate([
            "mentor_id" => 'integer|exists:mentors,id',
            "name" => 'string',
            "certificate" => 'boolean',
            "thumbnail" => 'string|url',
            "type" => 'in:free,premium',
            "status" => 'in:draft,published',
            "price" => 'integer',
            "level" => 'in:all-level,beginner,intermediate,advanced',
            "description" => 'string',
        ]);

        $course->update($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $course
        ]);
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Course deleted'
        ]);
    }
}
