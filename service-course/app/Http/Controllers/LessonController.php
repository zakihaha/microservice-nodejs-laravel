<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function index(Request $request, Lesson $lessons)
    {
        $lessons = $lessons->newQuery();

        if ($request->has('chapter_id')) {
            $lessons->where('chapter_id', $request->chapter_id);
        }

        return response()->json([
            'status' => 'success',
            'data' => $lessons->get()
        ]);
    }

    public function show(Lesson $lesson)
    {
        return response()->json([
            'status' => 'success',
            'data' => $lesson
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'chapter_id' => 'required|integer|exists:chapters,id',
            'name' => 'required|string',
            'video' => 'required|string',
        ]);

        $lesson = Lesson::create($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $lesson
        ]);
    }

    public function update(Request $request, Lesson $lesson)
    {
        $request->validate([
            'chapter_id' => 'required|integer|exists:chapters,id',
            'name' => 'required|string',
            'video' => 'required|string',
        ]);

        $lesson->update($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $lesson
        ]);
    }

    public function destroy(Lesson $lesson)
    {
        $lesson->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Lesson deleted'
        ]);
    }
}
