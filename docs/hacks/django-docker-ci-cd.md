# Django + Docker + CI/CD Deployment Guide

**Python:** 3.12
**Framework:** Django 5.2.7
**Purpose:** Deploy Django app smartly with Docker, docker-compose, and CI/CD

---

## 1. Project Structure

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
└── .github/workflows/ci-cd.yml
```

---

## 2. Dockerfile (Python 3.12)

```dockerfile
# Base image
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy project
COPY . /app/

# Expose port
EXPOSE 8000

# Run server
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
```

---

## 3. docker-compose.yml

```yaml
version: '3.9'
services:

  web:
    build: .
    container_name: django_app
    command: gunicorn config.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - .:/app
    ports:
      - 8000:8000
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
      - 5432:5432
    volumes:
      - postgres_data:/var/lib/postgresql/data/

volumes:
  postgres_data:
```

---

## 4. .env Example

```
DEBUG=True
SECRET_KEY=your-secret-key
DJANGO_SETTINGS_MODULE=config.dev
DATABASE_URL=postgres://postgres:postgres@db:5432/myproject
```

---

## 5. GitHub Actions CI/CD Workflow

**.github/workflows/ci-cd.yml**

```yaml
name: Django CI/CD

on:
  push:
    branches:
      - main

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
        ports:
          - 5432:5432
        options: >-
          --health-cmd "pg_isready -U postgres"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: 3.12

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: Run Tests
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/myproject
        run: |
          python manage.py migrate
          python manage.py test

      - name: Build Docker Image
        run: |
          docker build -t s-nishad/django-app:latest .

      - name: Push Docker Image
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Push image
        run: |
          docker push s-nishad/django-app:latest

      - name: Deploy
        env:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_KEY }}
        run: |
          ssh -o StrictHostKeyChecking=no user@yourserver "cd /path/to/app && docker-compose pull && docker-compose up -d --build"
```

> Notes:
>
> * Add `DOCKER_USERNAME`, `DOCKER_PASSWORD`, and `SSH_KEY` in GitHub Secrets.
> * Server should have Docker and docker-compose installed.

---

## 6. Usage Commands

```bash
# Build and run locally
docker-compose up -d --build

# Stop containers
docker-compose down

# Run tests
docker-compose run web python manage.py test

# Collect static files
docker-compose run web python manage.py collectstatic --noinput
```

---

## 7. Tips for Hacker Style Deployment

* Use `.env` for all secrets, never commit credentials.
* Use Docker volumes for persistent DB storage.
* Use GitHub Actions to automate everything from tests → build → deploy.
* Always run migrations automatically after deploy.
* Keep Dockerfile lean, no dev tools in production image.
* Optional: add Redis and Celery containers for async tasks.

---

**Congrats!** You now have a fully containerized Django app with CI/CD ready to deploy anywhere.
