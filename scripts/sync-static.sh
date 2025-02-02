#!/bin/bash
set -e

# Function to log messages with timestamps
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Function to handle errors
handle_error() {
    log_message "ERROR: $1"
    exit 1
}

log_message "Starting content sync process..."

# Store current branch
CURRENT_BRANCH=$(git branch --show-current) || handle_error "Failed to get current branch"

# Disable sparse-checkout temporarily
log_message "Disabling sparse-checkout..."
git sparse-checkout disable

# Ensure we're on staging branch
log_message "Switching to staging branch..."
git checkout staging || handle_error "Failed to checkout staging branch"

# Create a temporary worktree for static branch
TEMP_DIR=$(mktemp -d)
log_message "Setting up temporary worktree for static branch in $TEMP_DIR..."
git worktree add "$TEMP_DIR" static || handle_error "Failed to create worktree"

# Ensure content directories exist in both locations
log_message "Ensuring content directories exist..."
mkdir -p static/content/{pages,posts,global}
mkdir -p "$TEMP_DIR/static/content"

# Sync content from staging to static branch
log_message "Syncing content from staging to static branch..."
if [ -d "static/content" ]; then
    rsync -av --delete --exclude='.git*' static/content/ "$TEMP_DIR/static/content/" || handle_error "Failed to sync content"

    # Commit changes in static branch if there are any
    cd "$TEMP_DIR"
    if git status --porcelain | grep -q "static/content/"; then
        log_message "Changes detected, committing to static branch..."
        git add static/content/
        git commit -m "Sync content from staging branch - $(date '+%Y-%m-%d %H:%M:%S')" || handle_error "Failed to commit changes"
        git push origin static || handle_error "Failed to push changes"
    else
        log_message "No content changes detected"
    fi
    cd ..
else
    handle_error "No content directory found in staging"
fi

# Clean up temporary worktree
log_message "Cleaning up..."
git worktree remove -f "$TEMP_DIR"
rm -rf "$TEMP_DIR"

# Re-enable sparse-checkout
log_message "Re-enabling sparse-checkout..."
git sparse-checkout init
echo "static/content/" > .git/info/sparse-checkout
git sparse-checkout reapply

# Return to original branch
log_message "Returning to original branch: $CURRENT_BRANCH"
git checkout "$CURRENT_BRANCH" || handle_error "Failed to return to original branch"

log_message "Content sync completed successfully!"