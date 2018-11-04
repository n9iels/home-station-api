#!/bin/bash
git reset --hard
git checkout master
git pull
docker build --force-rm -t weatherapi .
docker stop weatherapi
docker rm --force weatherapi
docker run --restart=always --net=host --name=weatherapi -d -t weatherapi
docker exec -it weatherapi yarn sequelize db:migrate