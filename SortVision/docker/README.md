# Docker Setup for SortVision

## Prerequisites

- Docker + Docker Compose
- Node.js 24+ (for local non-Docker workflows)
- pnpm

## Environment

Create `.env` in project root:

```bash
GITHUB_TOKEN=your_github_token_here
REPO_OWNER=your_feedback_repo_owner
REPO_NAME=your_feedback_repo_name
```

## Quick Start

### Development

```bash
docker-compose up dev
```

- Runs `pnpm run dev`
- Host port: `7777`
- App URL: `http://localhost:7777`

### Production

```bash
docker-compose up prod
```

- Runs Next.js server (`pnpm start`)
- Host port: `3000`
- App URL: `http://localhost:3000`

### Build Only

```bash
docker-compose up build
```

## Dockerfile Notes

Multi-stage build:

1. **Build stage**
   - `node:24-alpine`
   - installs deps with pnpm
   - runs `pnpm run build` (`.next` output)
2. **Production stage**
   - `node:24-alpine`
   - non-root user
   - serves app with `pnpm start`

## Common Commands

```bash
docker build -t sortvision .
docker run -p 3000:3000 sortvision
```

## Troubleshooting

- **Port conflict**: change compose port mapping (e.g. `3001:3000`).
- **Env not loading**: ensure `.env` is at project root.
- **Rebuild clean**:
  ```bash
  docker system prune -f
  docker-compose build --no-cache
  ```
