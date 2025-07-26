# WSL + Docker Setup on Windows

A step-by-step guide to set up **WSL2 (Windows Subsystem for Linux)** and **Docker Desktop** for development on Windows 10/11.

---

## Prerequisites

| Requirement              | Description                                                 |
|--------------------------|-------------------------------------------------------------|
| Windows Edition          | Windows 10/11 (64-bit) Home or Pro                          |
| Virtualization           | Must be enabled in BIOS                                     |
| Internet Connection      | Required to download WSL and Docker                         |

---

## Step 1: Enable WSL & Virtualization

1. Search **"Turn Windows features on or off"** and enable:
   - Windows Subsystem for Linux
   - Virtual Machine Platform

2. Restart your computer after enabling features.

---

## Step 2: Install WSL2 with Ubuntu

Open **PowerShell** as Administrator and run:

```powershell
wsl --install
```

This will:
- Install WSL
- Set WSL2 as default
- Install Ubuntu (or the default distro)

You may need to restart once it finishes.

To verify:
```powershell
wsl --list --verbose
```

---

## Step 3: Install Docker Desktop

1. Download Docker: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Run `Docker Desktop Installer.exe`
3. During setup:
   -  Enable **WSL2-based engine**
   -  Use **recommended settings**

Docker will install and set up integration with WSL automatically.

---

## Step 4: Restart and Launch Docker

1. Reboot your PC.
2. Launch **Docker Desktop**.
3. Wait until you see the 🟢 "Docker is running" message.

---

## Step 5: Verify Everything Works

Open **Ubuntu (WSL)** or PowerShell and run:

```bash
docker version
docker run hello-world
```

You should see a welcome message from Docker if it's working correctly.

---

## Optional: Enable WSL Integration in Docker

1. Open Docker Desktop → ⚙️ **Settings**
2. Go to **Resources → WSL Integration**
3. Enable integration for your desired distro (e.g., Ubuntu)

---

## Recommended Dev Directory

For best performance, store your code inside the Linux filesystem:

```bash
cd ~
mkdir dev
cd dev
```

Avoid using `C:\Users\...` paths for heavy development workloads in WSL.

---

## Uninstall (If Needed)

1. Uninstall **Docker Desktop** from Control Panel
2. Run:
   ```powershell
   wsl --unregister <distro-name>
   ```
3. Delete related folders: `~/.docker`, etc.

---

## Tips

- Use **Docker Compose** (preinstalled) to manage multi-container apps.
- WSL2 allows full Linux support without dual-booting.
- Use `wsl --update` occasionally to get latest WSL improvements.

---

Happy Docking! 🚀
