<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodosController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('todos', TodosController::class);
Route::put('todos/{id}/toggleFavorite', [TodosController::class, 'toggleFavorite']);