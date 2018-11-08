#!/bin/bash
set -e

eval "$(ssh-agent -s)"
chmod 600 deploy_rsa
ssh-add deploy_rsa

# Skip this command if you don't need to execute any additional commands after deploying.
ssh deploy@$host -p $port <<EOF
  set -e
  cd home-station-api
  git pull
  git fetch origin
  git reset --hard origin/master
  docker build --force-rm -t weatherapi .
  docker stop weatherapi || true
  docker rm --force weatherapi || true
  docker run --restart=always --net=host --name=weatherapi -d -t weatherapi
  docker exec weatherapi <<EOF yarn sequelize db:migrate EOF
EOF