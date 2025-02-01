#!/bin/bash
set -e

# Function to log with timestamps
# Provides consistent logging format across all scripts
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "Setting up production branch..."

# Create and switch to production branch
# Initializes a clean production environment
git checkout -b production

# Remove development-only directories and files
# Cleans up unnecessary files for production
log "Removing development-only files..."
rm -rf lib/notifications/

# Clean build artifacts
# Ensures a fresh build environment
log "Cleaning build artifacts..."
rm -rf .next/
rm -rf out/
rm -rf dist/

# Build static site
# Generates production-ready static files
log "Building static site..."
next build

log "Production branch setup completed!"