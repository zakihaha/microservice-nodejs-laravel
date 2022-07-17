<?php

use Illuminate\Support\Facades\Http;

function createPremiumAccess($data)
{
    $url = env('SERVICE_COURSE_URL').'api/my-courses/premium';
    try {
        $response = Http::post($url, $data);

        $responseData = $response->json();
        $responseData['http_code'] = $response->getStatusCode();
        return $responseData;
    } catch (\Throwable $th) {
        return [
            'status' => 'error',
            'message' => $th->getMessage(),
            'http_code' => $th->getCode(),
        ];
    }
}
