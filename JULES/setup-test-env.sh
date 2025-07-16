#!/bin/bash

# Exit on error and print commands as they're executed
set -ex

# Update package lists and install required system dependencies
echo "Updating package lists and installing system dependencies..."
sudo apt-get update
sudo apt-get install -y \
    nodejs \
    wget

# Install nvm (Node Version Manager)
echo "Installing nvm..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Load nvm into current shell session
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js LTS and set as default
echo "Installing Node.js LTS..."
nvm install --lts
nvm use --lts

# Install pnpm (faster than npm for monorepos)
echo "Installing pnpm..."
npm install -g pnpm

# Clone the repository (if not already cloned)
# Uncomment and modify the following line if you need to clone the repo
# git clone <repository-url> bobby-verse
# cd bobby-verse

# Install project dependencies
echo "Installing project dependencies..."
pnpm install

# Install Cypress dependencies
echo "Installing Cypress system dependencies..."
sudo apt-get install -y \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb

# Set up environment variables
echo "Setting up environment variables..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local 2>/dev/null || echo "No .env.example found, creating empty .env.local"
    touch .env.local
    echo "Created .env.local - please update with your environment variables"
fi

# Run tests
echo "Running tests..."
npm run test

echo ""
echo "✅ Setup complete!"
echo "You can now run the development server with: npm run dev"
