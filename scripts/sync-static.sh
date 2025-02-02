#!/bin/bash

# Ensure the content directory exists
mkdir -p content/pages
mkdir -p content/global

# Build the site
npm run build

# Create or update the static branch
git checkout static 2>/dev/null || git checkout -b static
git pull origin static || true

# Copy the built files
cp -r out/* .

# Commit and push changes
git add .
git commit -m "Sync static site" || true
git push origin static

# Return to staging branch
git checkout staging
