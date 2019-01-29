<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        User::truncate();

        $faker = \Faker\Factory::create();

        for ($i=0; $i < 10; $i++) { 
            User::create([
                'name' => $faker->name,
                'username' => $faker->userName,
                'email' => $faker->email,
                'address_id' => ($i+1),
                'phone' => $faker->e164PhoneNumber,
                'website' => $faker->domainName,
                'company_id' => ($i+1),
            ]);
        }

        Schema::enableForeignKeyConstraints();
    }
}
