
FROM node:18
# Set the working directory in the Docker image
WORKDIR /backend

COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD [ "sh","lorem.sh" ]