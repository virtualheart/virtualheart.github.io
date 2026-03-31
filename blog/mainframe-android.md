---
title: Running a Mainframe Emulator on an Old Android Phone (Termux Lab)
date: 2026-03-31
tags: [Mainframe, Hercules, Termux, Android, COBOL, Homelab]
---

# 💻 Running a Mainframe Emulator on an Old Android Phone

For a long time I wanted a small, always-available environment to practice mainframe concepts.  
Cloud labs are convenient but cost money. Keeping a laptop running 24/7 consumes power and is not ideal for long experiments.

So I tried something different:

**Can an old Android phone become a tiny mainframe lab?**

This post documents the full experiment, what worked, what didn’t, and how you can replicate it.

---

# Why use a phone as a mainframe lab?

My goals were simple:

- ❌ Avoid cloud subscription costs  
- ❌ Avoid running a laptop continuously  
- ✅ Build a low-power always-on learning environment  
- ✅ Learn more deeply by building the setup from scratch  

An unused Android device turns out to be perfect:
- Low electricity usage  
- Always available  
- Surprisingly capable with Termux  

> This is **not production ready**.  
> This is a **learning and experimentation lab**.

---

# Overview of the setup

The final architecture looks like this:

Android phone  
→ Termux (Linux userland)  
→ Debian (proot container)  
→ Hercules mainframe emulator  
→ MVS 3.8J (TK5 distribution)  
→ Access via TN3270 / SSH

---

# Step 1 - Install Termux and base tools

Open Termux and run:

```bash
pkg update
pkg upgrade
pkg install suite3270
pkg install proot-distro
```

Why these tools?
- suite3270 → Terminal 3270 emulator client
- proot-distro → Allows running a Linux distro inside Android

---

# Step 2 - Install a Linux distro inside Termux

Check available distros:
```bash
proot-distro list
```

Install Debian:

```bash
proot-distro install debian
proot-distro login debian
apt update
```

Now you are inside a Debian environment running on Android.

# Step 3 - Install Hercules mainframe emulator

Inside the Debian shell:

```bash
apt install hercules
```

This installs a packaged build of Hercules.

###### Optional (advanced)

> You can build SDL Hyperion Hercules manually for newer features and better performance.
> I plan to publish a separate guide for compiling it inside Termux.

# Step 4 - Obtain a mainframe OS image

You need a system to run on Hercules.

Two common options:

**TK5 (Recommended for learning)**
- MVS 3.8J distribution
- Community supported
- Great for learning COBOL, JCL, TSO, ISPF

**ADCD**
- Official distribution
- Requires an IBM license

_For this lab, I used **[TK5](https://www.prince-webdesign.nl/tk5)** and **[ADCD V2R10](https://archive.org/details/OS390_V2R10_ADCD)**._
>
>  **Disclaimer:**  
> - `ADCD is an IBM-licensed distribution and requires proper authorization.` 
> - `This setup is intended strictly for **educational and testing purposes**.`
> - `No ownership of proprietary software is claimed.`

# Step 5 - Start Hercules

If using a custom config:

```bash
hercules -f hercules.cnf
```

But TK5 includes a ready-to-run script:

```bash
chmod -R +x *
./mvs
```

Default login:

```bash
User: HERC01
Password: CUL8TR
```

If you encounter library errors:

```bash
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:mvs-tk5/hercules/linux/aarch64/lib/
```

# Step 6 - Understanding IPL (booting the mainframe)

In manual setups you may need to IPL the system:

```bash
ipl <address>
```
> IPL = Initial Program Load 

This is the mainframe equivalent of booting an operating system.

# Optional - Enable SSH access (Highly recommended)

If the phone will run continuously, remote access makes life easier.

Run this in Termux (outside Debian):

```bash
pkg install openssh
passwd
sshd
whoami
```

Find your phone’s IP:
```bash
ip a
```

Connect from your laptop:

```bash
ssh username@mobile-ip -p 8022
```

Now your phone becomes a tiny remote lab you can access anytime.

# Real-world benefits of this setup

During this experiment I learned far more than expected:

- Debugging shared library issues
- Understanding emulator configuration
- Learning how Hercules devices and architecture work
- Practicing real IPL and system startup flows

Each problem forced deeper understanding of how mainframe systems fit together.

This type of hands-on work is difficult to get from tutorials alone.

# Limitations

Let’s be realistic.

- Performance is limited
- Not suitable for heavy workloads
- Requires patience during setup

But for learning and practice, it works surprisingly well.

# Final thoughts

Turning an old phone into a mainframe lab felt like a fun experiment at first.
But it turned into a very practical learning environment.

From connecting via TN3270 to booting MVS — all from a device that would otherwise sit unused.

Sometimes the best labs are built from curiosity.

If you try this setup or improve it, I would love to hear about your experience.

---

# 🧪 Proof of Concept (POC)

Below are real screenshots from the setup running on an Android device.

![image 1](images/mainframe-android/1.png)
![image 2](images/mainframe-android/2.png)
![image 3](images/mainframe-android/3.png)
![image 3](images/mainframe-android/4.png)
![image 3](images/mainframe-android/5.png)
![image 3](images/mainframe-android/6.png)
![image 3](images/mainframe-android/7.png)

> This confirms that an Android phone can successfully act as a lightweight mainframe lab environment.

---
