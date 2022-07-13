<?php

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
