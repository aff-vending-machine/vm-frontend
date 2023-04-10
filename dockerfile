############################
# STEP 1 prepare the source
############################
# Use a smaller base image for the builder stage
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json files for the ESLint-TS
COPY packages/eslint-ts/package.json /app/packages/eslint-ts/

# Copy the package.json files for the ESLint-TS-Svelte
COPY packages/eslint-ts-svelte/package.json /app/packages/eslint-ts-svelte/

# Copy the package.json files for the Prettier-TS
COPY packages/prettier-ts/package.json /app/packages/prettier-ts/

# Copy the package.json files for the Prettier-TS-Svelte
COPY packages/prettier-ts-svelte/package.json /app/packages/prettier-ts-svelte/

# Copy the package.json files for the core app
COPY apps/core/package.json /app/apps/core/

# Copy the package.json files for the Svelte app
COPY apps/svelte-app/package.json /app/apps/svelte-app/

# Copy only the necessary package.json, pnpm-lock.yaml and pnpm-workspace.yaml files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml /app/

RUN npm install -g pnpm && pnpm install

# Copy the application source code
COPY . /app

RUN pnpm build

############################
# STEP 2 the running container
############################
# Use an official Nginx image for the production stage
FROM nginx:1.21-alpine As runner
LABEL maintainer="Tanawat Hongthai <ztrixack.th@gmail.com>"

# Copy the built Vite.js app from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default Nginx port
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
