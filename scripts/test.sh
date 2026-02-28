#!/usr/bin/env bash

if [ -z "$1" ]; then
  echo "Usage: ./stress.sh <number_of_requests>"
  exit 1
fi

COUNT=$1
URL="http://localhost:3000/posts"

echo "Sending $COUNT requests..."

for i in $(seq 1 $COUNT); do
  curl -s -X POST "$URL" \
    -H "Content-Type: application/json" \
    -d "{
      \"userId\": \"user-$i\",
      \"platform\": \"tiktok\",
      \"content\": \"stress test post $i\",
      \"desiredTime\": \"2026-03-01T09:00:00Z\"
    }" &
done

wait

echo "Done."
