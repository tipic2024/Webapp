<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use Illuminate\Http\Request;

class EnquiryController extends Enquiry
{
    public function store(Request $request)
    {
        // Validate request input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'mobileNumber' => 'required|string|max:255',
            'standard' => 'required|string|max:255',
            'gender' => 'required|string|max:255'
        ]);

        // Create new Enquiry record
        $Enquiry = new Enquiry;
        $Enquiry->name = $request->input('name');
        $Enquiry->email = $request->input('email');
        $Enquiry->mobileNumber = $request->input('mobileNumber');
        $Enquiry->standard = $request->input('standard');
        $Enquiry->gender = $request->input('gender');
        $Enquiry->save();

        return response()->json(['data' => 'SUCCESS'], 200);
    }

    public function index()
    {
        $contacts = Enquiry::all();

        return response()->json($contacts, 200);
    }

}
