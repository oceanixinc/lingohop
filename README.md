### Welcome to Lingohop


#### Basic configuration

1. Clone the project at your folder
2. Activate your virtual environment
3. Go inside cloned folder where you can find 'requirements.txt'
4. Run - `pip install -r requirements.txt`
5. Create database with command - `createdb lingohop`
6. Run - `python manage.py migrate`
7. Open another tab in your terminal and go inside 'material' folder

	7.a run `npm install`

	7.b run `sudo npm start` 

8. Run - `python manage.py runserver` in your previous tab


#### Database configuration

1. please create .env file on the folder where manage.py exists
2. in the .env file write the database url in the following format:

	DATABASE_URL=postgres://username:password@hostname:port/database

	ex: DATABASE_URL=postgres://sijan:sijan@localhost:5432/lingohop