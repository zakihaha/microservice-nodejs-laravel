<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\WebhookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('orders')->group(function () {
    Route::get('', [OrderController::class, 'index']);
    Route::post('', [OrderController::class, 'create']);
});

Route::post('webhook', [WebhookController::class, 'midtransHandler']);
