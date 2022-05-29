---
title: 'Kernel Dev 1'
date: '2022-05-28'
---

### What is a kernel?
The kernel is the main core of an operating system which manages certain tasks in including memory allocation, paging, process management. It interacts with interrupts from hardware and also from software through syscalls.

### What is a cross compiler?
A piece of software which translates source code made on one machine into machine code for another architecture. The most common platform for kernel development is **i686** and is 32 bit.

### What is a bootloader?
When a computer is turned on an initial piece of software is triggered and ran which is called the bios or uefi. This executes a bootloader which then runs an operating system. Common bootloaders include grub and they load in the OS into memory. 

### How does the bootloader recognise an OS?
A program can be recognised as a kernel by a bootloader by initialising some special variables in a header. From here it knows exactly how to load the kernel.

### What is the stack?

A stack is a reigon of memory in which variables are stored. A good analogy for a stack is a pile of books. One can add more and more books onto this pile, however to retrieve any book you must also remove any book on top of it. This is where the idea of pushing and popping registers comes from. In x86, the stack grows downwards thus if it starts at 0xAB5, the next location will be 0xAB6.

### What is a linker and linking?
A linker combines object files into a single executable file. Linking is when we collect various bits of code from multiple sources into a single file which can then be executed. Linking is how a simple `hello world` program in C can use libraries like `stdio` to utilise the `printf` function as it combines bits of code together. We need a linker to link our assembly code to our high level language as I atleast don't want to write my kernel in pure assembly.

### What are static and dynamic linking?
Static linking happens at compile time and combines code with a library whilst dynamic linking happens at run time.