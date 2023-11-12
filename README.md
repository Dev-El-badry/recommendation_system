# Design API for Recommendation Books APIs

## Geting Started

to get started, make sure you docker installed on your system, and then clone this repository.

## Spin up the containers for the application by running

```sh
docker-compose up --build -d
```

Bringing up the Docker Compose network site instead of just using up, ensures that only our site's containers are brought up at the start, instead of all of the command containers as well. The following are built for our web server, with their exposed ports detailed:

- **db (postgres)** - `:5432`
- **db_test (postgres)** - `:54320`
- **adminer** - `:8080`

### In first time

```sh
cp .env.example .env
```

## Installation - Setup local development

Application requires [Node.js](https://nodejs.org/) v16+ to run.

Install the dependencies and devDependencies and start the server.

```sh
npm install
npm run dev
```

### Migrate Database Of Application

```sh
npm run migrate
```

### to run seed files, execute

```sh
npm run seed
```

**_ NOW you can login _**

### Account information

- email: user1@computer.null
- password: password

### to run tests execute

```sh
npm run test
```

You can access your application via localhost, if you're running the containers directly
[link] (http://localhost:5000)

## API Collection of recommendation books app on postman

[recommendation books app collection](https://documenter.getpostman.com/view/3000372/2s9YXk3gQ3)

## API

- [x] implemented JWT based security in a test Core Web API REST project

## Authentication

- [x] Sign In - with test cases
- [x] Sign Up - with test cases
- [x] Me - with test cases

## Books

- [x] Get All Books - with test cases
- [x] Get Top Recommendation Books - with test cases
- [x] Send SMS to user after the submission - with test cases

## CI

- [x] implemented CI for project

## Deployment

- [ ] Deploy application on aws
