---
title: 'Page Frame Allocator'
date: '2022-11-30'
---

### Premise
One of the very first things I do when writing a kernel is setup a PFA, bar setting up uart or vga for debugging. There are a few ways to do this and I'll go over each briefly before covering my prefered method. This is essential as there needs to be system in order to allocate and free memory for both kernel and user processes. A `PFA` manages physical pages of `4096` bytes.

`GRUB` provides a memory map of memory which can be modified; I believe in C or C++, there are header files containing structs which specify how that data is organised however if you're developing in `rust`, I'd recommend using a package called `multiboot2` which I think was partly written by Phil Opperman, who has fantastic tutorials on kernel design.

### Bitmap
You can setup a large array for all of memory in which each bit represents a page and obviously (1 and 0 represent set or not). Whilst allocating/freeing a page is fast, actually finding a free page can take be slow. There a few methods to speed this up like using fancy bit twidling however who can really be bothered with that.

### Sized portion scheme
Areas of memory are split into smaller chunks and chunks which fit the size of a request and sent so less space is wasted.

### Stack
I use a stack of **free pages** along with a pointer to the first page of memory. This proves for a rather simple algorithm. When allocating a page, we attempt to pop the stack for a free page, and if this is not possible, we simply bump the pointer 1 page and return the address of the old pointer. When freeing a page, it gets pushed onto the stack of **free pages**, and since this data is uneeded, it can be overwritten freely before being allocated once more. This means it's both O(1) for allocating and freeing a page!


