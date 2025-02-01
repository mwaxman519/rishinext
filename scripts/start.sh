#!/bin/bash

# Kill any existing Next.js processes
pkill -f "next" || true
pkill -f "node" || true

# Clean up cache directories
rm -rf .next node_modules/.cache

# Wait for port 3000 to be available
while lsof -i :3000 >/dev/null 2>&1; do
  echo "Waiting for port 3000 to become available..."
  sleep 1
done

# Start Next.js server and wait for health check
echo "Starting Next.js server..."
exec next dev --hostname 0.0.0.0 --port 3000