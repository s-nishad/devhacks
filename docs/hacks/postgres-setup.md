
# 🐘 PostgreSQL Setup & Database Creation – Guide

> Get PostgreSQL up and running, create a user, database, and get hacking!

---

## 🛠 Step 1: Install PostgreSQL

### 🔵 Windows:
- Download the installer: [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
- Use the Stack Builder to install additional tools like pgAdmin
- Remember your **password** during install

### 🔴 Linux (Debian/Ubuntu):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### 🟣 macOS (with Homebrew):
```bash
brew install postgresql
brew services start postgresql
```

---

## 🤦‍♂️ Step 2: Check PostgreSQL Status (Linux/macOS)

```bash
sudo systemctl status postgresql
```

---

## 👤 Step 3: Switch to the Default 'postgres' User

```bash
sudo -i -u postgres
```

Now access the PostgreSQL shell:

```bash
psql
```

You’re in!

---

## 🧙‍♂️ Step 4: Create a New Role (User)

Inside the `psql` prompt:

```sql
CREATE ROLE myuser WITH LOGIN PASSWORD 'mypassword';
```

Give it permission to create DBs:

```sql
ALTER ROLE myuser CREATEDB;
```

Exit:
```sql
\q
```

---

## 🛢 Step 5: Create a Database for the User

Switch to your OS user shell and run:

```bash
createdb -U myuser mydatabase
```

Or, inside `psql`:

```sql
CREATE DATABASE mydatabase OWNER myuser;
```

---

## 🔗 Step 6: Connect to the DB

```bash
psql -U myuser -d mydatabase
```

> It may ask for your password. Type `mypassword`.

---

## 🧠 Bonus Commands

- List all users:
```sql
\du
```

- List all databases:
```sql
\l
```

- Connect to a DB:
```sql
\c mydatabase
```

- Show tables:
```sql
\dt
```

- Exit:
```sql
\q
```

---

## 🧼 Cleanup (Optional)

- Drop database:
```sql
DROP DATABASE mydatabase;
```

- Drop user:
```sql
DROP ROLE myuser;
```

---

## 🚀 You're now PostgreSQL-enabled!

Secure. Reliable. SQL warrior mode: activated. 💻⚔️

---
