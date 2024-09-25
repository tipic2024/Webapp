<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\CompanyInfo;
use Illuminate\Support\Facades\Auth;

class InvoiceCustomizationController extends Controller
{  
    // public function get(Request $request)
    // {
    //     $companyId = $request->query('company_id');
    
    //     // Retrieve the company information by the provided company_id
    //     $data = CompanyInfo::where('company_id', $companyId)->first();
    
    //     if ($data) {
    //         return response()->json([
    //             'message' => 'Company info retrieved successfully',
    //             'data' => $data
    //         ], 200);
    //     } else {
    //         return response()->json([
    //             'message' => 'Company info not found'
    //         ], 404);
    //     }
    // }
    


 public function store(Request $request)
{
    $request->validate([
        'companyName'=> 'required|string|max:255',
        'companyId'=> 'required|string|max:255',
        'land_mark' => 'required|string|max:255',
        'Tal' => 'required|string|max:255',
        'Dist' => 'required|string|max:255',
        'Pincode' => 'required|string',
        'phone_no' => 'required|string|max:15',
        'bank_name' => 'required|string|max:255',
        'account_no' => 'required|string|max:255',
        'IFSC' => 'required|string|max:255',
        'logo' => 'required|string',
        'sign' => 'required|string', 
    ]);

    // $logoPath = null;
    // $signPath = null;

    // // Handle logo upload
    // if ($request->hasFile('logo')) {
    //     $logo = $request->file('logo');
    //     $logoPath = $logo->store('resources/react/assets/images', 'public');
    // }

    // // Handle sign upload
    // if ($request->hasFile('sign')) {
    //     $sign = $request->file('sign');
    //     $signPath = $sign->store('signs', 'public');
    // }

    // Save the company info to the database
    $CompanyInfo = new CompanyInfo;
    $CompanyInfo->company_name = $request->input('companyName');
    $CompanyInfo->company_id = $request->input('companyId');
    $CompanyInfo->land_mark = $request->input('land_mark');
    $CompanyInfo->tal = $request->input('Tal');
    $CompanyInfo->dist = $request->input('Dist');
    $CompanyInfo->pincode = $request->input('Pincode');
    $CompanyInfo->phone_no = $request->input('phone_no');
    $CompanyInfo->bank_name = $request->input('bank_name');
    $CompanyInfo->account_no = $request->input('account_no');
    $CompanyInfo->ifsc_code = $request->input('IFSC');
    $CompanyInfo->logo = $request->input('logo');
    $CompanyInfo->sign = $request->input('sign');
    $CompanyInfo->block_status = 0;

    $CompanyInfo->save();

    return response()->json(['message' => 'Company info saved successfully'], 200);
}

  public function showInfo(){
    // $user=Auth::user();
    // $ComapanyId = $user->company_id;
    
    $CompanyInfo = CompanyInfo::where('company_id', 1)->get();
    return response()->json([
        'status' => '200',
        'CompanyInfo' => $CompanyInfo
    ]);
  }


}
