<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckIfBlocked
{

    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is authenticated
    $user = Auth::user();
    if ($user && $user->blocked != 0) {

        return response()->json([
                'status' => 403,
                'message' => 'Your account is blocked. Please contact support.'
            ], 403);
        }

    // Allow the request to proceed
    return $next($request);
    }
}
