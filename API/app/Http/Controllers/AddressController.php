<?php

namespace App\Http\Controllers;

use App\User;
use App\Address;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\AddressResource;

class AddressController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, User $user)
    {
        //Create new or take exising address
        $address = Address::create
        (
            ['user_id' => $user->id]
             + 
             $request->all()
        );

        //Update user resource: set 'address_id' to newly created address' id
        $user->update(['address_id' => $address->id]);

        return new AddressResource($address);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //Get address by user id
        $address = Address::where('user_id', $user->id)->first();
        //Update it
        $address->update($request->all());

        return new AddressResource($address);
    }

}
