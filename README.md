# collective-technical-test

Technical test for Collective.work using NestJS and ReactJS.

## Description

This project is composed of two parts:

### Backend

The backend has the following features:

- Endpoint to fetch the top 150 cryptos, it also allows us to search by keyword.
- A caching system to store the data in memory, so we don't have to fetch it every time.
- A [scheduled task](./backend/src/app.service.ts) to fetch the data every 5 seconds and cache it to stay up to date.
- [Swagger documentation](http://localhost:3000).
- It also contains [tests](./backend/src/cryptos/cryptos.service.spec.ts) for the cryptos service.

### Frontend

The frontend has the following features:

- A simple search bar to search by keyword. The input is debounced in order to avoid unnecessary api calls.
- A DataGrid to display the cryptos. it also supports features like sorting by columns and pagination.
- The data is fetched from the backend dynamically every 5 seconds in order to stay up to date.
- The table is animated with colors when the data changes.
- We use snackbars to display errors.

# Running the project

## Requirements

- Docker 20.10.7+
- docker-compose 1.29.2+

in order to run the project without Docker, please follow the instructions in both folders:

- [Running the Backend](./backend/README.md)
- [Running the Frontend](./frontend/README.md)

## Configuration

cp ```.env_example``` to ```.env```

```shell
cp .env_example .env
```

## Build

```shell
docker-compose build
```

## Run

```shell
docker-compose up -d 
```

in order to stop the container:

```shell
docker-compose down
```

## Testing

- The Swagger documentation is available at: [http://localhost:3000/](http://localhost:3000/)
- The SPA s are available at: [http://localhost:3001/](http://localhost:3001/)

# Improvements

I would suggest that we collect the data more frequently, and send it to the frontend using sockets in order to avoid
fetching it every time and to stay always up to date.
