#!/bin/bash

# EC2 instances details

EC2_DNS="ec2-3-24-181-251.ap-southeast-2.compute.amazonaws.com"
EC2_USER="ubuntu"
EC2_PEM="dat-pc.pem"

# Check if Ansible is installed

echo ""
_=$(dpkg -l ansible)
if [ $? == 1 ]
then
  echo "ERROR: Ansible is not installed."
  exit 1
else
  echo "Ansible found"
  echo ""
fi

# Check if EC2 private key exists

_=$(find ~/.ssh/$EC2_PEM)
if [ $? == 1 ]
then
  echo "ERROR: The required EC2 private key does not exists."
  exit 1
else
  echo "Private key found"
  echo ""
fi

# Check if EC2 connection is possible

ssh -o "BatchMode=yes" -i "~/.ssh/"$EC2_PEM $EC2_USER@$EC2_DNS -o ConnectTimeout=5 exit

if [ $? == 0 ]
then 
  echo "Connection can be established with EC2 instance."
  echo ""
else
  echo "ERROR: Connection cannot be established with EC2 instance."
  exit 1
fi

# Run Ansible playbook

ansible-playbook -i ansible/inventory.ini ansible/playbook/deploy.yml
