# Notes on working with Docker.

## Terminology
- **docker-image**
This is a blueprint-instruction to build a docker running instance.
- **docker-container**
This is a running instance of the docker image.

## Docker installation
Install docker:
```bash
#!/bin/bash
sudo apt-get update
sudo apt-get install -y\
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
if [[ $? == 0 ]]
then
    #make possible run docker without sudo preffix.
    sudo groupadd docker
    sudo usermod -aG docker $USER
    newgrp docker
    echo "Installation complete."
    exit 0
else
    echo "Error during docker installation"
    exit 1
fi
```
Install nvidia-docker:
```bash
#!/bin/bash
distribution=$(. /etc/os-release;echo $ID$VERSION_ID) \
   && curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add - \
   && curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list \
   | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
sudo apt-get update
sudo apt-get install -y nvidia-docker2
sudo systemctl restart docker
if [[ $? == 0 ]]
then
    echo "Installation complete."
    exit 0
else
    echo "Error during docker installation"
    exit 1
fi
```

## Base commands
- watch existing images:
```bash
docker images
```
- watch running containers:
```bash
docker ps
```
- build image:
```bash
# . - path to Dockerfile
docker build -t <image_name> .
```
- run an image:
```bash
docker run -p 5000:80 --name <container_name> <image_name>
```
- stop an container:
```bash
docker container stop <container_name>
docker container kill <container_name>
```
- run terminal in running container:
```bash
docker exec -it <container_name> /bin/bash
```
- run command in new container from image:
```bash
docker exec -it <image> <command>
```

## Working with volumes
Volume can map docker-fs paths into the host machine.
```bash
# create volume
docker volume create <volume_name>
# use volume, mount_point - inside container
docker run -dp port:port -v <volume_name>:<mount_point> <image_name>
```

## Working with mountpoints
```bash
#p - port
docker run -dp <p:p> -w <workdir> -v <host_dir>:<dir> <image>
```

## Running stopped containers
Even if container is stopped, its content persist.
```bash
#watch the containers
docker container list --all
#select container by name
docker start <container_name>
```

## Networking between containers
```bash
#create Network
docker network create <network_name>
#run an image with that network
docker run -d --network <network_name> <image>
#connect a running container
docker network connect <network_name> <container>
#inspect a network (for ip and other details)
docker network inspect <network_name>
```


## Pushing an image
1. Sign Up , Login to dockerhub
2. Create new repository
3. Create image tag:
```bash
docker tag <image:version> <docker_id/repo>
```
4. Logout and login locally:
```bash
docker logout
docker login
```
5. Push to remote repo:
```bash
docker push <image:version>
```

## Pulling a repo
```bash
docker pull <docker_id/repo:version>
```

## Build speechbox_docker
Build without cuda:
```bash
docker build --build-arg platf="ubuntu:18.04" -t speechbox_docker:cpu .
```

Build with cuda:
```bash
docker build --build-arg platf="nvidia/cuda:10.2-base" -t speechbox_docker:cuda .
```

## Run speechbox_docker
```bash
sudo docker run -it --rm --gpus all speechbox_docker:cuda
```
