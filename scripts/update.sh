#!/bin/bash

echo "updating and rebuilding..."
echo 
echo "starting docker build step..."
docker build -t $HOSTNAME/lkapi .