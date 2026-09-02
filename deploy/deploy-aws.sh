#!/usr/bin/env bash
set -euo pipefail

APP_DIR=/home/ubuntu/apps/ai-lab
WEB_ROOT=/var/www/ai-lab
REPO=https://github.com/trevore777/ai-lab.git

if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO" "$APP_DIR"
else
  git -C "$APP_DIR" fetch origin master
  git -C "$APP_DIR" reset --hard origin/master
fi

sudo mkdir -p "$WEB_ROOT"
sudo rsync -a --delete --exclude '.git' --exclude 'deploy' "$APP_DIR/" "$WEB_ROOT/"
sudo chown -R www-data:www-data "$WEB_ROOT"
sudo nginx -t
sudo systemctl reload nginx
