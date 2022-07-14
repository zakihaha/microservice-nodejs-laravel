<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected $dillable = [
        'course_id',
        'user_id',
        'rating',
        'note',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
