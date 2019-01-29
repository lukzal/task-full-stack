<?php

use App\User;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Users apiResource
Route::apiResource('users', 'UserController');

//Routes for Addresses
Route::post('users/{user}/address', 'AddressController@store');
Route::put('users/{user}/address', 'AddressController@update');

//Routes for Companies
Route::post('users/{user}/company', 'CompanyController@store');
Route::put('users/{user}/company', 'CompanyController@update');
