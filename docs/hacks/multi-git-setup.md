
# Multi-Git Account Setup (Personal + Work)

**Scenario**: You have one machine. One brain. Two lives: `Personal` and `Work`. Git doesn’t know how to separate them. Let’s fix that.

---

## Tools of the Trade

- 🔹 A mind that knows the terminal  
- 🔹 One laptop, two identities  
- 🔹 GitHub (or GitLab/Bitbucket — doesn't matter)

---

## Objective

Manage both **personal** and **work** Git accounts *seamlessly* on the same machine without cross-contamination.

---

## Step 0: Check Your Setup

```bash
git --version
ssh -V
```

---

## Step 1: Create Your Secret Keys (SSH)

```bash
# Personal identity
ssh-keygen -t ed25519 -C "your_personal_email@example.com" -f ~/.ssh/id_ed25519_personal

# Work identity
ssh-keygen -t ed25519 -C "your_work_email@company.com" -f ~/.ssh/id_ed25519_work
```

> Hit `Enter` through prompts unless you want a passphrase.

---

## Step 2: Add Keys to SSH Agent

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519_personal
ssh-add ~/.ssh/id_ed25519_work
```

---

## Step 3: Send Public Keys to GitHub

Paste each one into GitHub settings → SSH and GPG keys.

```bash
cat ~/.ssh/id_ed25519_personal.pub
cat ~/.ssh/id_ed25519_work.pub
```

---

## Step 4: Configure the Brain (aka `~/.ssh/config`)

```bash
nano ~/.ssh/config
```

Paste this:

```ssh
# Personal GitHub
Host github.com-personal
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_personal

# Work GitHub
Host github.com-work
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_work
```

> Now SSH knows which identity to use based on the alias.

---

## Step 5: Clone Like a Shadow

```bash
# Personal repo
git clone git@github.com-personal:yourusername/personal-repo.git

# Work repo
git clone git@github.com-work:yourcompany/work-repo.git
```

---

## Step 6: Set Your Git Identity Per Project

```bash
# In personal repo
git config user.name "Your Personal Name"
git config user.email "your_personal_email@example.com"

# In work repo
git config user.name "Your Work Name"
git config user.email "your_work_email@company.com"
```

> Each repo remembers its own identity. Like spies with different passports.

---

## Optional: Quick Identity Switch Script

Create `git-identity.sh`:

```bash
#!/bin/bash
if [ "$1" == "personal" ]; then
  git config user.name "Your Personal Name"
  git config user.email "your_personal_email@example.com"
elif [ "$1" == "work" ]; then
  git config user.name "Your Work Name"
  git config user.email "your_work_email@company.com"
else
  echo "Usage: ./git-identity.sh [personal|work]"
fi
```

Make it executable:

```bash
chmod +x git-identity.sh
```

---

## 🔚 Mission Complete

You've just:

* Created two SSH identities
* Configured Git to handle both
* Separated personal from professional, clean and sharp

Welcome to the dual-life, Git Ninja 🥷

---

## Bonus Tip: Check Identity in a Repo

```bash
git config user.name
git config user.email
```

---

**Now go forth and code — both lives intact.**
