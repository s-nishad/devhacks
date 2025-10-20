# Django + Docker + CI/CD

> **Python:** 3.12 • **Django:** 5.2.7

This is a **detailed, hands-on**, slightly "hacker-y" tutorial for deploying a Django app with Docker, docker-compose, and GitHub Actions CI/CD — **without pushing images to a registry**. Clean, repeatable, portable, and ready to run on any VPS or cloud VM that supports Docker + SSH.

---

## 1. Quick Goals

- Build and test the app in GitHub Actions.
- Deploy by SSHing into the server and rebuilding containers there.
- No Docker registry required — images are built on the server from your repo.
- Keep it simple, reproducible, and safe to run on any server with Docker.

---

## 2. Assumptions & Prerequisites

- You have a GitHub repository for your project.
- Your server (VPS or VM) has SSH access and root or sudo privileges.
- Docker & docker-compose will be installed on the server.
- You will add a deploy SSH private key to GitHub Secrets and the public key to the server `~/.ssh/authorized_keys`.
- A one-time `git clone` will be performed on server; CI will `git pull`.

Commands you'll need locally and on server:

```bash
# generate ssh key locally
ssh-keygen -t ed25519 -C "deploy@myproject" -f ~/.ssh/myproject_deploy
# copy public key to server (~/.ssh/authorized_keys)
ssh-copy-id -i ~/.ssh/myproject_deploy.pub user@server_ip
```

Add `~/.ssh/myproject_deploy` (private) to GitHub Secrets as `SSH_KEY`.

---

## 3. Project Layout

```
myproject/
├── apps/
│   └── auth_app/
├── config/
│   ├── __init__.py
│   ├── settings.py
│   ├── dev.py
│   ├── prod.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── .env
└── .github/workflows/ci-cd.yml
```

---

## 4. File contents (copy-ready)

Below are ready-to-paste file contents. Replace values like `your-secret-key`, `your.server.ip`, and `/path/to/app` as needed.

### Dockerfile (lean, production-ready)

```dockerfile
# Dockerfile
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# System deps for typical Python packages (adjust for your packages)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    gcc \
  && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/
RUN python -m pip install --upgrade pip && pip install -r requirements.txt

COPY . /app/

# Optional non-root user
RUN addgroup --system app && adduser --system --ingroup app app
USER app

EXPOSE 8000
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3", "--threads", "2"]
```

> **Hacker tip:** Keeping system-level installs minimal reduces image size and surface for CVEs.


### docker-compose.yml (db + web)

```yaml
version: "3.9"
services:
  web:
    build: .
    container_name: django_app
    command: gunicorn config.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - .:/app
    ports:
      - "8000:8000"
    env_file:
      - .env
    depends_on:
      - db

  db:
    image: postgres:15
    container_name: django_db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: myproject
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

> **Hacker tip:** For production, bind DB to a private network or use managed DB and remove `ports` exposure.


### .env example

```
DEBUG=False
SECRET_KEY=your-secret-key-REPLACE_ME
DJANGO_SETTINGS_MODULE=config.prod
DATABASE_URL=postgres://postgres:postgres@db:5432/myproject
ALLOWED_HOSTS=your.server.ip,localhost
```

Store the real `.env` on the server only. Do NOT commit to git.


### .gitignore (essential parts)

```
.env
__pycache__/
*.pyc
media/
postgres_data/
*.sqlite3
*.log
```


### GitHub Actions — `.github/workflows/ci-cd.yml`

```yaml
name: Django CI/CD (No Registry)

on:
  push:
    branches: [ main ]

jobs:
  build-test-deploy:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: myproject
        ports: ["5432:5432"]
        options: >-
          --health-cmd "pg_isready -U postgres"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: 3.12

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: Run migrations & tests
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/myproject
        run: |
          python manage.py migrate --noinput
          python manage.py test --verbosity=2

      - name: Deploy to server via SSH
        uses: appleboy/ssh-action@v0.1.10
        with:
          host: ${{ secrets.SERVER_IP }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_KEY }}
          port: 22
          script: |
            set -e
            cd /path/to/app

            # Ensure we have a clean working directory
            git fetch origin main
            git reset --hard origin/main

            # Rebuild and restart containers
            docker-compose down
            docker-compose up -d --build

            # Run migrations & collectstatic
            docker-compose exec -T web python manage.py migrate --noinput
            docker-compose exec -T web python manage.py collectstatic --noinput
```

**Secrets to add to GitHub**:
- `SERVER_IP` — server IP or hostname
- `SERVER_USER` — username for SSH
- `SSH_KEY` — private deploy key (contents of the private key generated earlier)

---

## 5. Local dev workflow (commands)

Use these to develop and test locally before pushing:

```bash
# build & run
docker-compose up -d --build

# check logs
docker-compose logs -f web

# run management commands
docker-compose exec web python manage.py migrate
docker-compose exec web python manage.py createsuperuser

# run tests locally
docker-compose run --rm web python manage.py test

# stop & remove
docker-compose down
```

> **Hacker tip:** When iterating code, use `volumes` so file changes appear inside container instantly.

---

## 6. Server bootstrap (one-time)

On your server (Ubuntu example):

```bash
# update + docker
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg lsb-release

# install Docker (official script)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# install docker-compose (v2 plugin) if not present
sudo apt install -y docker-compose-plugin

