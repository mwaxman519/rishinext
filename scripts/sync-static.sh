#!/bin/bash

# Exit on error
set -e

echo "Starting static content sync process..."

# Ensure the content directory exists
if [ ! -d "static/content" ]; then
    echo "Creating content directories..."
    mkdir -p static/content/pages
    mkdir -p static/content/posts
    mkdir -p static/content/global
fi

# Pull latest content from static branch if we're in a git repository
if [ -d ".git" ]; then
    echo "Syncing content from static branch..."
    git fetch origin static || true
    git checkout static -- static/content || true
    git checkout staging
fi

# Verify content directories
echo "Verifying content structure..."
for dir in "pages" "posts" "global"; do
    if [ ! -d "static/content/$dir" ]; then
        echo "Creating static/content/$dir directory..."
        mkdir -p "static/content/$dir"
    fi
done

echo "Content sync complete!"