# Node Challenge

# How to install

I used NodeJS v16.14.2 and npm v8.5.0 to build the apps.

## Easy Install

If you have Docker and Docker Compose installed, you only need to clone the repository, and run `docker-compose up` inside the directory. This command will set up the containers in dev mode.

Then, you can hit the following URL’s:

- API Service - `http://localhost:3001/v1/health-check`
- Stock Service - `http://localhost:3002/health-check`

If them return a successful message, you are ready to go.

## Not-That-Easy Install

You need an instance of MongoDB running in your machine, with the following config:

```bash
MONGODB_USERNAME=mongo
MONGODB_PASSWORD=mongo
MONGODB_DATABASE=api-service-dev
ALLOW_EMPTY_PASSWORD=yes
MONGODB_ROOT_PASSWORD=mongo
```

And you need to be able to access that instance through `localhost` and port 27017, with the following URL: `mongodb://root:mongo@localhost:27017/api-service-dev?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`

So, to start each service, first is needed to install the dependencies, enter into service directory: `cd api-service` and `cd stock-service`, and run `npm install`

After that, you can run the apps with `npm start` or `npm run dev`

# How to use

Before proceeding, make sure that the services are running.

You can see the swagger page with the following URL’s:

- API Service - `http://localhost:3001/v1/docs`
- Stock Service - `http://localhost:3002/docs`

Besides that, I made a Postman’s collection with all the endpoints available, more about that in the directory `./docs/postman`

# How to run tests

To run all tests of each service, enter into service directory: `cd api-service` or `cd stock-service`, and run `npm test`

After running the tests, you can see the coverage report, opening the file `coverage/lcov-report/index.html` in browser

**Notes:**

- To run the integration tests, make sure that the services are running.
- To run only unit tests `npm run test:unit`
- To run only integration tests `npm run test:integration`

# Technologies

- express
- yup
- jest
- MongoDB
- jsonwebtoken
- mongoose
- axios
- fast-csv

# About the Services

## API Service

This is the user-facing API service, It have the following capabilities:

- Sign-in and sign-up users
- Authentication with JWT
- Role Based Access (User and Admin roles)
- Query stock quotes
- List the stock query history of user
- List the top 5 most requested stocks (Only admins)

**Notes:**

- About the architecture of the service, it could be simpler, but I decided to implement an architecture based on some concepts of Clean Architecture and Hexagonal Architecture to show my knowledge about software architecture. With that, I got a decoupled, feature-oriented, framework-agnostic and more testable application.
- The `/stock/stats`  has a limit query param to bring not only top 5, but any top list. Ex: `/stock/stats?limit=10` will bring the top 10

## Stock Service

This is the internal API service to query stock quotes within external API’s

**Notes:**

- About the architecture of the service, it simpler then the API service. I build based on Layered Architecture.
- Added a simple in-memory cache to improve API performance and lessen the load for the external API. It could be easily replaced by a cache service like Redis. You can configure the TTL through the environment variable `STOCK_PROVIDER_CACHE_TTL` on docker-compose.