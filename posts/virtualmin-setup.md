---
title: Taking Virtualmin for a Spin
description: 
canonical: https://kazvee.com/blog/virtualmin-setup/
date: 2026-06-14
updated:
tags:
- self-hosting
- learning
- deployment
---

I'd been getting recommendations for Webmin for a while, so I finally checked it out. Webmin is a web-based server administration panel, and Virtualmin builds on it with website and hosting management tools. Here's a recap of how I set up Virtualmin for lightweight web hosting.

## Prerequisites
- A freshly installed VPS (tested on Ubuntu 24.04 LTS and Debian 13)
- SSH access configured
- A domain pointed at your VPS IP (for SSL)

## 1. Install Virtualmin (Automated Script)

Following the [Virtualmin automated installation docs](https://www.virtualmin.com/docs/installation/automated/), I ran their automated install script:

```
sudo sh -c "$(curl -fsSL https://download.virtualmin.com/virtualmin-install)" -- --bundle LAMP
```

## 2. Log In and Configure

Navigate to your Virtualmin admin panel and run through the Post-Installation Wizard. I skipped it since I planned to disable several default services manually.

## 3. Re-Check Configuration

**Virtualmin → System Settings → Re-Check Configuration**

I got a warning about clamdscan and the clamd server not running. Since I don't need virus scanning, I disabled it along with other unused features.

## 4. Disable Unused Features

**Virtualmin → System Settings → Features and Plugins**

**Keep:**
- Administration user
- Home directory
- Apache website
- Apache SSL website
- Log file rotation
- Webmin login
- AWStats reporting
- Protected web directories

**Disable:**
- DNS for domain
- MariaDB database
- Mail for domain
- Spam filtering
- Virus filtering
- ProFTPD virtual FTP

Click Save.

![Features and Plugins](/static/img/posts/virtualmin-setup/features_and_plugins.png)

## 5. Create a Virtual Server

**Virtualmin → Create Virtual Server**

- Enter your domain name
- Uncheck Webmin login
- Click Create Server

Once created, click your domain name to access it.

## 6. Set Up SSL

### 6.1 For Your Domain

First, make sure your domain's DNS records are pointed at your VPS IP address. Then:

**Edit Virtual Server → Manage Virtual Server → Setup SSL Certificate → SSL Providers tab**

Enter your domain, then click Request Certificate. Once complete, your site will be accessible over HTTPS and you'll see a Website Enabled confirmation page.

### 6.2 For the Virtualmin Admin Panel

First, set your hostname:

**Webmin → Webmin Configuration → System hostname** - Update this to your domain and click Save.

Then request an SSL certificate for the admin panel:

**Webmin → Webmin Configuration → SSL Encryption → SSL Provider tab**

Enter your domain under **Hostnames for certificate**
Set Domain validation method to Selected Apache virtual host
Click Request Certificate

Once done, sign out and access your panel securely at: `https://yourdomain.com:10000/`.

## 7. Edit Your Site Files

Click File Manager and navigate to: `/home/yourdomain/public_html/index.html`. 

You can edit the file using the built-in editor or choose Edit as HTML to work with the source directly.

## 8. Create a Sub-Server

If you have additional domains or subdomains, use Create Sub-Server from the Virtualmin panel. Once created, it appears beneath your main domain and you can manage its files independently.

## 9. Change the Admin Panel Port (Optional)

The default Virtualmin port is 10000. To change it:

**Webmin → Webmin Configuration → Ports and Addresses**

Under **Listen on IPs and ports**, set the address dropdown to **Any address**, enter your preferred port number.

I also set the **Listen for broadcasts on UDP port** value to match my chosen port, though this is optional.

Click Save, then restart Webmin:
```
sudo systemctl restart webmin
sudo ufw allow <new-port>/tcp
sudo ufw delete allow 10000/tcp
```

Verify your firewall rules:
```
sudo ufw status
```

## 10. Remove Unused Services to Improve Performance
A default Virtualmin install includes a full hosting stack: 
- Web server
- Mail stack
- Security services. 

I was concerned about some memory pressure on a 2 GB VPS, so I removed unneeded items: 

### 10.1 Remove ClamAV

To investigate memory pressure, I checked system usage:
```
top
free -h
vmstat 1 5
ps aux --sort=-%mem | head -20
```

This showed ClamAV consuming nearly 1 GB of RAM via clamd. I didn't need virus scanning, so I removed it:
```
sudo systemctl stop clamav-daemon clamav-daemon.socket
sudo systemctl disable clamav-daemon.socket
sudo apt purge clamav clamav-daemon
sudo apt autoremove
```

After removal, the memory usage dropped significantly.


### 10.2 Remove the Mail Stack

Virtualmin's default install includes a full mail stack even when email isn't needed:

- Postfix (SMTP)
- Dovecot (IMAP/POP3)
- milter-greylist
- postgrey
- opendkim

Since I'm not hosting email, I removed all of it:

```
sudo systemctl stop dovecot postfix milter-greylist postgrey opendkim
sudo systemctl disable dovecot postfix milter-greylist postgrey opendkim
sudo apt purge postfix dovecot* milter-greylist postgrey opendkim
sudo apt autoremove
```

Verify no mail ports are exposed:
```
sudo ss -tulpn | grep -E ':25|:587|:110|:143|:993|:995'
```

No output means no external mail services are listening, which is what I want. 

Since I only use my VPS for web hosting, removing the unneeded/unused components reduced memory usage and simplified the overall setup.

## 11. Customize the Theme (Optional)

If you're wondering about the neon pink menu bar in the screenshot, I adjusted my theme:

**Webmin → Webmin Configuration → Webmin Themes**

Under the Configuration category, choose Navigation menu from the dropdown, then set your color palette. I went with:
- Color: Maroon
- Saturate filter: 2.5
- Hue-rotate filter: -10°

Click Save.

## Final Thoughts

I usually manage my VPS via the command line, and I'm not sure I want to move away from that completely. However, it was fun to explore Virtualmin and see what it can offer!