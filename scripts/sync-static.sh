#!/bin/bash

# Exit on error
set -e

echo "Starting static content sync process..."

# Initialize git sparse-checkout if not already set up
if [ ! -f ".git/info/sparse-checkout" ]; then
    echo "Setting up git sparse-checkout..."
    git config core.sparseCheckout true
    echo "static/content/" > .git/info/sparse-checkout
fi

# Ensure we're on staging branch
git checkout staging

# Fetch latest from remote
echo "Fetching latest content from remote..."
git fetch origin static

# Create a temporary worktree for static branch
echo "Setting up temporary worktree for static branch..."
git worktree add -f .static-temp static 2>/dev/null || true

# Ensure content directories exist
echo "Ensuring content directories exist..."
mkdir -p static/content/{pages,posts,global}

# Sync content from static branch
echo "Syncing content from static branch..."
if [ -d ".static-temp/static/content" ]; then
    rsync -av --delete .static-temp/static/content/ static/content/
else
    echo "Warning: No content directory found in static branch"
fi

# Clean up temporary worktree
echo "Cleaning up..."
git worktree remove -f .static-temp 2>/dev/null || true

# Return to staging branch (just to be safe)
git checkout staging

echo "Content sync complete!"