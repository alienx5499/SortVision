# Docker Setup for SortVision (Next.js)

This document explains how to run SortVision using Docker after the migration from Vite to Next.js.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 20+ (for local development)
- pnpm package manager

## Environment Variables

Create a `.env` file in the root directory:

```bash
# GitHub API Token (optional, but recommended for higher API limits)
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
```

## Quick Start

### Development Mode

Run the development server with hot reload:

```bash
docker-compose up dev
```

This will:

- Start Next.js development server on port 3000
- Enable hot reload for code changes
- Mount source code as volume for real-time updates

Access the application at: `http://localhost:3000`

### Production Mode

Build and run the production version:

```bash
docker-compose up prod
```

This will:

- Build the Next.js application as static export
- Serve the built files using nginx
- Run on port 80

Access the application at: `http://localhost`

### Build Only

To just build the application without running:

```bash
docker-compose up build
```

## Individual Commands

### Build Docker Image

```bash
docker build -t sortvision .
```

### Run Development Container

```bash
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules sortvision pnpm run dev
```

### Run Production Container

```bash
docker run -p 80:80 sortvision
```

## Docker Configuration Details

### Dockerfile

The Dockerfile uses a multi-stage build:

1. **Build Stage**:

   - Uses Node.js 20 Alpine
   - Installs pnpm and dependencies
   - Builds Next.js static export to `./dist`

2. **Production Stage**:
   - Uses nginx Alpine for serving static files
   - Copies built files from build stage
   - Implements security best practices
   - Runs as non-root user

### docker-compose.yml

Provides three services:

- `dev`: Development server with hot reload
- `prod`: Production nginx server
- `build`: Build-only service for CI/CD

### nginx.conf

Optimized for Next.js static export:

- Proper SPA routing with fallback to index.html
- Optimized caching for static assets
- Security headers matching Next.js configuration
- Gzip compression for better performance

## Performance Optimizations

- Multi-stage Docker build for smaller production images
- Layer caching with separate package.json copy
- Nginx optimizations for static content
- Non-root user for security
- Health checks for container monitoring

## Troubleshooting

### Port Conflicts

If port 3000 or 80 is already in use, modify the ports in `docker-compose.yml`:

```yaml
ports:
  - '3001:3000' # Change host port
```

### Environment Variables Not Working

Ensure your `.env` file is in the project root and contains:

```bash
NEXT_PUBLIC_GITHUB_TOKEN=your_token
```

### Build Failures

1. Clear Docker cache:

   ```bash
   docker system prune -f
   ```

2. Rebuild without cache:
   ```bash
   docker-compose build --no-cache
   ```

### File Permission Issues

The container runs as a non-root user. If you encounter permission issues:

```bash
# Fix ownership
sudo chown -R $USER:$USER .
```

## Migration Notes

This setup has been updated from Vite to Next.js:

- **Port changed**: 7777 → 3000 for development
- **Build output**: Now exports to `./dist` (configured in next.config.mjs)
- **Static export**: Uses Next.js static export mode for optimal Docker deployment
- **Environment**: Updated environment variable handling for Next.js
- **Nginx**: Optimized for Next.js routing and asset serving

## Production Deployment

For production deployment:

1. Set production environment variables
2. Use `docker-compose up prod` or build custom image
3. Consider using Docker Swarm or Kubernetes for scaling
4. Implement proper monitoring and logging

## Security Considerations

- Container runs as non-root user (nextjs:nodejs)
- Security headers configured in nginx
- Environment variables properly scoped
- No sensitive data in Docker image layers
