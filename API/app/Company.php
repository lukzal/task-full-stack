<?php

namespace App;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $guarded = ['id'];
    public $timestamps = false;

    public function user(){
        return $this->belongsTo(User::Class);
    }
}
