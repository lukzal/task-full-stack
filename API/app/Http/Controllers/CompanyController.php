<?php

namespace App\Http\Controllers;

use App\User;
use App\Company;
use Illuminate\Http\Request;
use App\Http\Resources\CompanyResource;

class CompanyController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, User $user)
    {
        //Create new company and assign it to user
        $company = Company::create
        (
            ['user_id' => $user->id]
             + 
             $request->all()
        );
        
        //Update user resource: set 'company_id' to newly created company's id
        $user->update(['company_id' => $company->id]);

        return new CompanyResource($company);
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
        //Get company by user id
        $company = Company::where('user_id', $user->id)->first();
        //Update it
        $company->update($request->all());

        return new CompanyResource($company);
    }

}
