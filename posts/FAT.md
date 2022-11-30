---
title: 'FAT'
date: '2021-11-30'
---

### File System

A file system is logical way to store, read, and write data on persistent storage. They act as layers of abtraction into how data are structured and organised (usually into groups). All filesystems support CRUD operations, along with other features like caching (to speed up access) and permissions to only allow permitted users to view data. 

### What is FAT?

Firstly, FAT stands for `File Allocation Table` and was primarily used in windows systems. It uses 2 tables (one acting as a backup) which act essentially store `cluster numbers` to actual data like a contents page within a book. The clusters can be scattered throughout the filesystem but with FAT, you follow the chain of clusters. There are a whole host of `FAT` file systems starting with `FAT-12` which is rumoured to be written by Bill Gates and importantly as memory was scarse then, uses 12 bits to address clusters. If you are planning on writing a `FAT driver`, I would reccomend `FAT-16` which uses 2 bytes (16 bits) to address a cluster as I found I could make a rather small disk file of 10MB compared to something like `FAT32` which requires more. 

### For a kernel?

If you want an initial ramdisk or `initrd`, follow these steps:
- `dd id=/dev/zero of=fs.img count=10 bs=1M`
- `fdisk fs.img` in which press:
- `n`
- `p`, `enter`, `enter`
- `t`, `c`
- `w` 
- `mkfs.vfat fs.img`\
You'll want to copy this file to your `grub modules` folder and specify in `grub.cnf`
There are helpful tools like `mcopy` which allow you to copy files from your ssd to the fat file system. Likewise, `fatcat` can list all files the file has been copied over correctly which can help when debugging.

### Parsing your FAT file system
The disk is organised into three main sections: boot record, FAT, data. The boot is placed first and a struct encapsulating it's data looks like this:
```
#[derive(Debug, Copy, Clone)]
#[repr(C, packed)]
struct BiosParameterBlock {
	jmp: [u8; 3],
	oem: [u8; 8],
	bytes_per_sector: u16,
	sectors_per_cluster: u8,
	reserved_sector_count: u16,
	table_count: u8,
	root_entry_count: u16,
	sector_count_16: u16,
	media_type: u8,
	table_size_16: u16, // Number of sectors per FAT
	sectors_per_track: u16, // Number of sectors per track
	head_count: u16,
	hidden_sector_count: u32,
	sector_count_32: u32,
}
```
This is placed at the very start of memory and thus can be accessed like this:
```
let bpb = unsafe { &*(start_address as *const BiosParameterBlock) };
```
There may be some confusion between clusters and sectors. A cluster is a unit of storage which is physically set by the filesystem whilst a sector is a unit of storage on a drive level. The very first step is just to locate the first fat table, the root directory, and first data sector. There are formulas for each of these here: https://wiki.osdev.org/FAT#Reading_the_Boot_Sector or you can checkout my code at https://github.com/sid-shakthivel/os64/blob/main/kernel/src/fs.rs. The root directory holds `file entries` which holds useful data including name and cluster_low. Note that for attribute, `0x10` is a directory, `0x20` is a file and `0x0F` is a long directory entry (I'll go into these later).

```
#[derive(Debug, Copy, Clone)]
#[repr(C, packed)]
struct StandardDirectoryEntry {
	filename: [u8; 8],
	ext: [u8; 3],
	attributes: u8, // Could be LFN, Directory, Archive
	unused: [u8; 8], // Reserved for windows NT
	cluster_high: u16, // Always 0
	time: u16,
	date: u16,
	cluster_low: u16,
	file_size: u32,
}
```
To read a file we can inspect the `cluster_low` field. The `cluster_low` is the first cluster address and is linear however sectors (which actually hold data) use segment addresses, so it needs to be converted. From here, if there are other clusters linked, we can follow the chain by checking the `FAT` table, if it's in the range `0xFFF8..=0xFFFF` that means there is no more to be read. You can copy this data into a temporary buffer and present that to the user if necessary. 

### Long file names

You'll notice that the `filename` field only stores 8 characters which means you can't have names like `theverybigfile.txt`, this is where `LongFileEntries` come into play (there can be a multitude of these but they must be placed before the standard entry) and they act as more storage to hold more data.

### What's a VFS

`VFS` stands for virtual file system and is yet another abstraction on top of a file system driver which allows any program to work with the filesystem and it does this through a graph of nodes which represent file/directories. 

### Any more?

This is only a rough guide on FAT, I'd reccomend reading a number of other articles before starting your own driver but I hope this has been of some help.