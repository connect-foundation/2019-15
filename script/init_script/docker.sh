#!/bin/bash
hostname=$(cat /etc/hostname)
sed -i "s/localhost/$hostname/" /etc/hosts

sudo apt-get update -y
sudo yes | apt-get upgrade

sudo adduser --ingroup sudo --disabled-password --gecos "" [user]

sudo echo [user]:[password] | chpasswd

curl -fsSL https://get.docker.com -o get-docker.sh
sleep 2
sudo sh get-docker.sh

sudo gpasswd -a developer docker

echo [password] | docker login -u [ID] --password-stdin