<?php

use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\MentorController;
use Illuminate\Http\Request;
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
