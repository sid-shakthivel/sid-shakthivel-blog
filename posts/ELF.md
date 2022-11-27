---
title: 'ELF'
date: '2022-11-28'
---

### ELF
I've always been confused about ELF and how it works. Previously on  prevous kernel, I had used ELF but it was just a quick copy and paste from osdev bare bones. In my current kernel, I wanted a proper userspace in which C programs were compilled down. `ELF` stands for Executable and Linkable format and ELF files define the organisation of a binary. Linkers combine elf files into an executable or library and these use sections. Loaders load files into memoy and use segments. 
You can define an ELF file by declaring sections which hold specific types of data - an example can be found here: https://github.com/sid-shakthivel/os64/blob/main/userland/linker.ld. The `. = 0x5000000;` means that the program starts at that virtual address. Note `BLOCK(4K) : ALIGN(4K)` ensures all addresses are page aligned which if not configured may cause some issues when doing paging.

Rough guide to ELF sections:
```
+-----------+----------------------------------+
| Name | Purpose |
+-----------+----------------------------------+
| .text | code |
| .data | initialised data with read/write |
| .bss | unitialised data |
| .roadata | initialised data with read only |
+-----------+----------------------------------+
```
### Grub modules and userspace programs

In the `grub.cfg` file, you can specify to load in any grub modules. For example, in my kernel, I load a small ramdisk along with programs. To make this process easier, I made a series of makefiles which would compile down programs and copy them to the correct directory.

### Where does the kernel come into play?
Whilst the program can be an executable on our development machine, we want our OS to actually execute it. It needs to load the correct areas of the executable into memory and know the `entrypoint` of the program. Whilst segments are used for loading, sections are used for linking. ELF `program headers` specify where segments are located which can contain a multitude of sections. All that is required, is to loop through each segment and copy over the appropriate bytes as each header follows a simple structure shown below. A handy tool to help inspect ELF files is `readelf` and you'll want the `-l` flag to display program headers and this can help when debugging if a process is not acting unexpectedly.

```
#[repr(C, packed)]
#[derive(Debug, Copy, Clone)]
struct ElfProgramHeader {
	p_type: Elf64Word, // Entry type
	p_flags: Elf64Word, // Access permission flags
	p_offset: Elf64Off, // File offset of contents
	p_vaddr: Elf64Addr, // Virtual address in memory
	p_paddr: Elf64Addr, // Physical address in memory
	p_filesz: Elf64Xword, // Size of contents in file in bytes
	p_memsz: Elf64Xword, // Size of contents in memory in bytes
	p_align: Elf64Xword, // Alignment in memory and file
}
```
