<?php

namespace App\Http\Controllers;

use App\Models\Multiforms;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MultiformsController extends Controller
{
    //Contact Us   formType = 0
    public function contactUs()
    {
        // Get the authenticated user
        $user = Auth::user();

        // Check if the user is authenticated and has a company_id
        if (!$user || !$user->company_id) {
            return response()->json([
                'status' => '401',
                'message' => 'Unauthorized: Company ID not found.'
            ], 401);
        }

        // Get the company_id of the authenticated user
        $companyId = $user->company_id;
        $formType = 0;

        // Fetch the records from the Multiforms table where company_id matches
        $multiforms = Multiforms::where('company_id', $companyId)
        ->where('form_type', $formType)
        ->get();

        // Check if there is any data found
        if ($multiforms->isEmpty()) {
            return response()->json([
                'status' => '404',
                'message' => 'No data found for the given company ID.'
            ], 404);
        }

        // Return the data as JSON
        return response()->json([
            'status' => '200',
            'multiforms' => $multiforms
        ], 200);
    }

    // Enquiry  formType = 1
    public function enquiry()
    {
        $user = Auth::user();

        if (!$user || !$user->company_id) {
            return response()->json([
                'status' => '401',
                'message' => 'Unauthorized: Company ID not found.'
            ], 401);
        }

        $companyId = $user->company_id;
        $formType = 1;

        $multiforms = Multiforms::where('company_id', $companyId)
        ->where('form_type', $formType)
        ->get();

        if ($multiforms->isEmpty()) {
            return response()->json([
                'status' => '404',
                'message' => 'No data found for the given company ID.'
            ], 404);
        }

        return response()->json([
            'status' => '200',
            'multiforms' => $multiforms
        ], 200);
    }

    // Buy form type = 2
    public function buy()
    {
        $user = Auth::user();

        if (!$user || !$user->company_id) {
            return response()->json([
                'status' => '401',
                'message' => 'Unauthorized: Company ID not found.'
            ], 401);
        }

        $companyId = $user->company_id;
        $formType = 2;

        $multiforms = Multiforms::where('company_id', $companyId)
        ->where('form_type', $formType)
        ->get();

        if ($multiforms->isEmpty()) {
            return response()->json([
                'status' => '404',
                'message' => 'No data found for the given company ID.'
            ], 404);
        }

        return response()->json([
            'status' => '200',
            'multiforms' => $multiforms
        ], 200);
    }

    //Sell form Type-3
    public function sells()
    {
        $user = Auth::user();

        if (!$user || !$user->company_id) {
            return response()->json([
                'status' => '401',
                'message' => 'Unauthorized: Company ID not found.'
            ], 401);
        }

        $companyId = $user->company_id;
        $formType = 3;

        $multiforms = Multiforms::where('company_id', $companyId)
        ->where('form_type', $formType)
        ->get();

        if ($multiforms->isEmpty()) {
            return response()->json([
                'status' => '404',
                'message' => 'No data found for the given company ID.'
            ], 404);
        }
        
        return response()->json([
            'status' => '200',
            'multiforms' => $multiforms
        ], 200);
    }

    //Any other data form-type - 4 
    public function other()          //change name according to requirement
    {
        $user = Auth::user();

        if (!$user || !$user->company_id) {
            return response()->json([
                'status' => '401',
                'message' => 'Unauthorized: Company ID not found.'
            ], 401);
        }

        $companyId = $user->company_id;
        $formType = 4;

        $multiforms = Multiforms::where('company_id', $companyId)
        ->where('form_type', $formType)
        ->get();

        if ($multiforms->isEmpty()) {
            return response()->json([
                'status' => '404',
                'message' => 'No data found for the given company ID.'
            ], 404);
        }
        
        return response()->json([
            'status' => '200',
            'multiforms' => $multiforms
        ], 200);
    }
}
