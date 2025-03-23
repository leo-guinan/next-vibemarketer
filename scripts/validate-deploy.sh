#!/bin/bash

# Maximum number of retries
MAX_RETRIES=10
# Delay between retries in seconds
RETRY_DELAY=5

check_logs() {
    gcloud run services logs read next-vibemarketer \
        --region us-central1 \
        --limit=50 2>/dev/null \
        | grep -q "> Ready on http://0.0.0.0"
    return $?
}

echo "Validating server startup..."

# Try to find the startup message in logs
for ((i=1; i<=MAX_RETRIES; i++)); do
    if check_logs; then
        echo "✅ Server started successfully"
        exit 0
    fi
    echo "Attempt $i of $MAX_RETRIES: Server startup not confirmed yet..."
    sleep $RETRY_DELAY
done

echo "❌ Server startup validation failed after $MAX_RETRIES attempts"
exit 1 