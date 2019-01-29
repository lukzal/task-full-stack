<?php

use App\Address;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class AddressTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        Address::truncate();

        $faker = \Faker\Factory::create();

        for ($i=0; $i < 10; $i++) { 
            Address::create([
                'street' => $faker->streetName,
                'suite' => $faker->buildingNumber,
                'city' => $faker->city,
                'zipcode' => $faker->postcode,
                'lat' => $faker->latitude($min = -90, $max = 90),
                'lng' => $faker->longitude($min = -180, $max = 180),
                'user_id' => ($i+1),
            ]);
        }

        Schema::enableForeignKeyConstraints();
    }
}
