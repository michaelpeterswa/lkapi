#!/bin/bash

#run after docker build -t michaelpeterswa/lkapi .

#docker build -t michaelpeterswa/lkapi .

docker run -d --name lkapi -p 6969:6969 --restart always michaelpeterswa/lkapi
