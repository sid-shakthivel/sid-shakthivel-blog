---
title: 'Auditd'
date: '2022-05-27'
---

## Auditd
Auditd is a tool which can be configured to audit whatever you want including syscalls, programs and all manner of suspicious behavour.

To begin install it `sudo apt install auditd && sudo systemctl enable auditd.service && sudo auditctl -e 1 && sudo gedit /etc/audit/auditd.conf`

### Rule Format
A sample rule would be `-w /etc/passwd -p wa -k usergroup_modification`
There are the number of flags which can be added
- `-w` which adds a watcher to specific file 
- `-p` which adds a filter based on permissions - `w` for writes, `r` for writing and `a` for attribute changes
- `-k` to input a filter key
- `-S` to supress log capturing

### Check Permissions
`chown` Changes the owner of a file/directory
`chgrp` Changes the group of a file/directory
`chmod` Changes the permission of a file/directory and 640 gives write and read for user, read for the group and no permissions for anyone else

```
sudo find /var/log -perm /137 -type f -exec chmod 640 '{}' \;  
sudo chown root /var/log 
sudo chgrp root /var/log 
sudo chmod 750 /var/log  

Configure /var/log/messages and /var/log/syslog: 

sudo chmod 640 /var/log/[folder] 
sudo chown root /var/log/[folder] 
sudo chgrp root /var/log/[folder]  
For the auditd folder itself: 
sudo chown root /var/log/audit 
sudo chown :root /var/log/audit 
sudo chmod 640 /var/log/audit  

For auditd subdirectories and files (repeat for each subfolder found, such as rules.d): 

sudo chown root /var/log/audit/* 
sudo chown :root /var/log/audit/* 
sudo chmod 640 /var/log/audit/*
```

Edit the `/etc/audit/auditd.conf`

### Directories/Files
Certain directories and files contain important details and it's important to find out whether these have been tampered with and by who!

```
-w /etc/shadow -p wa -k usergroup_modification  
-w /etc/gshadow -p wa -k usergroup_modification  
-w /etc/group -p wa -k usergroup_modification  
-w /etc/passwd -p wa -k usergroup_modification  
-w /var/log/tallylog -p wa -k logins  
-w /var/log/sudo.log -p wa -k priv_actions  
-w /var/log/faillog -p wa -k logins  
-w /var/log/lastlog -p wa -k logins  
-w /var/run/utmp -p wa -k logins  
-w /var/run/wtmp -p wa -k logins  
-w /var/log/btmp -p wa -k logins  
-w /sbin/fdisk -p x -k fdisk  
-w /etc/security/opasswd -p wa -k usergroup_modification  
-w /etc/localtime -p wa -k time-change  
-w /etc/issue -p wa -k system-locale  
-w /etc/issue.net -p wa -k system-locale  
-w /etc/hosts -p wa -k system-locale  
-w /etc/network -p wa -k system-locale  
-w /etc/networks -p wa -k system-locale  
-w /etc/apparmor/ -p wa -k MAC-policy  
-w /etc/apparmor.d/ -p wa -k MAC-policy  
-w /etc/ers -p wa -k scope  
-w /etc/ers.d -p wa -k scope  
-w /var/log/.log -p wa -k actions  
-w /sbin/insmod -p x -k modules  
-w /sbin/rmmod -p x -k modules  
-w /sbin/modprobe -p x -k modules  
-w /bin/kmod -p x -k modules  
-w /etc/sudoers.d/ -p wa -k identity  
-w /var/log/faillock -p wa -k logins
```

### Binaries

