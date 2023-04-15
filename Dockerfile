# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files for the client to the container
COPY dashboard/package*.json ./dashboard/

# Install the dependencies for the client
RUN cd dashboard && npm install

# Copy the rest of the client files to the container
COPY dashboard .

# Copy the package.json and package-lock.json files for the main API to the container
COPY main-api/package*.json ./main-api/

# Install the dependencies for the main API
RUN cd main-api && npm install

# Copy the rest of the main API files to the container
COPY main-api .

# Install Redis and PostgreSQL
RUN apt-get update && apt-get install -y redis-server postgresql

# Configure the PostgreSQL database name and password
ARG POSTGRES_DB
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ENV POSTGRES_DB $POSTGRES_DB
ENV POSTGRES_USER $POSTGRES_USER
ENV POSTGRES_PASSWORD $POSTGRES_PASSWORD


# Expose the necessary ports
EXPOSE 3000 4000 5432 6379

# Start the services
CMD ["npm", "run", "start"]