#! /usr/bin/bash

sudo docker rm -f api-server

sudo docker build -t test-server .

sudo docker run -d -p 5000:5000 test-server --name api-server