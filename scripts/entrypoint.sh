#!/bin/bash

set -e

echo "[Pro-Auth] Starting container with APP=$APP"

case "$APP" in
backend)
    echo "[Pro-Auth] Starting backend service..."
    exec ./backend
    ;;

cron)
    echo "[Pro-Auth] Starting cron worker..."
    exec ./cron
    ;;

dashboard)
    echo "[Pro-Auth] Starting dashboard (Next.js static export)..."
    exec npx serve -s /app/web -l 3000
    ;;

*)
    echo "[Pro-Auth] Unknown APP value: '$APP'"
    echo "Valid options: backend, cron, dashboard"
    exit 1
    ;;
esac
