# Messages-CRUD-RESTAPI
> Live Demo: [Messages-CRUD-RESTAPI](https://messages-crud.up.railway.app/)
---
## Introduction

---
This project is a simple Node.js REST API that allows users to manage messages.<br>
Each message is analyzed to check if it's ***a palindrome***.<br>
The service includes full **CRUD operations**:
- Create a message
- Retrieve a message
- Update a message
- Delete a message
- List all messages

Everything is built using a modular architecture. This means that the code is organized into separate modules, each responsible for a specific part of the application.
<br>Every layer has its job - routes, controllers, services, repositories, and models.
<br>This makes it easier to maintain and extend the codebase in the future.

---
## Table of Contents

---
- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
- [Design Patterns](#design-patterns)
- [Tech Stack](#tech-stack)
- [How to Run](#how-to-run)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [CI/CD](#cicd)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Contact](#contact)
---

## Features
- Simple REST API with full CRUD operations support
- Checks if a message is a palindrome
- MongoDB or In-memory storage (configurable)
- Uses Dependency Injection for better testability and modularity
- Full test coverage with Mocha, Chai, Sinon and Supertest
- Docker support for easy deployment and local running
- GitHub Actions for CI/CD
- Swagger documentation for API endpoints
- Deployed to Railway Cloud Provider

---
## Architecture
As mentioned earlier, the project is built using a modular architecture.<br>
In the picture below you can see the different layers of the application and how they interact with each other.
![Architecture](/src/docs/architecture.jpg)

---
## Design Patterns
In this section, I will explain the design patterns used:
- **Dependency Injection Pattern**<br>nstead of manually creating dependencies everywhere, the app uses the ```kontainer-di``` library ```(see src/container.js)``` to manage all dependencies in one place. This makes the code easier to test and keeps everything loosely coupled.
- **Controller-Service-Repository Pattern**<br>Repository's layer is a (DAL - Data Access Layer), provides an additional layer to classic Controller-Service model as following:
  - **Controller** - Handles incoming HTTP requests (e.g., from the client), and calls the relevant service.
  - **Service** -  Contains the actual business logic (like creating a message or checking if it’s a palindrome), and creates the ```Message``` entity.
  - **Repository** - Talks to the database. It abstracts how data is stored or retrieved, so the service doesn’t need to know which database is in use.
- **Factory Pattern (via Container)** <br>Using the container, we can easily "swap" or create different object instances depending on the environment – for example, switching between a MongoDB connection or an In-Memory database. This gives flexibility without changing core logic.
- **Base Class Pattern (Generic,Template methods)** <br>The project uses **base classes** to promote **code reuse** and enforce a **consistent structure** across layers.<br>These are similar to the **Template Method Pattern** in design:
  - ```BaseRepository```: Provides shared CRUD operations (```create```,```findAll```,```findById```,```update```,```delete```). The ```MessageRepository``` simply extends it and passes in the correct ```database``` and ```schema```.
  - ```BaseCrudService```: Encapsulates common service-level logic. ```MessageService``` inherits it and overrides only what’s necessary (like the ```create``` and ```update``` methods to handle Message entity logic).
  - ```BaseSchema```: A key abstraction for different data storage schemas.
  - ```BaseController``` and ```BaseDatabase``` also serve as a foundational layers for extension.

---
## Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB** + Mongoose + In-memory storage
- **Joi** for validation
- **Docker**
- **Mocha, Chai, Sinon, Supertest** for testing
- **Swagger** for API documentation
- **Dependency Injection** with kontainer-di
- **GitHub Actions** for CI/CD
- **Railway** for deployment

---
## How to Run
### Prerequisites
- Node.js (v18 or higher)
- MongoDB (if using MongoDB storage)
- Docker (if using Docker)
- Git
- npm or yarn
- Postman or any other API testing tool
### Clone the repository
```bash 
npm install
npm start
```
### Run with Docker
```bash
docker build -t <your-image-name> .
docker run -d -p <port>:<port> --env-file .env <your-image-name>
```
for example:
```bash
docker build -t messages-api .
docker run -d -p 8080:8080 --env-file .env messages-api
```
Open your browser and go to `http://localhost:8080` to see the API in action.

---
## API Endpoints
All the endpoints are documented using Swagger. You can access the documentation at `http://localhost:8080/api-docs` after running the server.
### Base URL`/api/v1/messages`
| Method | Endpoint | Description              |
|--------|--------|--------------------------|
| GET | `/` | List all messages        |
| GET | `/:id` | Retrieve a message by ID |
| POST | `/` | Create a new message     |
| PUT | `/:id` | Update a message   |
| DELETE | `/:id` | Delete a message   |

Each message is an object with the following structure:
```json
{
  "id": "uuid",
  "content": "string",
  "isPalindrome": "boolean",
  "creationTime": "date.toISOString()",
  "lastUpdateTime": "date.toISOString()"
}
```
---
## Testing
```bash
npm test          #Run all tests
```
Tests includes:
- Unit tests (inMemoryDatabase,messageEntity,messageRepository,messageService,palindromeChecker)
- Integration tests (messageRoutes)

---
## CI/CD
The project uses GitHub Actions for CI/CD. The workflow is defined in `.github/workflows/ci.yml`.
<br>It runs on every push to the main branch and on every pull request.
---
## Deployment
The project is deployed on Railway Cloud Provider.
<br>You can access the live API at [Messages-CRUD-RESTAPI](https://messages-crud.up.railway.app/).
<br>In order to deploy your own version:
1. Create a new Railway project
2. Connect your GitHub repository
3. Set up the environment variables in Railway
4. Deploy the project
---
## Project Structure
```
Messages-CRUD-RestAPI/
├── src/
│   ├── api/
│   │   └── swagger.js                         # Swagger configuration (YAML loader)
│   ├── config/
│   │   └── config.js                          # Environment-based app configuration
│   ├── controllers/
│   │   ├── baseController.js                  # Base controller with shared logic
│   │   └── messageController.js               # Handles message-specific requests
│   ├── docs/
│   │   ├── architecture.jpg                   # System architecture diagram
│   │   └── swagger.yaml                       # Swagger OpenAPI definition
│   ├── interfaces/
│   │   ├── baseDatabase.js                    # Abstract DB interface
│   │   └── baseSchema.js                      # Abstract schema interface
│   ├── middlewares/
│   │   └── validateMessage.js                 # Joi-based input validation middleware
│   ├── models/
│   │   ├── inMemoryDatabase.js                # In-memory DB implementation
│   │   ├── messageEntity.js                   # Message domain model
│   │   ├── messageInMemorySchema.js           # In-memory schema logic
│   │   ├── messageMongoSchema.js              # MongoDB schema definition and logic
│   │   └── mongoDatabase.js                   # MongoDB connection and operations
│   ├── repositories/
│   │   ├── baseRepository.js                  # Generic repository operations
│   │   └── messageRepository.js               # Message-specific repository logic
│   ├── routes/
│   │   └── messageRoutes.js                   # Message API route definitions
│   ├── services/
│   │   ├── baseCrudService.js                 # Base service layer
│   │   └── messageService.js                  # Message service logic
│   ├── utils/
│   │   ├── logger.js                          # Winston logger with file support
│   │   └── palindromeChecker.js               # Utility to check if message is palindrome
│   ├── app.js                                 # Express app setup
│   ├── container.js                           # Dependency Injection setup (kontainer-di)
│   ├── root.html                              # Basic root page served at '/'
│   └── server.js                              # App and DB bootstrapping
├── tests/
│   ├── integration/
│   │   └── messageRoutes.test.js              # Integration tests for REST endpoints
│   └── unit/
│       ├── inMemoryDatabase.test.js           # Unit test for in-memory DB
│       ├── messageEntity.test.js              # Unit test for message entity logic
│       ├── messageRepository.test.js          # Repository logic tests
│       ├── messageService.test.js             # Service layer tests
│       └── palindromeChecker.test.js          # Palindrome checker logic
├── .github/
│   └── workflows/
│       └── ci.yaml                            # GitHub Actions workflow for CI
├── Dockerfile                                 # Docker image configuration
├── .env (ignored)                             # Environment variables (not committed)
├── .gitignore                                 # Git ignored files
├── .prettierrc.json                           # Prettier configuration
├── LICENSE                                    # Project license (MIT)
├── package.json                               # NPM dependencies and metadata
├── package-lock.json                          # Exact dependency versions
└── README.md                                  # You're reading it
```
---
## Environment Variables
These variables are used to configure the application<br>
Note: The `.env` file is ignored by git, so you need to create it manually. make sure you don't commit it.<br>
Please create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=production
PORT=8080
MONGODB_URI=<your-mongodb-uri>
MONGODB_COLLECTION=<your-collection-name>
LOG_LEVEL=info
LOG_CONSOLE=true
LOG_FILE=true
LOG_FILE_PATH=./logs/
DB_SETUP=mongoDB
```
Note: The `MONGODB_URI` and `MONGODB_COLLECTION` variables are only needed if you are using MongoDB as your database. If you are using the in-memory database, you can just configure the DB_SETUP variable to `inMemoryDB`.

---
## Contact
If you have any questions or suggestions, feel free to contact me at:<br>
**Gal Bitton**<br>
Email: [galbitton22@gmail.com](mailto:galbitton22@gmail.com)<br>
LinkedIn: [Gal Bitton](https://www.linkedin.com/in/gal-bitton-7595b3239/)

