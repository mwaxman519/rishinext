#!/bin/bash
set -e

# Function to log with timestamps
# Ensures consistent logging across deployment processes
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting staging deployment process..."

# Ensure we're on staging branch
# Validates current branch to prevent accidental deployments
if [[ $(git rev-parse --abbrev-ref HEAD) != "staging" ]]; then
    log "Error: Must be on staging branch"
    exit 1
fi

# Pull latest changes from cms branch (content updates)
# Ensures staging has the latest content for testing
log "Fetching latest content from cms branch..."
git fetch origin cms:cms

# Create a temporary merge commit to include cms content
# Allows testing with latest content without permanent merge
log "Merging content changes..."
if ! git merge --no-commit cms; then
    log "Error: Content merge failed. Please resolve conflicts manually."
    git merge --abort
    exit 1
fi

# Run the build process
# Executes the main build script for staging environment
log "Starting build process..."
bash scripts/build.sh

log "Staging deployment completed successfully!"