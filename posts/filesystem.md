---
title: 'Filesystem'
date: '2021-06-23'
---

Another thing a kernel needs is a file system. In this article you'll learn about filesystems, grub modules, and a little about TAR.

A file system is simply a way of organizing files or data into logical sections. An initial ramdisk is a filesystem loaded into memory when the kernel boots. Grub has a feature called grub modules - grub basically loads your file and places it in memory for you. The simplest file system is to use a TAR ball. TAR is short for tape archive and is used to archive files. Note that archiving files is just to put a bunch of files/folders into one large file. TAR is often used with gzip as it compresses the TAR ball. Gzip is a lossless compression method - it removes redundancies in data to reduce its size. 

Once you've loaded your TAR ball into memory, you'll need to parse it. As mentioned before, TAR concatenates files into one big file - each file gets a header which is padded up to 512 bytes. A TAR Header will look like this:
- char szFilename[100]
- char szFileMode[8]
- char szUID[8]
- char szGID[8]
- char szSize[12];
- char szLastMod[12];
- char szChecksum[8];
- char szLinkIndicator[1];

To parse the TAR file, loop over it stopping where the header's filename is the null terminator. To get the next header do current header's address + 512 + the file size, rounded up to the next 512-byte boundary. And that's it to get a simple file system - I stored these in an array.

Wait we're not finished. A filesystem is essentially a graph composed of different nodes. For example it could have many paths like: INITRD -> FOLDER1 -> TEST.TXT, INITRD -> FOLDER1 -> WORLD.TXT, INITRD -> FOLDER2 -> HELLO.TXT. Each node should have an array of pointers to stuff in itself. Eg FOLDER1 would have pointers to TEXT.TXT, and WORLD.TXT - note that a normal file like TEST.TXT won't have anything in it's array of pointers. The name of a node (current) is it's complete path (INITRD/FOLDER1/TEST.TXT) - find the name of the node (previous) before it and push the pointer of the current in previous' array of stuff in it. This will establish a connection between the two nodes. For example current could be TEST.TXT, and previous could be FOLDER1 - we want a pointer to TEST.TXT in FOLDER1's array of pointers.

Check out my implementation of a simple filesystem here: https://github.com/sid-shakthivel/SidOS/blob/main/kernel/include/filesystem.h. Hope you find this article useful!


