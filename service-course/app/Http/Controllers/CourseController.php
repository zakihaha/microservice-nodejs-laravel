<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Course;
use App\Models\MyCourse;
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
        $course->load('images', 'mentor', 'chapters.lessons', 'reviews');

        // change images url
        foreach ($course->images as $image) {
            $image->image = env('APP_URL') . '/storage/' . $image->image;
        }

        if (count($course['reviews']) > 0) {
            $userIds = $course['reviews']->pluck('user_id')->toArray();
            $users = getUsersByIds($userIds);

            // combine course reviews with users
            foreach ($course['reviews'] as $key => $review) {
                $course['reviews'][$key]['user'] = $users['data'][array_search($review['user_id'], array_column($users['data'], 'id'))];
            }
        }

        $course['total_student'] = MyCourse::where('course_id', $course->id)->count();

        $countChapterVideos = Chapter::where('course_id', $course->id)->withCount('lessons')->get()->toArray();
        $course['total_videos'] = array_sum(array_column($countChapterVideos, 'lessons_count'));

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
            "price" => 'integer|required_if:type,premium|min:2',
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
