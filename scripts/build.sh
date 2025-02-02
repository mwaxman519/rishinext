#!/bin/bash
set -e

# Function to log with timestamps
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting static build process..."

# Sync content from static branch
log "Syncing content from static branch..."
if [ ! -d "static/content" ]; then
    mkdir -p static/content
fi

# Clean up previous builds
log "Cleaning up previous builds..."
rm -rf .next out

# Build and export the static site using Next.js default behavior
log "Building static site..."
if ! NODE_ENV=production npm run build; then
    log "Error: Static build failed"
    exit 1
fi

# Move 404 page to root for static hosting
log "Setting up error pages..."
if [ -f "out/404.html" ]; then
    cp out/404.html out/404/index.html
fi

log "Static build completed successfully!"