<?php

namespace App\Http\Controllers;

use App\Models\Mentor;
use Illuminate\Http\Request;

class MentorController extends Controller
{
    public function index()
    {
        $mentors = Mentor::all();

        return response()->json([
            'status' => 'success',
            'data' => $mentors
        ]);
    }

    public function show(Mentor $mentor)
    {
        return response()->json([
            'status' => 'success',
            'data' => $mentor
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'profile' => 'required|url',
            'profession' => 'required|string',
            'email' => 'required|email',
        ]);

        $mentor = Mentor::create($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $mentor
        ]);
    }

    public function update(Request $request, Mentor $mentor)
    {
        $request->validate([
            'name' => 'string',
            'profile' => 'url',
            'profession' => 'string',
            'email' => 'email',
        ]);

        $mentor->update($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $mentor
        ]);
    }

    public function destroy(Mentor $mentor)
    {
        $mentor->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Mentor deleted'
        ]);
    }
}
