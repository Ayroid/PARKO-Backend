#!/bin/bash

set -e

# Build the docker image
IMAGE="minor-api-server"

docker run --rm -d -p 3000:3000 -v $(pwd):/app --name minor-api-server $IMAGE                