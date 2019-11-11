#!/bin/bash
echo $'NCP_ACCESS_KEY=[NCP_ACCESS_KEY]\nNCP_SECRET_KEY=[NCP_SECRET_KEY]' > /opt/NCP_AUTH_KEY
wget https://devtools.ncloud.com/sourcedeploy/agent/download/install
chmod 755 install
./install
rm -rf install