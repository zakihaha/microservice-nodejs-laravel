<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected $fillable = [
        "mentor_id",
        "name",
        "certificate",
        "thumbnail",
        "type",
        "status",
        "price",
        "level",
        "description"
    ];

    public function mentor()
    {
        return $this->belongsTo(Mentor::class);
    }

    public function chapters()
    {
        return $this->hasMany(Chapter::class)->orderBy('id', 'asc');
    }

    public function images()
    {
        return $this->hasMany(ImageCourse::class)->orderBy('id', 'asc');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
