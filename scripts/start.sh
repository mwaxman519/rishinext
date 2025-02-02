#!/bin/bash
set -e

# Function to log messages with timestamps
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Function to cleanup processes
cleanup() {
  log "Cleaning up processes..."
  pkill -f "next" || true
  pkill -f "node" || true
}

# Set up error handling
trap cleanup EXIT

log "Starting Next.js development server..."

# Clean up cache directories
log "Cleaning cache directories..."
rm -rf .next node_modules/.cache

# Ensure content directories exist
log "Creating content directories..."
mkdir -p content/pages
mkdir -p content/posts
mkdir -p static/content/pages
mkdir -p static/content/posts

# Wait for port 3000 to be available
while lsof -i :3000 >/dev/null 2>&1; do
  log "Waiting for port 3000 to become available..."
  sleep 1
done

# Set development environment
export NODE_ENV=development
export NEXT_TELEMETRY_DISABLED=1
export NEXT_DEBUG_MDX=true # Enable MDX debug logging

# Start Next.js server and wait for health check
log "Starting Next.js server..."
exec next dev --hostname 0.0.0.0 --port 3000