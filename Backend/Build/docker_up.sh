#! /usr/bin/bash

docker rm -f api-server

docker build -t test-server .

docker run --name api-server --network npm_default -d  test-server
