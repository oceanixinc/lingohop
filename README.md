### Welcome to Lingohop

#### Server configuration

1. Clone the project and go to the 'server' folder
2. Activate your virtual environment
3. Go inside 'server' folder where you can find 'requirements.txt'
4. Run - `pip install -r requirements.txt`
5. Create database with command - `createdb lingohop`
6. Run - `python manage.py migrate`
7. Run - `python manage.py runserver`

#### Client configuration

1. Go to 'client' folder
2. run `npm install`
3. run `npm start`

#### Database configuration

1. please create .env file on the folder where manage.py exists
2. in the .env file write the database url in the following format:

	DATABASE_URL=postgres://username:password@hostname:port/database

	ex: DATABASE_URL=postgres://sijan:sijan@localhost:5432/lingohop
