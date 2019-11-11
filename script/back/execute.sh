#!/bin/sh

docker pull minyoung403/catch-my-mind-back
docker stop catch-my-mind-back
docker rm catch-my-mind-back
docker run --name=catch-my-mind-back  -d -p 3000:3000 minyoung403/catch-my-mind-back