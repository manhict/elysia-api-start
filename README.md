# REST API starter using Bun + Elysia + MongoDB + TypeScript

Welcome to my awesome project! This project is a REST API starter using Bun + Elysia + MongoDB + TypeScript providing a powerful and efficient platform with a simple CRUD interface for a user model.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installations](#installations)
  - [Configuration](#configuration)
  - [Routes](#routes)
  - [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Getting Started

Before you begin, make sure you have the following installed:

- [Bun](https://bun.sh)
- [MongoDB](https://mongodb.com) or [MongoCompass](https://mongodb.com/products/compass)

### Installations:

1. Clone this repository to your local machine

```bash
git clone https://github.com/manhict/elysia-api-start.git
```

2. Navigate to the project directory

```bash
cd elysia-api-start
```

3. Install dependencies

```bash
bun install
```

To run:

```bash
bun run dev
```

### Configuration

Create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE. For example:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/bun-elysia-rest-api
JWT_SECRET=secret
```

### Routes

```
POST /v1/users (Create User)
POST /v1/users/login (Login User)
GET  /v1/users/profile (Get User Profile)
GET  /v1/useres (Get All Users)
GET  /v1/users/:id (Get User By Id)
```

### Usage

```
POST /v1/users (Create User)
```

```json
{
  "name": "manh'G",
  "email": "manhg@example.com",
  "password": "123456"
}
```

```
POST /v1/users/login (Login User)
```

```json
{
  "email": "manhg@example.com",
  "password": "123456"
}
```

```
GET /v1/users/profile (Get User Profile)
Authorisation Header (Bearer Token)
```

```
GET /v1/useres (Get All Users)
Authorisation Header (Bearer Token)
```

```
GET /v1/users/:id (Get User By Id)
Authorisation Header (Bearer Token)
```

## Project Structure

```

src:
├── .vscode
│ ├── settings.tson
├── config
│ ├── index.ts
│ ├── db.ts
├── controllers
│ ├── index.ts
│ ├── userCtrl.ts
├── middlewares
│ ├── index.ts
│ ├── logger.ts
│ ├── auth.ts
│ ├── error.ts
│ ├── jwt.ts
├── models
│ ├── index.ts
│ ├── userModels.ts
├── routes
│ ├── index.ts
│ ├── userRoutes.ts
├── utils
│ ├── index.ts
│ ├── /***.ts
├── index.ts
├── .env
├── .gitignore
├── README.md
├── package.tson

```

## Contributing

We welcome contributions to improve the API! If you find a bug, have a feature request, or want to suggest improvements, please create an issue in the GitHub repository. If you'd like to contribute code, feel free to fork the repository, create a new branch, commit your changes, and open a pull request.

Please ensure that your code follows the existing coding style and conventions.

## License

This project is licensed under the [MIT] License

## Contact

If you have any questions or need further assistance, you can reach us at [manh'G](https://t.me/manhict).
