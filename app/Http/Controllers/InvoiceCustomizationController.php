<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\CompanyInfo;

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
        'land_mark' => 'required|string|max:255',
        'Tal' => 'required|string|max:255',
        'Dist' => 'required|string|max:255',
        'Pincode' => 'required|integer',
        'phone_no' => 'required|string|max:15',
        'bank_name' => 'required|string|max:255',
        'account_no' => 'required|string|max:255',
        'IFSC' => 'required|string|max:255',
        'logo' => 'required|string',
        'sign' => 'required|string', // Assuming sign is also an image file
    ]);

    $logoPath = null;
    $signPath = null;

    // Handle logo upload
    if ($request->hasFile('logo')) {
        $logo = $request->file('logo');
        $logoPath = $logo->store('resources/react/assets/images', 'public');
    }

    // Handle sign upload
    if ($request->hasFile('sign')) {
        $sign = $request->file('sign');
        $signPath = $sign->store('signs', 'public');
    }

    // Save the company info to the database
    $CompanyInfo = new CompanyInfo;
    $CompanyInfo->company_name = "Samarth Nursary 3";
    $CompanyInfo->company_id = 11;
    $CompanyInfo->land_mark = $request->input('land_mark');
    $CompanyInfo->tal = $request->input('Tal');
    $CompanyInfo->dist = $request->input('Dist');
    $CompanyInfo->pincode = $request->input('Pincode');
    $CompanyInfo->phone_no = $request->input('phone_no');
    $CompanyInfo->bank_name = $request->input('bank_name');
    $CompanyInfo->account_no = $request->input('account_no');
    $CompanyInfo->ifsc_code = $request->input('IFSC');
    $CompanyInfo->logo = $logoPath;  // Save the logo path
    $CompanyInfo->sign = $signPath;  // Save the sign path
    $CompanyInfo->block_status = 1;

    $CompanyInfo->save();

    return response()->json(['message' => 'Company info saved successfully'], 200);
}

}
