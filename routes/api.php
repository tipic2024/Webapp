<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController; 
use App\Http\Controllers\ProductController; 
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\SubCategoryController; 
use App\Http\Controllers\SubSubCategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ExpenseTypeController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\FileUpload;
use App\Http\Middleware\Authorization;

use App\Http\Controllers\InvoiceCustomizationController;
use App\Http\Controllers\MultiformsController;

//public API's
Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);
Route::post('/mobileLogin',[AuthController::class, 'mobileLogin']);

//ContactUs
// Route::get('/contactUs', [ContactUsController::class, 'index']);

Route::get('/enquiry', [EnquiryController::class, 'index']);



//Secured API's
Route::group(['middleware'=>['auth:sanctum']], function(){
    Route::get('/products',[ProductController::class, 'products']);
    Route::post('/changePassword',[AuthController::class, 'changePassword']);
    Route::post('/logout',[AuthController::class, 'logout']);
    Route::post('/registerUser',[AuthController::class, 'registerUser']);
    Route::put('/appUsers',[AuthController::class, 'update']);
    Route::get('/appUsers',[AuthController::class, 'allUsers']);
    Route::resource('product',ProductController::class);
    Route::resource('order',OrderController::class);
    Route::get('/credit',[OrderController::class,'getCredit']);
    Route::post('/updateAmount',[OrderController::class,'updateAmount']);
    Route::get('/reportSales', [OrderController::class, 'Sales']);
    Route::get('/totalDeliveries', [OrderController::class, 'TotalDeliverie']);
    Route::resource('expenseType',ExpenseTypeController::class);
    Route::resource('expense',ExpenseController::class);
    Route::post('/newStock',[ProductController::class, 'newStock'])->name('newStock');
    Route::get('/lowStock',[ProductController::class, 'lowStock'])->name('lowStock');
    Route::get('/categories',[CategoryController::class, 'categories']);
    Route::resource('category',CategoryController::class);
    Route::resource('subCategory',SubCategoryController::class);
    Route::resource('subSubCategory',SubSubCategoryController::class);
    Route::post('/product/updateQty', [ProductController::class, 'updateQty']);
    Route::post('/fileUpload', [FileUpload::class, 'fileUpload']);
    Route::get('/monthlyReport', [OrderController::class, 'getMonthlyReport']);
   Route::post('/invoiceCustomization', [InvoiceCustomizationController::class, 'store']);

   Route::middleware(['auth', 'blocked'])->group(function () {
    Route::get('/contactUs', [MultiformsController::class, 'contactUs']);
    Route::get('/enquiry', [MultiformsController::class, 'enquiry']);
    Route::get('/buy', [MultiformsController::class, 'buy']);
    Route::get('/sells', [MultiformsController::class, 'sells']);
    Route::get('/other', [MultiformsController::class, 'other']);

});

});

Route::middleware(['auth:sanctum','role:admin'])->group(function () {
    Route::get('/monthlyReport', [OrderController::class, 'getMonthlyReport']);

    

});

Route::middleware(['auth:sanctum','role:user'])->group(function () {
Route::get('/monthlyReport', [OrderController::class, 'getMonthlyReport']);

});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/invoiceCustomization', [InvoiceCustomizationController::class, 'showInfo']);

// routes/api.php

;




