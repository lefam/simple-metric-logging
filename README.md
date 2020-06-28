# Simple Metric Logging
Hi.

This is a simple metric logging and reporting service that sums metrics by time window for the most recent hour.
It is a simple REST API built using Node and Koa.js.


## Running the app

In this section I present the steps that you must follow to prepare the app to run it locally. The app is also
available at https://morning-plateau-15229.herokuapp.com

Please make sure you have [Node.js](http://nodejs.org) and NPM installed.
You should have at least Node 7.6 to run this service.

We should first install all node modules using the command below:

```
npm install
```

Then you can start the app using:

```
npm run start-dev
```

Actually you can also start the API using `npm start`. The difference between *start* and *start-dev* is that the latter
runs the API using *nodemon* which reloads the service when any source file is changed.

The API will be running at http://localhost:5000

## Running tests

You can use the command below to run tests:
- `npm test`

## Lint

You can use run linting with the following command:
- `npm run lint`


## API Endpoints


## Deploying to Heroku

The app is prepared to be easily deployed to [Heroku](http://heroku.com). To deploy create a Heroku app and repository
and push the code with `git push heroku master`.
