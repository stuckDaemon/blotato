#!/bin/bash

set -e

export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-east-1

ENDPOINT=http://localhost:4566
ACCOUNT_ID=000000000000
REGION=us-east-1

##################################################
# MAIN QUEUES
##################################################

echo "Creating main queue..."

aws --endpoint-url=$ENDPOINT sqs create-queue --queue-name social-queue || true


##################################################
# DLQs
##################################################

echo "Creating DLQ..."

aws --endpoint-url=$ENDPOINT sqs create-queue --queue-name social-queue-dlq || true

##################################################
# ATTACH REDRIVE POLICIES
##################################################

attach_redrive_policy () {
  QUEUE_NAME=$1
  DLQ_NAME=$2

  QUEUE_URL="$ENDPOINT/$ACCOUNT_ID/$QUEUE_NAME"
  DLQ_URL="$ENDPOINT/$ACCOUNT_ID/$DLQ_NAME"

  DLQ_ARN=$(aws --endpoint-url=$ENDPOINT sqs get-queue-attributes \
    --queue-url $DLQ_URL \
    --attribute-names QueueArn \
    --query "Attributes.QueueArn" \
    --output text)

  cat > /tmp/redrive.json <<EOF
{
  "RedrivePolicy": "{\"deadLetterTargetArn\":\"$DLQ_ARN\",\"maxReceiveCount\":\"3\"}"
}
EOF

  aws --endpoint-url=$ENDPOINT sqs set-queue-attributes \
    --queue-url $QUEUE_URL \
    --attributes file:///tmp/redrive.json
}

echo "Attaching redrive policies..."
attach_redrive_policy social-queue social-queue-dlq

##################################################

echo "System initialized successfully."