Binaries are programs and by audting their use we can find out if potentially dangerous programs have been used and when.
```
-a always,exit -F path=/bin/su -F perm=x -F auid>=1000 -F auid!=-1 -k privileged-priv_change  
-a always,exit -F path=/usr/bin/chfn -F perm=x -F auid>=1000 -F auid!=-1 -k privileged-chfn  
-a always,exit -F path=/usr/bin/chacl -F perm=x -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F path=/usr/bin/passwd -F perm=x -F auid>=1000 -F auid!=-1 -k privileged-passwd  
-a always,exit -F path=/sbin/unix_update -F perm=x -F auid>=1000 -F auid!=-1 -k privileged-unix-update  
-a always,exit -F path=/usr/bin/gpasswd -F perm=x -F auid>=1000 -F auid!=-1 -k privileged-gpasswd  
-a always,exit -F path=/usr/bin/chage -F perm=x -F auid>=1000 -F auid!=-1 -k privileged-chage  
-a always,exit -F path=/usr/sbin/usermod -F perm=x -F auid>=1000 -F auid!=-1 -k privileged-usermod  
-a always,exit -F path=/usr/bin/crontab -F perm=x -F auid>=1000 -F auid!=-1 -k privileged-crontab  
-a always,exit -F path=/usr/sbin/pam_timestamp_check -F perm=x -F auid>=1000 -F auid!=-1 -k privileged-pam_timestamp_check  
-a always,exit -F path=/bin/umount -F perm=x -F auid>=1000 -F auid!=-1 -k privileged-umount  
-a always,exit -F path=/bin/mount -F perm=x -F auid>=1000 -F auid!=-1 -k privileged-mount  
-a always,exit -F path=/usr/lib/openssh/ssh-keysign -F perm=x -F auid>=1000 -F auid!=-1 -k privileged-ssh  
-a always,exit -F path=/usr/bin/sudo -F perm=x -F auid>=1000 -F auid!=4294967295 -k priv_cmd  
-a always,exit -F path=/usr/bin/chcon -F perm=x -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F path=/usr/bin/newgrp -F perm=x -F auid>=1000 -F auid!=-1 -k priv_cmd  
-a always,exit -F path=/usr/bin/chsh -F perm=x -F auid>=1000 -F auid!=-1 -k priv_cmd  
-a always,exit -F path=/usr/bin/sudoedit -F perm=x -F auid>=1000 -F auid!=-1 -k priv_cmd  
-a always,exit -F path=/usr/bin/setfacl -F perm=x -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F path=/sbin/apparmor_parser -F perm=x -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F path=/usr/bin/ssh-agent -F perm=x -F auid>=1000 -F auid!=-1 -k privileged-ssh  
-a always,exit -F path=/usr/sbin/unix_chkpwd -F perm=x -F auid>=1000 -F auid!=unset -k privileged-unix-update  
-a always,exit -F path=/usr/sbin/setsebool -F perm=x -F auid>=1000 -F auid!=unset -k privileged-unix-update  
-a always,exit -F path=/usr/sbin/userhelper -F perm=x -F auid>=1000 -F auid!=unset -k privileged-unix-update  
-a always,exit -F path=/usr/sbin/setfiles -F perm=x -F auid>=1000 -F auid!=unset -k privileged-unix-update
```

### Syscalls
Syscalls are calls programs make to the kernel to perform high privilege tasks so we may want to know when a process makes the syscall to create a new file.

