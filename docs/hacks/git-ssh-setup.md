
# 💻 Git SSH Setup – Like a Pro

> Securely push code without typing your password every time.
> This guide works for GitHub, GitLab, Bitbucket, etc.

---

## 🤦‍♂️ Step 0: Prerequisites

Make sure you have:

- **Git installed**
    - **Windows:** [Download Git for Windows](https://git-scm.com/download/win) and follow the installer.
    - **Linux:** Install via your package manager, e.g.:
        ```bash
        sudo apt update && sudo apt install git
        ```
- **A terminal**
    - **Windows:** PowerShell, Git Bash (recommended)
    - **Linux:** Any terminal emulator

---

## 🧠 Step 1: Check for Existing SSH Keys

```bash
ls -al ~/.ssh
```

> Look for files like `id_rsa.pub` or `id_ed25519.pub`

---

## 🛠 Step 2: Generate a New SSH Key

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

> Hit `Enter` to accept the default file location  
> Optionally set a passphrase for security

If your system doesn't support `ed25519`, fallback to:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

---

## 🧩 Step 3: Start the SSH Agent

```bash
eval "$(ssh-agent -s)"
```

> This starts a background service to manage your SSH keys.

---

## 🔑 Step 4: Add the SSH Key to the Agent

```bash
ssh-add ~/.ssh/id_ed25519
```

> Use `id_rsa` if you created RSA key instead.

---

## 📋 Step 5: Copy Your Public Key

```bash
cat ~/.ssh/id_ed25519.pub
```

> Copy that entire line. Yes, the **whole** thing.

---

## 🌐 Step 6: Add SSH Key to GitHub/GitLab

- **GitHub** → [Settings → SSH and GPG keys](https://github.com/settings/keys)
- **GitLab** → [Profile → Preferences → SSH Keys](https://gitlab.com/-/profile/keys)

> 🔐 Paste your copied key → Name it → Save

---

## ⚡ Step 7: Test the SSH Connection

```bash
ssh -T git@github.com
```

Expected Output:
```bash
Hi username! You've successfully authenticated.
```

---

## 🛡️ Step 7.5: Set Your Git Username and Email (Global)

Before pushing code, configure your identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
```

> This ensures your commits are linked to your GitHub/GitLab account.

---

## 🧬 Step 8: Use SSH Instead of HTTPS

Clone using SSH:
```bash
git clone git@github.com:your-username/your-repo.git
```

Switch existing repo from HTTPS to SSH:
```bash
git remote set-url origin git@github.com:your-username/your-repo.git
```

---

## 🧠 Bonus: Check SSH Remote

```bash
git remote -v
```

---

## 🎉 Boom! You're now a Git SSH Hacker!
No more typing username/password. Clean. Fast. Secure. Hacker-style.

---
