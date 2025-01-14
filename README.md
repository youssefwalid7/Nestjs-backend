<br />
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://www.ora-egypt.com/_next/image?url=/assets/images/ora-logo.png&w=256&q=75" width="200" alt="Nest Logo" /></a>
</p>
<p align="center" style='font-size: 22px;font-weight: bold;color: darkcyan'>Elchai Backend</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## TypeOrm

```bash
# Create empty migration
$ yarn run migration:create -n name-of-your-migration

# Generate migration by syncing with the database and define the difference automatically
$ yarn run migration:generate -n name-of-your-migration

# Revert migration
$ yarn run migration:revert
```

## API Endpoints:

## User Controller

GET /user/:id - Retrieve a user by ID

GET /user/:email - Retrieve a user by email

POST /user - Create a new user

PUT /user/:id - Update an existing user

DELETE /user/:id - Delete a user

## Auth Controller

POST /auth/sign-up - Sign up a new user

POST /auth/login - Log in an existing user

## Health Controller

GET /health - Check the health of the application
