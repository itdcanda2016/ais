# ais

AIS is a plot type.

It uses these frameworks.

- [Node.js](http://nodejs.org/).
for base of backend
- [Express.js](http://expressjs.com/)
for making web application
- [Sequelize](http://docs.sequelizejs.com/en/latest/).
for ORM
- [Gulp](http://gulpjs.com/)
for making task

## Make sure
You should change Username / Password of Postgres.
config.json
```
{
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "ais_database_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "postgres",
    "database": "ais_database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "postgres",
    "database": "ais_database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

## Usage
It needs Node.js and PostgresSQL before run.
```
$ npm install

$ node_modules/.bin/gulp createDatabase

$ node_modules/.bin/sequelize db:migrate

$ npm start
```
