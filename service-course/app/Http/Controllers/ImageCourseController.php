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
            'image' => 'required',
        ]);

        if (request()->file('image')) {
            $image = request()->file('image');
            $imageUrl = $image->storeAs("images",\Str::random(6) . ".{$image->extension()}");
        } else {
            $imageUrl = null;
        }

        $imageCourse = ImageCourse::create([
            'course_id' => request()->course_id,
            'image' => $imageUrl,
        ]);

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
