---
title: Umami Migration Guide (Docker + PostgreSQL + Caddy)
description: Migrating a self-hosted Umami instance from one VPS to another while preserving analytics data.
canonical: https://kazvee.com/blog/umami-migration/
date: 2026-05-03
updated:
tags:
- umami
- analytics
- self-hosting
- docker
- caddy
- postgresql
---

This post documents how I migrated a self-hosted Umami instance from one VPS to another while preserving analytics data.

Instead of just reinstalling everything from scratch, I took this as an opportunity to ~~break things in a new way~~ practice service migration. 😏

These notes cover backing up data, restoring PostgreSQL, updating DNS, and validating the new deployment.

## Overview
**Source server:**
- Existing Umami install
- Docker Compose
- PostgreSQL
- Caddy reverse proxy

**Destination server:**
- Existing VPS
- Docker Compose
- Existing Caddy stack
- New Umami deployment with restored database

## 1. Back Up the Old Server
Create a PostgreSQL dump from the running Umami database.

```
docker exec -t umami_db pg_dump -U YOUR_POSTGRES_USER YOUR_DATABASE_NAME > umami.sql
```

Also copy the environment file:
```
cp .env .env.backup
```

Important files to preserve:
- `umami.sql`
- `.env`
- `docker-compose.yml`
- Caddyfile entries

## 2. Transfer Files to the New VPS
Move the SQL dump and configuration files to the new server. You can transfer them with `scp`, FileZilla, or any preferred SFTP client.

Example with `scp`:
```
scp umami.sql user@new-server:/home/user/docker/
scp .env user@new-server:/home/user/docker/
```

## 3. Add Umami to Docker Compose
If other containers are already running on the destination server, add Umami to the existing Docker Compose setup, making sure that Caddy and Umami are attached to the same network. Your services should contain something like:
```
umami_app:
  image: ghcr.io/umami-software/umami:postgresql-latest
  container_name: umami_app
  env_file:
    - .env
  restart: always
  expose:
    - "3000"
  depends_on:
    umami_db:
      condition: service_healthy

umami_db:
  image: postgres:15-alpine
  container_name: umami_db
  env_file:
    - .env
  restart: always
  volumes:
    - umami-db-data:/var/lib/postgresql/data
```

## 4. Start Database First
Bring up PostgreSQL before restoring.
```
docker compose up -d umami_db
```

Confirm healthy:
```
docker compose ps
```

## 5. Restore the Database
Prepare a clean PostgreSQL database and restore the dump into it. This ensures there are no conflicts from previous schema objects or partial installs.

First, reset the database to a clean state:
```
docker exec -it umami_db psql -U YOUR_POSTGRES_USER -d postgres -c "DROP DATABASE IF EXISTS YOUR_DATABASE_NAME;"
docker exec -it umami_db psql -U YOUR_POSTGRES_USER -d postgres -c "CREATE DATABASE YOUR_DATABASE_NAME;"
```
Then import the SQL dump into the newly created database:
```
docker exec -i umami_db psql -U YOUR_POSTGRES_USER -d YOUR_DATABASE_NAME < umami.sql
```

During a successful restore, you should see output such as:
```
CREATE TABLE
COPY
ALTER TABLE
CREATE INDEX
```

If restore fails, verify that the SQL dump is valid and that the database name used in the restore command matches the one created in PostgreSQL.

## 6. Start Umami
```
docker compose up -d umami_app
```

Check logs:
```
docker compose logs -f umami_app
```

Healthy output includes:
```
Database connection successful
No pending migrations to apply
Ready on port 3000
```

## 7. Configure Caddy
Minimal working reverse proxy:
```
analytics.example.com {
    reverse_proxy umami_app:3000
}
```

Restart Caddy to apply the configuration:
```
docker compose restart caddy
```

## 8. Update DNS and Wait for Propagation
Point the analytics subdomain to the new VPS IP. Propagation time depends on your registrar and TTL settings. Changes are often visible within minutes, but full propagation can take longer.

You can use online DNS checker tools, or run `dig` / `nslookup` locally, to verify propagation.

## 9. Test the Site
```
curl -I https://analytics.example.com
```

Successful response:
```
HTTP/2 200
via: Caddy
```

Open the site in a browser and confirm:
- Login page loads
- Historical analytics data exists
- Websites still listed

If HTTPS does not respond as expected, check Caddy logs:
```
docker compose logs -f caddy
```

## 10. Create a Fresh Backup After Migration
Once confirmed working:
```
docker exec -i umami_db pg_dump -U YOUR_POSTGRES_USER -d YOUR_DATABASE_NAME > umami-post-migration.sql
```

Store in:
```
/home/username/backups/umami/
```

## 11. Final Checklist
- DNS moved
- SSL working
- Umami loads
- Old analytics data restored
- Tracking operational
- New backup created

## Notes
Once confirmed working, archive a fresh database backup, and repurpose the old VPS.


## Troubleshooting

### HTTP 502

Caddy cannot reach Umami.
- Confirm both containers are on the same Docker network
- Confirm Umami is healthy
- Use simple reverse proxy first

### ACME / TLS Errors
DNS may still be pointing to the old server. Changes can take a few minutes to several hours depending on TTL (Time to Live). 

Alternatively, ports 80/443 may be blocked.

### Restore Errors: relation already exists
Database already contains schema.
- Remove the existing PostgreSQL volume
- Recreate the container
- Restore the dump again