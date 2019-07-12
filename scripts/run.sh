#!/bin/bash

#run after docker build -t <username>/lkapi .

#docker build -t michaelpeterswa/lkapi .

#docker run -d --name lkapi -p 6969:6969 --restart always michaelpeterswa/lkapi

FILE=".lkconf"
HOSTNAME="$(hostname)"
if [ ! -f $FILE ]; then
    echo "lkapi conf file not found!"
    echo "writing to .lkconf..."
    echo "FIRSTRUN=\"yes\"" > .lkconf
    echo 
    echo "starting docker build step..."
    docker build -t $HOSTNAME/lkapi .
fi

docker run -d --name lkapi -p 6969:6969 --restart always michaelpeterswa/lkapi
echo "running $HOSTNAME/lkapi docker image on port 6969"
echo "check \"docker logs lkapi\" for more info" 
