## Steps Before Running app
1. Install Node and npm
2. Run commands:

`composer install`
`npm install`
`php artisan key:generate`

3. Configure .env and \config\database.php files
4. run commands:

`php artisan migrate`
`npm run dev`


## Seeding Database

If you want to seed database with random users run this command:

`php artisan db:seed`