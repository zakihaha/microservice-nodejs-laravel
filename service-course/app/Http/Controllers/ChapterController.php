<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Course;
use Illuminate\Http\Request;

class ChapterController extends Controller
{
    public function index(Request $request, Chapter $chapters)
    {
        $chapters = $chapters->newQuery();

        if ($request->has('course_id')) {
            $chapters->where('course_id', $request->course_id);
        }

        return response()->json([
            'status' => 'success',
            'data' => $chapters->get()
        ]);
    }

    public function show(Chapter $chapter)
    {
        return response()->json([
            'status' => 'success',
            'data' => $chapter
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            "course_id" => 'required|integer|exists:courses,id',
            "name" => 'required|string'
        ]);

        $chapter = Chapter::create($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $chapter
        ]);
    }

    public function update(Request $request, Chapter $chapter)
    {
        $request->validate([
            "course_id" => 'integer|exists:courses,id',
            "name" => 'string'
        ]);

        $chapter->update($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $chapter
        ]);
    }

    public function destroy(Chapter $chapter)
    {
        $chapter->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Chapter deleted'
        ]);
    }
}
