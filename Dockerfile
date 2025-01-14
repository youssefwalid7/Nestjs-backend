# PRODUCTION DOCKERFILE
# ---------------------
# This Dockerfile allows to build a Docker image of the NestJS application
# and based on a NodeJS 18 image. The multi-stage mechanism allows to build
# the application in a "builder" stage and then create a lightweight production
# image containing the required dependencies and the JS build files.

# Stage 1: Build Stage
FROM node:22-alpine AS build

# Set the working directory
WORKDIR /app

# Enable corepack
RUN corepack enable

# Copy dependency management files
COPY .yarn ./.yarn
COPY yarn.lock package.json tsconfig*.json .yarnrc.yml ./

# Yarn install
RUN yarn install --immutable

# Copy the rest of the application code
COPY . ./

# Build
RUN yarn run build

# Stage 2: Runtime Stage
FROM node:22-alpine AS runtime

# Set the working directory
WORKDIR /app

# Enable corepack
RUN corepack enable

# Copy dependency management files
COPY .yarn ./.yarn
COPY yarn.lock package.json tsconfig*.json .yarnrc.yml ./

# Install production dependencies
RUN yarn workspaces focus --production 

COPY . ./

# Copy the compiled application code from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=build /app/.yarn ./.yarn
COPY --from=build /app/yarn.lock ./yarn.lock

# Expose the port for the application
EXPOSE 3000 

# Command to start the Nest.js application
CMD ["node", "dist/main.js"]