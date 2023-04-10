# Use a smaller base image for the builder stage
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the application source code
COPY . /app

RUN npm install -g pnpm && pnpm install && pnpm build

# Use an official Nginx image for the production stage
FROM nginx:1.21-alpine

# Copy the built Vite.js app from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
