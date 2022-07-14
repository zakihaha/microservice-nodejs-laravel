<?php

namespace App\Http\Controllers;

use App\Models\ImageCourse;
use Illuminate\Http\Request;

class ImageCourseController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'course_id' => 'required|integer|exists:courses,id',
            'image' => 'required|string',
        ]);

        $imageCourse = ImageCourse::create($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $imageCourse
        ]);
    }

    public function destroy(ImageCourse $imageCourse)
    {
        $imageCourse->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Image course deleted'
        ]);
    }
}
