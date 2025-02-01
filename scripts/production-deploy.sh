#!/bin/bash
set -e

# Function to log with timestamps
# Provides consistent logging format across all deployment scripts
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting production deployment process..."

# Ensure we're on staging branch
# This script must be run from staging to ensure proper content flow
if [[ $(git rev-parse --abbrev-ref HEAD) != "staging" ]]; then
    log "Error: Must be on staging branch"
    exit 1
fi

# Create and switch to production branch
# Creates new branch if it doesn't exist, otherwise switches to existing one
log "Creating production branch..."
git checkout -b production 2>/dev/null || git checkout production

# Pull latest changes from cms branch
# Ensures all content changes are included in the build
log "Fetching latest content..."
git fetch origin cms:cms

# Merge content changes
# Combines content updates with staging code
log "Merging content changes..."
if ! git merge --no-ff cms -m "Merge content updates from cms branch"; then
    log "Error: Content merge failed. Please resolve conflicts manually."
    git merge --abort
    exit 1
fi

# Run the build process
# Executes the main build script for production
log "Starting build process..."
bash scripts/build.sh

# Copy static files to production directory
# Moves built files to their final location
if [ -d "dist" ]; then
    log "Copying static files to production..."
    cp -r dist/* .
fi

log "Production deployment completed successfully!"