---
title: 'Kernel Dev 3'
date: '2022-05-29'
---

### Real Mode
When a computer is initially booted it enters real mode. This is a limited mode in which everything is 16 bits (16 bit addressing mode) and therefore there is only 1MB of RAM available to use. Multitasking is not available and programs have access to any part of memory. 

### Protected Mode
This is the main mode of an x86 system where everything is 32 bit and thus there is a maximum of 4GB of space. Multitasking can occur as well. 

### Long Mode
This is a mode in which 64 bit instructions and registers can be utilised. Paging must be setup to use it. It implements 48 bit addressing which gives you an address space of 256 terabytes.

### Paging
This is a memory management system which allows a process to utilise a full address space without physically having that memory. This allows each process to have it's own memory without affecting another. The address a process uses is called a linear address and actual address is physical address.

Pages are 4096 bytes and there are 3 levels which are 
- Page Map Level Table
- Page Directory Pointer Table
- Page Directory Table
- Page Table

Each entry is 8 bytes and each table contains 512 entries.
To get a real physical address, the bits are used as an index for each level and the last 12 are used as a page offset.

Identity paging is when each physical address equals the same virtual address.

### Segmentation + GDT
A segment is a chunk of memory. The GDT is a table of entries which tells the CPU about these segments. Each segment has properties incuding size, base address, and access restructions. 

### Basic Assembly
Data section is used to store initialized data or constants which never change
BSS section is used to declare normal variables
Text section is where code is written