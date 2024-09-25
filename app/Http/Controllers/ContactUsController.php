<?php

namespace App\Http\Controllers;

use App\Models\ContactUs;
use Illuminate\Http\Request;

class ContactUsController extends Controller
{
    // Store contact form data
    public function store(Request $request)
    {
        // Validate request input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'mobile' => 'required|string|max:255',
            'queries' => 'required|string|max:255'
        ]);

        // Create new ContactUs record
        $ContactUs = new ContactUs;
        $ContactUs->name = $request->input('name');
        $ContactUs->email = $request->input('email');
        $ContactUs->mobile = $request->input('mobile');
        $ContactUs->queries = $request->input('queries');
        $ContactUs->save();

        return response()->json(['data' => 'SUCCESS'], 200);
    }

    // Show all contact information
    public function index()
    {
        $contacts = ContactUs::all();

        return response()->json($contacts, 200);
    }
}
