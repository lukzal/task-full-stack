<?php

namespace App;

use App\Address;
use App\Company;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $guarded = ['id'];
    public $timestamps = false;

    public function address(){
        return $this->hasOne(Address::Class);
    }

    public function company(){
        return $this->hasOne(Company::Class);
    }
}
