#!/bin/bash

docker run --name couchdb -p 5984:5984 -dit -e COUCHDB_USER=emporiumcoffee -e COUCHDB_PASSWORD=isnotbad1100tigerwife couchdb && \
sleep 20s && \
node -r dotenv/config ./.data/postdata.js