# Use an official Node.js runtime as a base image for dependencies
FROM node:18-alpine AS base

# Install necessary package for compatibility
RUN apk add --no-cache libc6-compat

# Stage for installing dependencies
FROM base AS deps
WORKDIR /app

# Copy package files and install dependencies based on the lock file found
COPY package.json package-lock.json* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Stage for building the application
FROM deps AS builder
WORKDIR /app

# Copy application code
COPY . .

# Install dependencies and build the application
RUN npm install

# Production image, copy all the necessary files and run the application
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Add a non-root user for security
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nodeuser

# Copy application source code from builder stage
COPY --from=builder /app .

# Use the non-root user
USER nodeuser

# Expose the application port
EXPOSE 3000

# Set environment variables
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the application
CMD ["npm", "start"]
