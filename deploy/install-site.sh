#!/usr/bin/env bash
set -euo pipefail

REPO_DIR=/home/ubuntu/apps/ai-lab
SITE=ai-lab
CONF=/etc/nginx/sites-available/$SITE
ENABLED=/etc/nginx/sites-enabled/$SITE

cd "$REPO_DIR"

# Deploy the static files first.
bash deploy/deploy-aws.sh

# Install only the dedicated AI Lab Nginx server block.
sudo cp deploy/nginx-ai-lab.conf "$CONF"
if [ ! -L "$ENABLED" ]; then
  sudo ln -s "$CONF" "$ENABLED"
fi

# Validate the entire Nginx configuration before any reload.
sudo nginx -t
sudo systemctl reload nginx

echo "AI Lab HTTP site installed."
echo "After ailab.eduappsplus.com.au DNS points to this server, run:"
echo "sudo certbot --nginx -d ailab.eduappsplus.com.au"
