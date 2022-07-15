<?php

use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ImageCourseController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\MentorController;
use App\Http\Controllers\MyCourseController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;

Route::prefix('mentors')->group(function () {
    Route::get('', [MentorController::class, 'index']);
    Route::get('{mentor:id}', [MentorController::class, 'show']);
    Route::post('', [MentorController::class, 'create']);
    Route::put('{mentor:id}', [MentorController::class, 'update']);
    Route::delete('{mentor:id}', [MentorController::class, 'destroy']);
});

Route::prefix('courses')->group(function () {
    Route::get('', [CourseController::class, 'index']);
    Route::get('{course:id}', [CourseController::class, 'show']);
    Route::post('', [CourseController::class, 'create']);
    Route::put('{course:id}', [CourseController::class, 'update']);
    Route::delete('{course:id}', [CourseController::class, 'destroy']);
});

Route::prefix('chapters')->group(function () {
    Route::get('', [ChapterController::class, 'index']);
    Route::get('{chapter:id}', [ChapterController::class, 'show']);
    Route::post('', [ChapterController::class, 'create']);
    Route::put('{chapter:id}', [ChapterController::class, 'update']);
    Route::delete('{chapter:id}', [ChapterController::class, 'destroy']);
});

Route::prefix('lessons')->group(function () {
    Route::get('', [LessonController::class, 'index']);
    Route::get('{lesson:id}', [LessonController::class, 'show']);
    Route::post('', [LessonController::class, 'create']);
    Route::put('{lesson:id}', [LessonController::class, 'update']);
    Route::delete('{lesson:id}', [LessonController::class, 'destroy']);
});

Route::prefix('image-courses')->group(function () {
    Route::post('', [ImageCourseController::class, 'create']);
    Route::delete('{imageCourse:id}', [ImageCourseController::class, 'destroy']);
});

Route::prefix('my-courses')->group(function () {
    Route::get('', [MyCourseController::class, 'index']);
    Route::post('', [MyCourseController::class, 'create']);
});

Route::prefix('reviews')->group(function () {
    Route::post('', [ReviewController::class, 'create']);
    Route::put('{review:id}', [ReviewController::class, 'update']);
    Route::delete('{review:id}', [ReviewController::class, 'destroy']);
});