```
-a always,exit -F arch=b32 -S init_module -F auid>=1000 -F auid!=-1 -k module_chng  
-a always,exit -F arch=b64 -S init_module -F auid>=1000 -F auid!=-1 -k module_chng  
-a always,exit -F arch=b32 -S finit_module -F auid>=1000 -F auid!=-1 -k module_chng  
-a always,exit -F arch=b64 -S finit_module -F auid>=1000 -F auid!=-1 -k module_chng  
-a always,exit -F arch=b32 -S setxattr -F auid>=1000 -F auid!=-1 -k perm_mod  
-a always,exit -F arch=b32 -S setxattr -F auid=0 -k perm_mod  
-a always,exit -F arch=b64 -S setxattr -F auid>=1000 -F auid!=-1 -k perm_mod  
-a always,exit -F arch=b64 -S setxattr -F auid=0 -k perm_mod  
-a always,exit -F arch=b32 -S removexattr -F auid>=1000 -F auid!=-1 -k perm_mod  
-a always,exit -F arch=b32 -S removexattr -F auid=0 -k perm_mod  
-a always,exit -F arch=b64 -S removexattr -F auid>=1000 -F auid!=-1 -k perm_mod  
-a always,exit -F arch=b64 -S removexattr -F auid=0 -k perm_mod  
-a always,exit -F arch=b32 -S fsetxattr -F auid>=1000 -F auid!=-1 -k perm_mod  
-a always,exit -F arch=b32 -S fsetxattr -F auid=0 -k perm_mod  
-a always,exit -F arch=b64 -S fsetxattr -F auid>=1000 -F auid!=-1 -k perm_mod  
-a always,exit -F arch=b64 -S fsetxattr -F auid=0 -k perm_mod  
-a always,exit -F arch=b32 -S fremovexattr -F auid>=1000 -F auid!=-1 -k perm_mod  
-a always,exit -F arch=b32 -S fremovexattr -F auid=0 -k perm_mod  
-a always,exit -F arch=b64 -S fremovexattr -F auid>=1000 -F auid!=-1 -k perm_mod  
-a always,exit -F arch=b64 -S fremovexattr -F auid=0 -k perm_mod  
-a always,exit -F arch=b32 -S lremovexattr -F auid>=1000 -F auid!=-1 -k perm_mod  
-a always,exit -F arch=b32 -S lremovexattr -F auid=0 -k perm_mod  
-a always,exit -F arch=b64 -S lremovexattr -F auid>=1000 -F auid!=-1 -k perm_mod  
-a always,exit -F arch=b64 -S lremovexattr -F auid=0 -k perm_mod  
-a always,exit -F arch=b32 -S lsetxattr -F auid>=1000 -F auid!=-1 -k perm_mod  
-a always,exit -F arch=b32 -S lsetxattr -F auid=0 -k perm_mod  
-a always,exit -F arch=b64 -S lsetxattr -F auid>=1000 -F auid!=-1 -k perm_mod  
-a always,exit -F arch=b64 -S lsetxattr -F auid=0 -k perm_mod  
-a always,exit -F arch=b32 -S fchmodat -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F arch=b64 -S fchmodat -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F arch=b32 -S open -F exit=-EPERM -F auid>=1000 -F auid!=-1 -k perm_access  
-a always,exit -F arch=b32 -S open -F exit=-EACCES -F auid>=1000 -F auid!=-1 -k perm_access  
-a always,exit -F arch=b64 -S open -F exit=-EPERM -F auid>=1000 -F auid!=-1 -k perm_access  
-a always,exit -F arch=b64 -S open -F exit=-EACCES -F auid>=1000 -F auid!=-1 -k perm_access  
-a exit,always -S open -F loginuid=1001  
-a always,exit -F arch=b32 -S chmod -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F arch=b64 -S chmod -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F arch=b32 -S fchmod -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F arch=b64 -S fchmod -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F arch=b32 -S fchownat -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F arch=b64 -S fchownat -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F arch=b32 -S lchown -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F arch=b64 -S lchown -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F arch=b32 -S chown -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F arch=b64 -S chown -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F arch=b32 -S fchown -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F arch=b64 -S fchown -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F arch=b32 -S open_by_handle_at -F exit=-EPERM -F auid>=1000 -F auid!=-1 -k perm_access  
-a always,exit -F arch=b32 -S open_by_handle_at -F exit=-EACCES -F auid>=1000 -F auid!=-1 -k perm_access  
-a always,exit -F arch=b64 -S open_by_handle_at -F exit=-EPERM -F auid>=1000 -F auid!=-1 -k perm_access  
-a always,exit -F arch=b64 -S open_by_handle_at -F exit=-EACCES -F auid>=1000 -F auid!=-1 -k perm_access  
-a always,exit -F arch=b32 -S openat -F exit=-EPERM -F auid>=1000 -F auid!=-1 -k perm_access  
-a always,exit -F arch=b32 -S openat -F exit=-EACCES -F auid>=1000 -F auid!=-1 -k perm_access  
-a always,exit -F arch=b64 -S openat -F exit=-EPERM -F auid>=1000 -F auid!=-1 -k perm_access  
-a always,exit -F arch=b64 -S openat -F exit=-EACCES -F auid>=1000 -F auid!=-1 -k perm_access  
-a always,exit -F arch=b64 -S fsetxattr -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F arch=b32 -S fsetxattr -F auid>=1000 -F auid!=-1 -k perm_chng  
-a always,exit -F arch=b32 -S adjtimex -S settimeofday -S stime -k time-change  
-a always,exit -F arch=b64 -S adjtimex -S settimeofday -S stime -k time-change  
-a always,exit -F arch=b32 -S clock_settime -k time-change  
-a always,exit -F arch=b64 -S clock_settime -k time-change  
-a always,exit -F arch=b32 -S sethostname -S setdomainname -k system-locale  
-a always,exit -F arch=b64 -S sethostname -S setdomainname -k system-locale  
-a always,exit -F arch=b32 -S creat -S truncate -S ftruncate -F exit=-EACCES -F auid>=1000 -F auid!=4294967295 -k access  
-a always,exit -F arch=b64 -S creat -S truncate -S ftruncate -F exit=-EACCES -F auid>=1000 -F auid!=4294967295 -k access  
-a always,exit -F arch=b32 -S creat -S truncate -S ftruncate -F exit=-EPERM -F auid>=1000 -F auid!=4294967295 -k access  
-a always,exit -F arch=b64 -S creat -S truncate -S ftruncate -F exit=-EPERM -F auid>=1000 -F auid!=4294967295 -k access  
-a always,exit -F arch=b64 -S unlink -S unlinkat -S rename -S renameat -S rmdir -F auid>=1000 -F auid!=4294967295 -k delete  
-a always,exit -F arch=b32 -S unlink -S unlinkat -S rename -S renameat -S rmdir -F auid>=1000 -F auid!=4294967295 -k delete  
-a always,exit -F arch=b64 -S delete_module -F key=modules  
-a always,exit -F arch=b32 -S delete_module -F key=modules  
-a always,exit -F arch=b64 -S execve -C uid!=euid -F euid=0 -F key=execpriv  
-a always,exit -F arch=b64 -S execve -C gid!=egid -F egid=0 -F key=execpriv  
-a always,exit -F arch=b32 -S execve -C uid!=euid -F euid=0 -F key=execpriv  
-a always,exit -F arch=b32 -S execve -C gid!=egid -F egid=0 -F key=execpriv  
-a always,exit -F path=/usr/sbin/postqueue -F perm=x -F auid>=1000 -F auid!=unset -k privileged-unix-update  
-a always,exit -F path=/usr/sbin/semanage -F perm=x -F auid>=1000 -F auid!=unset -k privileged-unix-update  
-a always,exit -F path=/usr/sbin/postdrop -F perm=x -F auid>=1000 -F auid!=unset -k privileged-unix-update
```

### Other

You'll want to configure a few other settings to ensure maximum security and they include:

Auditing local events by `local_events = yes` 
Increase buffer size by `-b 1024`
Shut down when logs are full `disk_full_action = HALT`
Force audit logs to be owned by root `log_group = root`
Prevent logon UID's from unauthorised change `-loginuid-immutable`