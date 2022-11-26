---
title: 'Kernel Dev 5'
date: '2022-06-01'
---

### PIC

The PIC or Programmable interrupt controller is a device which manages hardware signals and converts them to software interrups which allows an OS to respond to devices.
There exists 2 PIC's which have 8 inputs and are called master and slave which allows for 15 interrupts and a table below describes what each is used for.
The PIC is initally mapped to the first few interrupts, however as those interrupts are used for other software interrupts, they must be remapped to 32-47. 
A common issue, you may encounter with implenting the PIC and interrupts, is not having more then 1 interrupt serviced. Every interrupt from the PIC must be acknowledged to confirm it has been handled and this is as simple as sending `PIC_ACK` to the port. Note that for a slave interrupt, both the master and slave must be acknowledged.

```
+------+-------------+------+-----------------+
| PIC1 | Hardware | PIC2 | Hardware |
+------+-------------+------+-----------------+
| 0 | Timer | 8 | Real Time Clock |
| 1 | Keyboard | 9 | General I/O |
| 2 | PIC 2 | 10 | General I/O |
| 3 | COM 2 | 11 | General I/O |
| 4 | COM 1 | 12 | PS2 Mouse |
| 5 | LPT 2 | 13 | Coprocessor |
| 6 | Floppy Disk | 14 | IDE Bus |
| 7 | LPT 1 | 15 | IDE Bus |
+------+-------------+------+-----------------+
```

### Pit
Programmable interval timer (PIT) is a chip which is used to implement a system clock as it can generate interrupts at a regular time interval. The chip has 3 channels however only channel 0 relates to the clock. The PIT allows for actions to be undertaken once a specific amount of time has happened. This interrupt comes very handy later as it's used for multitasking. Context switching in which the CPU pre-empts the current task takes place during the PIT interrupt however that's a topic for another time. 

### PS2
Stands for `Personal System 2` and this is a part of AIP which is linked to the 8042 chip. You may have encountered these ports when connecting old keyboards to old computers - these ports are green/purple and allow users to connect directly with mouse/keyboard. These days wireless or usb a keyboard/mice and standardised. 

The PS/2 controller uses 2 IO ports which include
- Data port (0x60) which is used to read/write from PS/2 device/controller
- Command register (0x64)  used to send commands specifically to the PS/2 controllder
- Status register which has numerous flags to show state
Writing a value to 0x64 sends a command byte whilst reading gets the status byte
Osdev has a handly article (https://wiki.osdev.org/%228042%22_PS/2_Controller) for how to actually setup the PS/2 controller as it may not have been configured correctly by firmware.

The PS/2 keyboad uses serial communication and it accepts commands and sends scancodes which comply to a scancode set. A scancode is a byte and a scancode set is similar to a table which maps between ascii characters a byte sent.

The PS/2 mouse can be specifically enabled on the PS2 controller bus
The mouse sends 3/4 byte packets which communicate movement (this comes through on port `0x60`). Bit 5 on the status register is set if a byte comes from the mouse. These packets are generated at a rate (typically 100 packets a second) and is the mouse is pressed or released.
The format of the packets can be found below:
Byte 1:
```
+------------+------------+-------------+------------+-------+------------+-----------+----------+
| Bit 0 | Bit 1 | Bit 2 | Bit 3 | Bit 4 | Bit 5 | Bit 6 | Bit 7 |
+------------+------------+-------------+------------+-------+------------+-----------+----------+
| Y Overflow | X Overflow | Y Sign Bit | X Sign Bit | 1 | Middle Btn | Right Btn | Left Btn |
+------------+------------+-------------+------------+-------+------------+-----------+---------+
```
Byte 2: X Movement
Byte 3: Y Movement