# verify
docker --version
docker compose version

# clone repo (one-time)
git clone https://github.com/yourusername/myproject.git /path/to/app
cd /path/to/app

# create .env manually on server (don't commit to git)
# start once to create volumes
docker compose up -d --build
```

> **Important:** For username-based SSH deploys, ensure the `SERVER_USER` can run `docker` or has sudo privileges.

---

## 7. CI/CD flow explained (step-by-step)

1. **Developer pushes to `main`** on GitHub.
2. **GitHub Actions triggers** and starts job on ephemeral runner.
3. **Runner spins up a Postgres service** container (for tests), installs Python deps, runs migrations and tests against that DB.
4. If tests pass, **Action SSHs into your server** using the `appleboy/ssh-action` and runs the deploy script.
5. On the server, `git reset --hard origin/main` ensures the working tree matches the remote commit the runner tested.
6. `docker-compose up -d --build` rebuilds images and restarts containers using the new code.
7. Post-deploy commands (`migrate`, `collectstatic`) run inside the newly started containers.

This flow guarantees **the exact commit tested in CI** is what gets deployed.

---

## 8. Post-deploy tasks & healthchecks

**Add a healthcheck to `docker-compose.yml` for web** so `depends_on` knows service health:

```yaml
  web:
    build: .
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health/" ]
      interval: 30s
      retries: 3
```

Create a minimal health endpoint in Django (e.g., `/health/`) that returns a 200 OK quickly.

**Log rotation & monitoring:**
- Rotate logs using `logrotate` on server or configure Docker logging driver.
- Use a process monitor (Prometheus, Grafana) later for metrics.

---

## 9. Backup & rollback hacks

**Database backup (manual cheat):**

```bash
# run from server
docker exec -t django_db pg_dumpall -c -U postgres > /tmp/db_backup_$(date +%F).sql
# move it off-server
scp /tmp/db_backup_2025-10-20.sql user@backup-host:/backups/
```

**Rollback by git tag or previous commit**

```bash
# list recent commits
git log --oneline -n 10
# rollback to previous stable commit hash
git checkout <previous-hash>
# or reset hard to tag
git reset --hard v1.2.3

docker-compose down
docker-compose up -d --build
```

**Atomic-ish deploy trick:**
- Keep a `backup` directory with the last working `docker-compose` build artifacts or a snapshot tag.
- If new deploy fails, `git reset --hard <previous-commit>` + rebuild.

---

## 10. Security & best-practices (hacker tips)

- **Never store secrets in git.** Use server-side `.env` or a secrets manager.
- **Use a deploy key with limited scope.** Prefer an SSH key dedicated to deploys.
- **Run containers as non-root.** (Dockerfile user added above.)
- **Limit API surface.** Do not expose Postgres port publicly in production; bind to loopback or private subnet.
- **Enable UFW / firewall.** Allow only ports you need (22 for SSH, 80/443 for http/https, 8000 if you expose it).
- **Use HTTPS** with Nginx + Certbot (see optional section).

---

## 11. Troubleshooting cheatsheet

- **App 502/No response after deploy**
  - `docker-compose logs -f web` — check stack trace
  - `docker ps` — ensure containers running
  - `docker-compose exec web python manage.py check`

- **Migrations failing**
  - Run `docker-compose exec web python manage.py migrate --plan` locally to inspect
  - If failing in production, rollback DB before applying

- **Permissions error (writing static files)**
  - Ensure media/static directories are owned by container user or use a volume with correct permissions

- **SSH Action failing to connect**
  - Check firewall, IP, and that the `SSH_KEY` secret matches the server's authorized key
  - Ensure `SERVER_USER` has rights to run docker commands (or use `sudo docker-compose ...`)

---

## 12. Optional add-ons (short recipes)

### A. Nginx + Certbot (basic recipe)

Use Nginx as a reverse proxy and Certbot for HTTPS. Add an `nginx` service in `docker-compose.yml` or run Nginx on host.

`docker-compose` snippet (very condensed):

```yaml
nginx:
  image: nginx:stable
  ports:
    - "80:80"
    - "443:443"
  volumes:
    - ./deploy/nginx.conf:/etc/nginx/conf.d/default.conf:ro
    - ./certbot/www:/var/www/certbot
    - ./certbot/conf:/etc/letsencrypt
  depends_on:
    - web
```

Then use Certbot container or host Certbot to generate certificates and mount them into Nginx.


### B. Redis + Celery (async tasks)

Add services:

```yaml
redis:
  image: redis:7
  ports: ["6379:6379"]

celery:
  build: .
  command: celery -A config worker --loglevel=info
  depends_on:
    - redis
    - db
  env_file:
    - .env
```

Then configure Django to use Redis broker.

---

## Final Words — Hacker Mindset

This flow is intentionally **practical** and **lean**:

- CI validates the commit before remote rebuild.
- Server builds the image locally — no registry dependencies.
- You keep control over the server and the artifacts.

When you’re ready to scale or automate multi-region deploys, the same Docker images (with minimal changes) can be pushed to a registry (GHCR, ECR) and consumed by Kubernetes/ECS/GCP Cloud Run.

Go ahead and paste this into a `Django-Docker-CI-CD-Hacker-Style.md` in your repo and tweak the paths. Deploy, iterate, and keep backups. Hack responsibly.

---

*End of file.*

