#!/bin/bash

# Exit on error
set -e

echo "Starting static site sync process..."

# Ensure the content directory exists
mkdir -p content/pages
mkdir -p content/global

# Build the site
echo "Building site..."
npm run build

# Create or update the static branch
echo "Switching to static branch..."
git checkout static 2>/dev/null || git checkout -b static
git pull origin static || true

# Copy the built files
echo "Copying built files..."
cp -r out/* .
cp -r public/* .

# Add and commit changes
echo "Committing changes..."
git add .
git commit -m "Sync static site $(date +%Y-%m-%d-%H-%M-%S)" || true
git push origin static

# Return to staging branch
echo "Returning to staging branch..."
git checkout staging

echo "Static site sync complete!"