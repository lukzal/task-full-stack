<?php

use App\Company;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class CompaniesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        Company::truncate();

        $faker = \Faker\Factory::create();

        for ($i=0; $i < 10; $i++) { 
            Company::create([
                'name' => $faker->company,
                'catchPhrase' => $faker->catchPhrase,
                'bs' => $faker->bs,
                'user_id' => ($i+1),
            ]);
        }

        Schema::enableForeignKeyConstraints();
    }
}
