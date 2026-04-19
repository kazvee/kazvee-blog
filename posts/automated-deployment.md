---
title: Automating Project Deployment with WSL2, SSH, and Rsync
description: Building a single-command automated deployment workflow for my portfolio site.
canonical: https://kazvee.com/blog/automated-deployment/
date: 2026-04-19
updated: 
tags:
  - self-hosting
  - scripts
  - deployment
  - devops
  - wsl2
  - ssh
  - rsync
---

I recently upgraded my portfolio deployment workflow from a manual routine into a quick single-command process using WSL2, SSH, and rsync.

Previously, I handled deployments manually with FileZilla. My portfolio is served as a static site because I don't need the extra CPU, memory, or maintenance overhead of running a full-stack application.

During a cleanup session, I emptied the remote site folder. Later, deployments began failing because expected directories no longer existed on the server. Manually recreating the necessary folders worked as a quick fix, but it felt unreasonable to do more than once or twice.

And what do we do when we need to do something a third time? **We automate it.** 🤖

## Prerequisites

Before setting this up, I already had:
- a VPS hosting my portfolio
- a local WSL2 development environment
- SSH key access configured inside WSL2
- an SSH config alias for my server (so I could use `ssh my-hostname`)
- rsync installed locally
- an existing build process for the project

Since I'd previously experimented with Ansible, I saw this as a chance to try Jenkins. With a bit of trial and error, I built a working pipeline that would automatically push files from WSL2 to my VPS.

However, this only replaced one manual process with another. I wanted to see if I could ~~press fewer buttons~~ *further automate and streamline my workflow.* 😏

I already use scripts to fetch an RSS feed, generate a sitemap, and run fresh builds, so why not make one to deploy directly from the command line? 🤔

## The Deploy Script

I created `scripts/deploy.sh` to handle:
- config validation
- SSH connectivity checks
- fresh builds
- file uploads with rsync
- remote directory synchronization using `rsync --delete`

⚠️ Using `--delete` can be destructive, so double-check local source and remote destination paths first.

```
#!/bin/bash
set -Eeuo pipefail

cd "$(dirname "$0")/.."

trap 'echo "❌ Deployment failed on line $LINENO"' ERR

CONFIG_FILE="scripts/deploy.conf"

if [ ! -f "$CONFIG_FILE" ]; then
  echo "❌ Missing $CONFIG_FILE"
  echo "Copy scripts/deploy.example.conf to scripts/deploy.conf"
  exit 1
fi

source "$CONFIG_FILE"

: "${REMOTE_HOST:?REMOTE_HOST is required}"
: "${REMOTE_PATH:?REMOTE_PATH is required}"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Project Deployment"
echo "🕒 $(date '+%Y-%m-%d %H:%M:%S')"
echo "🎯 Target: ${REMOTE_HOST}:${REMOTE_PATH}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "🔍 Checking connection..."
ssh -o ConnectTimeout=5 "$REMOTE_HOST" exit

echo "🏗️ Building project..."
npm run build -- --no

echo "📤 Uploading files..."
rsync -az --delete --info=progress2 out/ "${REMOTE_HOST}:${REMOTE_PATH}/"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Project deployed successfully!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

I also added emoji-enhanced status messages to spark joy! ✨ 

## Secure Configuration

To avoid hardcoding server details, I moved connection settings into a private config file, `scripts/deploy.conf`, and added it to .gitignore so it wouldn't be pushed to my public repository. 🔒

As a reminder to my future self, I also created a generic config template:
`scripts/deploy.example.conf`
```
REMOTE_HOST="YOUR_HOST_ALIAS"
REMOTE_PATH="/path/to/site"
```

## Single-Command Deployments

In `package.json`, I added a deploy script:
`"deploy": "bash scripts/deploy.sh"`

And when I'm ready to deploy, it's as simple as:
```
npm run deploy
```

## Final Thoughts

I might revisit Jenkins later on, since it's a tool I'd like to learn more about. But it didn't feel ideal for the workflow I wanted inside WSL2. It's super quick and convenient to run a local dev server for testing, run a build, and deploy everything right from my terminal.

Now that I have a simple deployment process that works well, I'll likely adapt the same approach for some of my other projects too. 🙂
