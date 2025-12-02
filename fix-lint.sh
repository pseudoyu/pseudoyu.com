#!/bin/bash

echo "🔧 Fixing lint issues..."

# Fix tab characters in markdown files
echo "📝 Converting tabs to spaces in markdown files..."
find pages/ -name "*.md" -type f -exec sed -i '' 's/\t/  /g' {} +

# Fix irregular whitespace (common Unicode whitespace characters)
echo "🧹 Cleaning irregular whitespace..."
find pages/ -name "*.md" -type f -exec sed -i '' 's/\u00A0/ /g' {} +  # Non-breaking space
find pages/ -name "*.md" -type f -exec sed -i '' 's/\u2000/ /g' {} +  # En quad
find pages/ -name "*.md" -type f -exec sed -i '' 's/\u2001/ /g' {} +  # Em quad
find pages/ -name "*.md" -type f -exec sed -i '' 's/\u2002/ /g' {} +  # En space
find pages/ -name "*.md" -type f -exec sed -i '' 's/\u2003/ /g' {} +  # Em space
find pages/ -name "*.md" -type f -exec sed -i '' 's/\u2009/ /g' {} +  # Thin space
find pages/ -name "*.md" -type f -exec sed -i '' 's/\u200A/ /g' {} +  # Hair space
find pages/ -name "*.md" -type f -exec sed -i '' 's/\u3000/ /g' {} +  # Ideographic space

echo "✅ Lint fixes applied!"
