# Stage 1: Build the application
FROM gplane/pnpm:8.6.1-node20-alpine AS builder
WORKDIR /app
# Copy package files and lockfile separately
COPY package*.json ./
COPY pnpm-lock.yaml ./
# RUN pnpm install
# # Fetch packages and cache them using the shared cache
# RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store/v3 \
#     pnpm fetch
# Install packages offline using the fetched packages
RUN pnpm install --prefer-offline --frozen-lockfile
# Copy application files
COPY . .
# Build the application
RUN pnpm run build

# Stage 2: Run the application with production dependencies
FROM gplane/pnpm:8.6.1-node20-alpine
WORKDIR /app
# Copy package files and lockfile from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
# Fetch production packages and cache them using the shared cache
# RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store/v3 \
#     pnpm fetch --prod
# Install production packages offline using the fetched packages
RUN pnpm install --prefer-offline --frozen-lockfile --prod
# Copy the build output from the builder stage
COPY --from=builder /app/build ./
# Expose port 8080 for the application
EXPOSE 8080
ENV PORT=8080
# Run the application
CMD ["node", "./index.js"]
