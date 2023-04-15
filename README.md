# DC-Pay

DC-Pay is a web application built using Node.js, TypeScript, React, and PostgreSQL. It includes a dashboard UI and a main API backend that communicates with a Redis cache and a PostgreSQL database.

## Project Structure

The project is structured as follows:

├── dashboard/ # Client dashboard UI
│ ├── public/
│ ├── src/
│ ├── package.json
│ ├── tsconfig.json
│ └── ...
├── main-api/ # Main API backend
│ ├── src/
│ ├── package.json
│ ├── tsconfig.json
│ └── ...
├── .env # Environment variables for local development
├── docker-compose.yml # Docker Compose configuration for local development
└── package.json # Project dependencies and scripts


* `dashboard/`: Contains the client dashboard UI code.
* `main-api/`: Contains the main API backend code.
* `.env`: Contains environment variables for local development, such as database credentials and API keys.
* `docker-compose.yml`: Contains the Docker Compose configuration for local development.
* `package.json`: Contains the project dependencies and scripts.

## Getting Started

To start the project, follow these steps:

1. Install dependencies:

npm install


2. Copy the `.env.example` file to `.env` and modify the environment variables as needed:

cp .env.example .env


3. Build the project:

npm run build


4. Start the project:

npm start


This will start the client dashboard UI and the main API backend.

## Scripts

* `npm run dev-win`: Starts the client dashboard UI, the main API backend, and a development server for the main API.
* `npm run install`: Installs the dependencies for the client dashboard UI and the main API backend.
* `npm run build`: Builds the client dashboard UI and the main API backend.
* `npm run start`: Starts the client dashboard UI and the main API backend.