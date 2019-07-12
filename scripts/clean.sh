#!/bin/bash

echo "cleaning docker containers..."
docker stop lkapi
docker rm lkapi