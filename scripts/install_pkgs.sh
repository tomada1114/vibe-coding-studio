#!/bin/bash

# Auto-install dependencies on session start
# This script is triggered by the SessionStart hook in .claude/settings.json

echo "📦 Installing dependencies..."

# Install Node.js dependencies
if [ -f "package.json" ]; then
  echo "Installing npm packages..."
  npm install
else
  echo "⚠️  No package.json found"
fi

exit 0
