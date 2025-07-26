# Docker Essential Commands Cheat Sheet

## 1. Docker Installation Check

```bash
docker --version
docker info
```

---

## 2. Run a Docker Container

```bash
docker run hello-world
```

```bash
docker run -it ubuntu
```

---

## 3. List Commands

```bash
docker ps              # List running containers
docker ps -a           # List all containers (including stopped)
docker images          # List downloaded images
docker volume ls       # List volumes
docker network ls      # List networks
```

---

## 4. Image Management

```bash
docker pull <image_name>          # Download image
docker build -t myapp .           # Build image from Dockerfile
docker tag myapp myname/myapp:v1  # Tag image
docker rmi <image_id>             # Remove image
```

---

## 5. Container Lifecycle

```bash
docker start <container_id>       # Start existing container
docker stop <container_id>        # Stop running container
docker restart <container_id>     # Restart container
docker rm <container_id>          # Remove container
```

---

## 6. Build & Run from Dockerfile

```bash
docker build -t myapp .
docker run -d -p 8000:8000 myapp
```

> `-d`: detached (background)  
> `-p`: map ports (host:container)

---

## 7. Volume Mounting (for persistent data)

```bash
docker run -v $(pwd):/app myapp
```

---

## 8. Copy Files In/Out

```bash
docker cp myfile.txt <container_id>:/app/
docker cp <container_id>:/app/output.txt .
```

---

## 9. Execute Commands Inside Container

```bash
docker exec -it <container_id> bash
```

---

## 10. Cleanup

```bash
docker stop $(docker ps -q)           # Stop all containers
docker rm $(docker ps -a -q)          # Remove all containers
docker rmi $(docker images -q)        # Remove all images
docker volume prune                   # Remove unused volumes
docker system prune                   # Clean up everything
```

---

## 11. Docker Compose

```bash
docker-compose up -d      # Start all services
docker-compose down       # Stop and remove containers, networks
docker-compose build      # Build images
```

---

## Dockerfile Example

```Dockerfile
FROM python:3.11
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
```

---

Happy Docking! 🐳
