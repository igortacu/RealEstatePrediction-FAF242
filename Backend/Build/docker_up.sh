#! /usr/bin/bash

docker rm -f api-server

docker build -t test-server .

docker run -d -p 5000:5000 test-server --name api-server

