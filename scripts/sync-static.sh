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

# Function to clean up existing worktrees
cleanup_worktrees() {
    local static_worktree="$1"
    # Remove any existing worktree directory
    if [ -d "$static_worktree" ]; then
        log_message "Cleaning up existing worktree at $static_worktree..."
        rm -rf "$static_worktree"
    fi
    # Try to remove worktree from git's perspective
    git worktree remove -f "$static_worktree" 2>/dev/null || true
}

log_message "Starting bi-directional content sync process..."

# Store current branch
CURRENT_BRANCH=$(git branch --show-current) || handle_error "Failed to get current branch"

# Ensure we are on staging branch
log_message "Ensuring we are on staging branch..."
git checkout staging || handle_error "Failed to checkout staging branch"

# Fetch the latest changes from static branch
log_message "Fetching latest changes from static branch..."
git fetch origin static || handle_error "Failed to fetch static branch"

# Create a temporary worktree for static branch
TEMP_DIR=$(mktemp -d)
log_message "Setting up temporary worktree for static branch in $TEMP_DIR..."

# Clean up any existing worktrees before creating new one
cleanup_worktrees "$TEMP_DIR"
cleanup_worktrees ".static-temp"

# Create new worktree
git worktree add "$TEMP_DIR" static || handle_error "Failed to create worktree"

# Ensure content directories exist
log_message "Ensuring content directories exist..."
mkdir -p static/content/{pages,posts}
mkdir -p "$TEMP_DIR/static/content"

# Step 1: Push new pages from staging → static
log_message "Syncing new pages from staging to static..."
rsync -av --ignore-existing --delete static/content/ "$TEMP_DIR/static/content/" || handle_error "Failed to sync staging to static"

# Step 2: Pull new edits from static → staging
log_message "Syncing edits from static to staging..."
rsync -av --ignore-existing "$TEMP_DIR/static/content/" static/content/ || handle_error "Failed to sync static to staging"

# Commit changes in static branch if there are any
cd "$TEMP_DIR"
if git status --porcelain | grep -q "static/content/"; then
    log_message "Changes detected, committing to static branch..."
    git add static/content/
    git commit -m "Bi-directional sync between staging and static - $(date '+%Y-%m-%d %H:%M:%S')" || true
    git push origin static || handle_error "Failed to push changes"
else
    log_message "No content changes detected in static branch"
fi
cd -

# Clean up temporary worktree
log_message "Cleaning up temporary worktree..."
cleanup_worktrees "$TEMP_DIR"

# Return to original branch
log_message "Returning to original branch: $CURRENT_BRANCH"
git checkout "$CURRENT_BRANCH" || handle_error "Failed to return to original branch"

log_message "Bi-directional content sync completed successfully!"