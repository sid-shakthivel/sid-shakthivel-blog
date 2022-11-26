---
title: 'Kernel Dev 6'
date: '2022-06-02'
---

### Syscalls

System calls are used to call a kernel service from userland as certain actions must be done with privilege. They can be used for process or file communication along with for interprocess communication and are invoked with software interrupts. My kernel like others is inspired by the POSIX standards with some custom syscalls too because my window manager communicates with the OS via them. 
