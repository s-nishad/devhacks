# FastAPI + Docker + EC2 + Nginx

> Full Production Setup
> Includes: FastAPI + Docker + Nginx + Security + CI/CD

---

# Architecture (Production)

```
Internet
   ↓
Nginx (80 / 443)
   ↓
Docker (FastAPI)
   ↓
Gunicorn + Uvicorn
```

---

# Step 1 - EC2 Setup

- Ubuntu 22.04
- Open ports:
  - 22 (SSH)
  - 80 (HTTP)
  - 443 (HTTPS)

---

# Step 2 - Connect

```bash
ssh -i your-key.pem ubuntu@YOUR_IP
```

---

# Step 3 - Install Docker

```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER
```

Reconnect SSH.

---

# Step 4 - Clone Project

```bash
git clone https://github.com/your-repo.git
cd your-repo
```

---

# Step 5 - Create .env

```bash
nano .env
```

Example:

```
APP_PORT=8000
JWT_SECRET=supersecretkey
```

---

# Step 6 - Dockerfile

```Dockerfile
FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app ./app

CMD ["gunicorn", "app.main:app", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000", "--workers", "4"]
```

---

# Step 7 - docker-compose.yml

```yaml
version: "3.9"

services:
  web:
    build: .
    container_name: fastapi-app
    restart: always
    ports:
      - "8000:8000"
    env_file:
      - .env
```

---

# Step 8 - Run App

```bash
docker compose up -d --build
```

Check running containers:

```bash
docker ps
```

Test:

```
http://YOUR_IP:8000/docs
```

---

# Step 9 - Install Nginx

```bash
sudo apt install nginx -y
```

---

# Step 10 - Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/fastapi
```

Paste:

```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:8000;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable:

```bash
sudo ln -s /etc/nginx/sites-available/fastapi /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

Test:

```
http://YOUR_IP/docs
```

---

# Step 11 - Security Hardening

## Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw enable
```

## Hide Nginx version

```bash
sudo nano /etc/nginx/nginx.conf
```

Add inside http block:

```
server_tokens off;
```

Restart:

```bash
sudo systemctl restart nginx
```

## Disable root login

```bash
sudo nano /etc/ssh/sshd_config
```

Set:

```
PermitRootLogin no
```

Restart:

```bash
sudo systemctl restart ssh
```

---

# Common Issues Fix

## Port not accessible

✔ Fix:
- Check Security Group
- Check docker ports mapping

## Container running but no response

✔ Fix:
```bash
docker logs fastapi-app
```

## Nginx not working

✔ Fix:
```bash
sudo nginx -t
```

---

# Step 12 - CI/CD (Auto Deploy)

## Generate key

```bash
ssh-keygen -t rsa -b 4096 -C "github-actions"
```

## Add public key to server

```bash
nano ~/.ssh/authorized_keys
```

## Add secrets in GitHub

```
EC2_HOST
EC2_USER
EC2_SSH_KEY
```

---

## GitHub Action

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd ~/your-repo
            git pull
            docker compose up -d --build
```

---

# Final Flow

```
git push → GitHub Actions → EC2 → Docker rebuild → Nginx → Live API
```

---

# Production Checklist

- [ ] Docker running
- [ ] Nginx reverse proxy working
- [ ] Port 8000 not public (optional)
- [ ] Firewall enabled
- [ ] CI/CD working
- [ ] HTTPS (add later with domain)

---

# DONE

Now you have a **production-ready FastAPI deployment with Docker + Nginx + CI/CD**
