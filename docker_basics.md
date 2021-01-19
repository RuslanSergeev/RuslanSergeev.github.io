# Конспект по работе с docker

## Основные понятия
- docker-image
This is a blueprint-instruction to build a docker running instance.
- docker-container
This is a running instance of the docker image.


## Основные команды
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

## Working with mountpoints:
```bash
#p - port
docker run -dp <p:p> -w <workdir> -v <host_dir>:<dir> <image>
```

## Running stopped containers:
Even if container is stopped, its content persist.
```bash
#watch the containers
docker container list --all
#select container by name
docker start <container_name>
```

## Networking between containers:
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

## Pulling a repo:
```bash
docker pull <docker_id/repo:version>
```
