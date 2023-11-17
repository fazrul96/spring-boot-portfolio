# Use an official Node.js runtime as the base image
FROM node:14
LABEL authors="Fazrul"
# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json /app/

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]