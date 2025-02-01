#!/bin/bash
set -e

# Function to log with timestamps
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting build and sync process..."

# Build the static site
log "Building static site..."
npm run build

# Configure Git
git config user.name "${REPL_OWNER:-Replit User}"
git config user.email "${REPL_OWNER:-user}@repl.it"

# Commit and push changes to staging
log "Committing changes..."
git add .
git commit -m "Build: $(date +'%Y-%m-%d %H:%M:%S')" || true

log "Pushing to staging branch..."
git push origin staging || git push origin HEAD:staging

log "Build and sync completed!"