---
title: 'Kernel Dev 4'
date: '2022-05-30'
---

### VGA
Text Mode
The VGA buffer located at `0xb8000` allows characters to be printed to the screen by filling the buffer with suitable values.
Actual values in memory are not written to as this is only a buffer which maps to VRAM.
Screen has 25 rows of 80 length.
Each entry in the buffer must be formatted like this:
```
+---------------------------------------------+
| | 15 | 12-14 | 8-11| 0-7 | |
+---------------------------------------------+
| | Blink | Background | Foreground | ASCII | |
+---------------------------------------------+
```
A complete implementation can be found from https://github.com/sid-shakthivel/os64/blob/main/kernel/src/vga_text.rs.

### UART

Physical serial ports provide a connector to attach devices which can transmit 1 byte at a time through a single channel.
Serial ports are bi-directional (half duplex) and are controlled by uart which is a chip which encodes and decodes data.
When sending data, the speed in baud rate must be supplied too.

Once you make a wrapper to call `outb` and `inb`, you can begin configuring the uart port which is `0x3f8` with the following:
```
outb(PORT + 1, 0x00); // Disable interrupts
outb(PORT + 3, 0x80); // Enable DLAB
outb(PORT + 0, 0x03); // Set divisor to 3
outb(PORT + 1, 0x00);
outb(PORT + 3, 0x03); // 8 Bits, no parity, one stop bit
outb(PORT + 2, 0xc7); // Enable FIFO
outb(PORT + 4, 0x0b); // IRQ's enabled
outb(PORT + 4, 0x1e); // Set in loopback mode
outb(PORT + 0, 0xae); // Test serial chip
if inb(PORT + 0) != 0xae {
	panic!("Faulty serial!");
}
outb(PORT + 4, 0x0f); // Set to normal operation mode
```

### Interrupts
Interrupts are signals which stop the operation flow of a computer in order to perform a set action. An example would be a key press or timer. When an interrupt is called the following interrupts are pushed onto the stack: `SS -> RSP -> RFLAGS -> CS -> RIP` . To preserve the current state of the CPU, other essential registers like `RAX, RBX, etc` are pushed to the stack too. An ISR (Interrupt Service Routine) is called which handles a specific interrupt. Interrupts are assigned a number and  the function of what should happen should an interrupt be called is stored within the `Interrupt Descriptor Table` matching with it's number. After this, the registers are popped off the stack and `iret'd` so the CPU can return to whatever it was previously doing. Previously, CPU's could poll specific devices however this was rather inefficient. For example, in real life, if you wanted to recognise when another person was talking to you, instead of constantly checking whether they are talking to you, a more efficient way would be to have a response if and when the other person talks to you. There are software and hardware interrupts - for example an interrupt is triggered if you divide zero and zero or for mouse movement.

A struct encapsulating an entry within the IDT (Interrupt Descriptor Table) looks like this:
```
// Each entry in IDT is 16 bytes
#[derive(Copy, Clone, Debug)]
#[repr(C, packed)]
pub struct idt_entry {
	isr_low: u16, // Low 16 bits of ISR address
	kernel_cs: u16, // GDT segment CPU loads before calling ISR
	ist: u8, // Offset into interrupt stack table which is unused (for now)
	attributes: u8, // Type and attributes
	isr_mid: u16, // Mid 16 bits of ISR address
	isr_high: u32, // Upper 32 bits of ISR address
	reserved: u32, // Set to 0
}
```

More detail can be found within the code here: https://github.com/sid-shakthivel/os64/blob/main/kernel/src/interrupts.rs.