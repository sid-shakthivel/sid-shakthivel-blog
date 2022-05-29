---
title: 'Kernel Dev 2'
date: '2022-05-28'
---

### VGA Text Mode
The vga buffer located at `0xb8000` allows characters to be printed to the screen which has 25 rows of 80 columns. 
This block of data maps to VRAM and by using this buffer actual values in RAM are not manipulated. 
We can imagine each memory address containing a 16 bit entry which defines how a character is formatted. The format is shown below:

| 15 | 12-14 | 8-11| 0-7 |
| ----------- | ----------- | ----------- | ----------- |
| Blink | Background | Foreground | ASCII |

### Spinlocks

Mutable static variables are considered unsafe and bad practice. 
Spinlocks allow a resource to be accessed by a single thread and forces any other thread to wait in a while loop until the lock is free. 
This prevents data corruption. 

### Other
The lazy statics crate allow global static variables to allow initialization at runtime instead of compile time.  

Static references allows variables to survive the entire duration of a program without being dropped.