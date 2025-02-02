#!/bin/bash
set -e

# Function to log with timestamps
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting static build process..."

# Run content sync first
log "Syncing content from static branch..."
bash ./scripts/sync-static.sh

# Clean up previous builds
log "Cleaning up previous builds..."
rm -rf .next static/out

# Build and export the static site
log "Building static site..."
if ! NODE_ENV=production npm run build; then
    log "Error: Static build failed"
    exit 1
fi

# Move 404 page to root for static hosting
log "Setting up error pages..."
if [ -f "static/out/404.html" ]; then
    cp static/out/404.html static/out/404/index.html
fi

# Verify content was properly synced and exists in the build
log "Verifying content in build..."
if [ ! -d "static/out/posts" ] || [ ! -d "static/out/pages" ]; then
    log "Warning: Content directories not found in build output"
fi

log "Static build completed successfully!"