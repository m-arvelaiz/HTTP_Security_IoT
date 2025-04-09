###################################
# Prerequisites

# Install openssl 
# ---------
#For windows
# winget -v
# winget search openssl
# winget install ShiningLight.OpenSSL.Light
# ---------
#For Ubuntu
sudo apt-get update
sudo apt install openssl 

# ---------

openssl genrsa -out private.key 2048
openssl req -new -key private.key -out request.csr
#check the common name that have to be configured above. localhost or the iotnetwork (if docker container is used)
openssl x509 -req -days 365 -in request.csr -signkey private.key -out certificate.cert

# The certificates have to be put on the data folder 

#Create the environtment
#First create the docker network that its going to containt the different actors of the demo
docker network create iot_network

#to check the ip adress of each container use the following:
docker network inspect iot_network

# After generating the certificates create the docker comopose container
docker compose up -d