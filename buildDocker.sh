#!/bin/bash
set -e
# Build the docker image

IMAGE="minor-api-server"

docker build -t $IMAGE .