---
title: Self-Hosting Umami Analytics with Docker, PostgreSQL, and Caddy
description: Practical setup notes for self-hosting Umami Analytics with Docker, PostgreSQL, and Caddy.
canonical: https://kazvee.com/blog/umami-analytics-setup/
date: 2026-04-05
updated: 
tags:
- umami
- analytics
- self-hosting
- docker
- caddy
- postgresql
---

Notes from setting up a self-hosted Umami Analytics instance with Docker, PostgreSQL, and Caddy. *"Works on my machine!"*™️😏 Adapt as needed.

## 1. Prerequisites

- Tested on Debian 13 (Trixie)
- Docker and Docker Compose installed
- Caddy installed
- Project folder (`~/docker`)
- Website files (`~/var/www/my-website-files`)

## 2. Create `.env` File

In your Docker folder, create a `.env` file:
```
# ------------------------------
# PostgreSQL database config
# ------------------------------

# Database name Umami will use
POSTGRES_DB=YOUR_DATABASE_NAME

# Database user
POSTGRES_USER=YOUR_DATABASE_USER

# Strong password for the Postgres user
# Generate one with `openssl rand -base64 32`
POSTGRES_PASSWORD=YOUR_STRONG_PASSWORD

# ------------------------------
# Umami App Config
# ------------------------------

# Full connection string for Umami to connect to Postgres
# Format: postgresql://<user>:<password>@<host>:<port>/<database>
DATABASE_URL=postgresql://YOUR_DATABASE_USER:YOUR_STRONG_PASSWORD@db:5432/YOUR_DATABASE_NAME

# Cryptographic secret for session cookies & encryption
# Generate one with `openssl rand -base64 32`
APP_SECRET=YOUR_RANDOM_APP_SECRET
```

## 3. Docker Compose

Create `docker-compose.yml`:
```
version: "3.9"

services:
  umami_db:
    image: postgres:15-alpine
    container_name: umami_db
    env_file:
      - .env
    volumes:
      - umami-db-data:/var/lib/postgresql/data
    restart: always
    networks:
      - umami-net

  umami_app:
    image: ghcr.io/umami-software/umami:postgresql-latest
    container_name: umami_app
    env_file:
      - .env
    depends_on:
      umami_db:
        condition: service_healthy
    restart: always
    init: true
    ports:
      - "3000:3000"
    networks:
      - umami-net

  caddy:
    image: caddy:2
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      ... YOUR EXISTING FILES HERE ...
      - caddy_data:/data
      - caddy_config:/config
    networks:
      - umami-net
    depends_on:
      - umami_app

volumes:
  umami-db-data:
  caddy_data:
  caddy_config:

networks:
  umami-net:
```

## 4. Start Containers

```
docker compose up -d
```

## 5. Changing DB Credentials

To change your Postgres username/password:

Stop the containers:
```
docker compose down
```

⚠️ Remove the Postgres volume (this deletes all Umami DB data):
```
docker volume rm docker_umami-db-data
```

Update `.env` with the new credentials, then start the containers again:
```
docker compose up -d
```
Check container health:
```
docker compose ps
```
Note the container ID for use below.

Check logs:
```
docker compose logs -f YOUR_CONTAINER_ID
```

## 6. Example Caddyfile Snippet

For reverse-proxying Umami:

```
analytics.example.com {
    reverse_proxy umami_app:3000
    log {
        output stdout
        format json
    }
    encode zstd gzip
}
```

## 7. Cross-Domain Tracking

If your Umami instance is hosted on a different domain than the website you want to track, browsers will block analytics requests unless CORS headers are configured.
If CORS isn’t configured, you'll see errors like `CORS policy: No 'Access-Control-Allow-Origin' header` in the browser console.

Example scenario:
- Umami dashboard: `analytics.example.com`
- Tracked sites: `blog.domain.org`, `portfolio.domain.org`

Caddyfile example:
```
analytics.example.com {
    # Compress traffic
    encode zstd gzip

    # Reverse proxy to Umami backend
    reverse_proxy umami_app:3000 {
        # Remove headers from backend to avoid duplicates
        header_down -Access-Control-Allow-Origin
        header_down -Access-Control-Allow-Methods
        header_down -Access-Control-Allow-Headers
        header_down -Access-Control-Allow-Credentials
    }

    # Logging in JSON
    log {
        output stdout
        format json
    }

    # Allow only specific domains to send analytics data
    @allowed header_regexp Origin ^https://(blog|portfolio)\.domain\.org$
    header @allowed Access-Control-Allow-Origin "{http.request.header.Origin}"
    header @allowed Access-Control-Allow-Methods "GET, POST, OPTIONS"
    header @allowed Access-Control-Allow-Headers "Content-Type"
    header @allowed Access-Control-Allow-Credentials "true"

    # Handle browser preflight requests
    @options method OPTIONS
    respond @options 204
}
```

## 8. Embed the Tracking Script

Add the tracking script provided by Umami to your website. This depends on how your site is built and deployed.

## 9. Troubleshooting

- `400 Bad Request`: Check for a mismatch between the data-website-id and/or the Umami site domain.
- `405 Method Not Allowed`: Expected when opening /api/send in a browser, Umami will only accept POST requests.

## 10. Password Resets

To set the admin user's password to `umami`:
```
docker exec -i <db-container> psql -U <db-user> -d <db-name> -c 'UPDATE "user" SET password='\''$2b$10$BUli0c.muyCW1ErNJc3jL.vFRFtFJWrT8/GcR4A.sUdCznaXiqFXa'\'' WHERE username='\''admin'\'';'
```
Replace the placeholder values with:  
`<db-container>`   Docker container running PostgreSQL  
`<db-user>`        PostgreSQL user  
`<db-name>`        Umami database name  
Login to Umami and change the password to a more secure option.
