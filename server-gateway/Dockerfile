# express-server/Dockerfile
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the server will run on
EXPOSE 3443

# Command to run the server
CMD ["node", "server.js"]