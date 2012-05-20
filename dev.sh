#!/bin/bash
sudo killall -2 node
sudo NODE_ENV=development node web/server.js &