# Build stage
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files for better layer caching
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Set environment to production for optimal build
ENV NODE_ENV=production

# Build the Next.js application (static export)
RUN pnpm run build

# Production stage
FROM nginx:alpine

# Install dumb-init for proper process handling
RUN apk add --no-cache dumb-init

# Copy built assets from build stage (Next.js exports to ./dist)
COPY --from=build /app/dist /usr/share/nginx/html

# Copy optimized nginx configuration for Next.js SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add nginx user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001 -G nodejs

# Change ownership of nginx files
RUN chown -R nextjs:nodejs /usr/share/nginx/html && \
    chown -R nextjs:nodejs /var/cache/nginx && \
    chown -R nextjs:nodejs /var/log/nginx && \
    chown -R nextjs:nodejs /etc/nginx/conf.d

# Create pid directory and set permissions
RUN mkdir -p /var/run/nginx && \
    chown -R nextjs:nodejs /var/run/nginx

# Switch to non-root user
USER nextjs

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 