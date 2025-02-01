#!/bin/bash
set -e

# Function to log with timestamps
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting static export process..."

# Ensure we are on staging branch
log "Verifying staging branch..."
git checkout staging
git pull origin staging

# Install dependencies
log "Installing dependencies..."
npm install

# Preserve TinaCMS configuration
log "Syncing TinaCMS configuration..."
# Create temporary directory for TinaCMS files
mkdir -p .temp/tina .temp/.tina
# Copy TinaCMS files to temp directory
cp -r tina/* .temp/tina/ 2>/dev/null || true
cp -r .tina/* .temp/.tina/ 2>/dev/null || true

# Generate fresh TinaCMS schema if needed
log "Generating TinaCMS schema..."
npx tinacms init || true
if [ -f "tina/config.ts" ]; then
    log "TinaCMS schema exists, preserving configuration"
    cp -r .temp/tina/* tina/ 2>/dev/null || true
    cp -r .temp/.tina/* .tina/ 2>/dev/null || true
fi

# Run the static export
log "Running static export..."
npm run build && npm run export

# Switch to cms branch
log "Switching to cms branch..."
git checkout cms
git pull origin cms

# Clean the branch except .tina directory
log "Cleaning cms branch..."
find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name '.tina' -exec rm -rf {} +

# Copy static build and restore TinaCMS config
log "Copying static build..."
cp -r out/* .
cp -r .temp/.tina/* .tina/
cp -r .temp/tina/* tina/

# Commit and push the changes
log "Committing changes..."
git add .
git commit -m "Export static build to CMS branch

Build timestamp: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
Source: staging branch"

log "Pushing to cms branch..."
git push origin cms

# Switch back to staging branch and cleanup
log "Cleaning up..."
git checkout staging
rm -rf .temp

log "Static export completed successfully!"