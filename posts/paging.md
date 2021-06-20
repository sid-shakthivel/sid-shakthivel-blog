---
title: 'Paging'
date: '2021-06-19'
---

This blog has been rather dormant for quite a few months now!
This year, I've been extensively working on a kernel and have finished implementing paging which has been quite a struggle.

Paging itself is simply a mechanism for a process to have see a full virtual memory address space without needing that much physical memory. We split this virtual memory into blocks which are called pages - in most OS' they are 4Kib. Paging also allows a process to only see and modify data in their own address space providing process isolation - you can also define privilege - there isn't any chance of effecting any other process' memory! Paging means that to a process all the memory is contiguous - in reality this is all mapped to bits of physical memory. There are 2 data structures you should know about - a page directory and 1024 page tables (all just arrays). Each process gets it's own page directory, and set of page tables (we'll go over this in more detail later). To switch process' which we will get onto next we simply switch what page directory we use.

First things first - we need to know what parts of memory we can use. I use a identifier in my linker to tell me when my kernel ends, and for the end of memory I simply load the GRUB memory map and parse it - more information can be found - https://wiki.osdev.org/Detecting_Memory_(x86)!

Next to implement paging we need 2 things a PMM and a VMM. A PMM (Physical Memory Manager or Page Frame Allocator) divides up memory into these pages, and keeps track of which pages are in use. There are many ways to implement this - personally I went for a linked list of free pages as they are far superior to something like a bitmap. It's O(1) for free'ing and O(1) for pushing compared to a slow bitmap. When allocating a page, we simply check the linked list to see if there are any free pages - is so then we pop it off. There is also a pointer to the current page - if the free list is empty we return that address and move the pointer to the next page. When free'ing a page, all we need to do is make a struct (for the linked list) and store it in that free page. In other words we add the page onto the linked list.

Personally, I've identity mapped my kernel - this is to say all physical addresses are equal to virtual addresses. This means that 0xb10 virtual address is the same as the physical address 0xb10. To accomplish this I've used 2 structures, a page directory and 1024 page tables. The page directory contains entries to page tables. Each page table entry points to a physical address. Each Page Directory entry and Page Table entry must be page aligned. To fill the page directory, we loop over the array and enter the address of our page tables (simply just a pointer). To get the correct index of the page table array, I divide the current address by 4096 and fill that in with the current address. After we store page tables and page tables (and of course our kernel code), we can use the rest of memory to allocate pages using our page frame allocator (it all works since it's all identity mapped)!

Our memory looks a bit like this:
| Kernel | Page Directory | | Page Tables | Free Memory |

To enable paging, we load the address of the page directory to the cr3 register and set the paging and protection bits of cr0.

Well that is paging! For more information don't hesitate to email me or visit https://wiki.osdev.org/Paging or http://www.jamesmolloy.co.uk/tutorial_html/6.-Paging.html.

Also make sure to check out my kernel at https://github.com/sid-shakthivel/SidOS.
