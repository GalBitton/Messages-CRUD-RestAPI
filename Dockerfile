FROM node:18-alpine
ARG NODE_ENV=production

# Setting up the working directory
WORKDIR /app

# Copying the package.json and package-lock.json files
COPY package.*json ./

# Install the dependencies
RUN npm install

# Copy the application code
COPY . .

# Exposing the port that the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]