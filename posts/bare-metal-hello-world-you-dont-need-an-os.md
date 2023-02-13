---
title: "Bare Metal Hello World: You Don't Need an OS"
description: Hello World is the first program anyone writes. Here's how you can do it in assembly without relying on the operating system for anything.
tags:
  - low level programming
  - assmebly
date: 2023-02-13
---

# Introduction
We all remember the first time we made a terminal print out those blissful words by ourselves.
It"s what got us on this journey as developers in the first place and so it holds a special place in our hearts.
I like revisiting such moments and seeing what more can be learned from them.
This usually involves doing something simple from your "junior dev years" with some extra constraints such as:

* [FizBuzz in CSS](https://www.trysmudford.com/blog/fizzbuzz-in-css/) 
* [Fibonacci in Brainf*ck](https://gist.github.com/wxsBSD/31e2e9cf8b41d624403c91e6d7e6da3f)
* etc.

Let's embark on such a journey together by writing a "hello world" program
that gets executed directly by the CPU and does not need an operating system to work.

# Operating System?
Before we do though, let's talk realy briefly about why our regular programs need an OS to work.
In short, operating systems abstract away dealing with hardware so that we can focus on what
our code should do and not so much how it should tell the CPU to do it.
For example, the C standard-library function `printf` relies on the opearting system to actually
write to the terminal. The operating system exposed the `write` system call to the developers of the
C standard library and they've exposed part of it to you through the `printf` family of functions.
*You can actually check which system calls an executables makes with `strace` on Linux and `dtruss` on MacOS to confirm this.*

For all of this to work as smoothly as it does, your operating system contains millions of lines of code
(not joking, [Linux is around ~8mil](https://docs.kernel.org/process/1.Intro.html)) that handle all the 
minutia such as mapping memory, figuring out where to write you string, etc. But what if you want to do it yourself?

# Setup: a bit involved
To print "hello world" entirely on our own, we can utilise the fact that a lot of the information about how
computers boot into OSes is freely available on the internet and fairly standardised. We can essentially write a bunch of code
that is intended to run as if it is the operating system. Obviously, our small example will not be an actual operating system, but,
crucially, it will have the same level of access to the underlying hardware as an actuall OS would.

## BIOS and Booting
When a computer turns on, the first code that gets executed is something called the BIOS or (basic input/output system) which is usually
burned on a flash rom inside your motherboard. It's job is to provide the bare essential functionality of letting you choose a boot disk,
and loading your operating system. Once it has done that, it passes it's work to the bootloader.

The bootloader is usually in stages. Since it has to fit in 512 bytes for legacy reasons, it will usually use those 512 bytes to
find a stage two more advanced bootloader and pass execution onto that. However, since our code will definitely fit in 512 bytes,
we can actually write out our example in this stage one of the bootloader.

## Virtualisation and compilation
You could run this experiment by compiling your code to an image, burning it to a USB, and rebooting your computer to run said USB on boot
every time you change the code, but that's *a bit* tedious. Instead, you can run the example in a virtual machine. I personally recommend [QEMU](https://www.qemu.org),
because it's easy to set up and can be invoked from the command line. Setting it up is beyound the scope of this tutorial but on most systems,
it should be available through the package manager (i.e. `brew install qemu` or ` apt-get install qemu`).
Make sure to enable virtualization in your BIOS for this to work.

We also need a compiler to turn our assembly into machine code. I personally like [nasm](https://www.nasm.us).
It should also be available in your package manager.

# The Code, finally
Here's your starting point code:

```
;; Prepare the BIOS
org 0x7c00     ;; BIOS jumps here upon boot
bits 16        ;; 16-bit mode

;; Dummy Partition Table so that the bios doesn't complain
;;      and https://en.wikipedia.org/wiki/Master_boot_record)
times 446 - ($ - $$) db 0
db 0x80
db 0x00, 0x01, 0x00
db 0x17
db 0x00, 0x02, 0x00
db 0x00, 0x00, 0x00, 0x00
db 0x02, 0x00, 0x00, 0x00
times 510 - ($ - $$) db 0
dw 0xaa55
```
The first three lines tell nasm to put our code starting at address 0x7c00 where the BIOS will pass execution to.
We then tell nasm that we will be running our code in 16 bit mode. This is done because using 32 or 64 bit modes requires
setting up virtual memory and we don't really need that for "hello world".
We also need to provide a dummy partition table so that the BIOS recognizes that the disk which we're running on actually has executable code on it.
We do this by setting bytes in the executable to specific values that essentially add an MBR to it. 
Consider this boilerplate but it's still nice to understand, so I would recommend giving [this](https://en.wikipedia.org/wiki/Master_boot_record)
to understand what these bytes actually mean.
Anything written after the third line will get executed directly by the CPU. 

# Drawing to the screen
To draw to the screen, we need to set the display mode. Since many bootloaders are graphical (think GRUB when you dual boot), the BIOS provides a few
drawing modes that are handled by the CPU and don't require a GPU driver (or a GPU, lol).
The following code tells the BIOS that we want a 80x25 character 16-color terminal screen. In this mode, each of the aforementioned 2000 characters
on the screen are expressed with two bytes: one for the ASCII character and one for the color of the cell.
```
;; Set the video mode to 80x25 text mode
mov ax, 0x0002 ;; ah = 0x00 -> set video mode
               ;; al = 0x02 -> 80x25 text mode
int 0x10       ;; call BIOS interrupt
```
The code sets the video mode to the AX register (one of the few "variables" we have available) with the move instruction.
You can read more about the different BIOS video modes available [here](http://www.columbia.edu/~em36/wpdos/videomodes.txt).
We then cause what's called a BIOS interrupt, esentially asking the BIOS to take over for a second and set up some functionality for us.
You can read more about the interrupts avaialble [here](https://en.wikipedia.org/wiki/INT_10H).

# Strings
Let's also define our string at the bottom.
```
welcome_message db "Hello, World!", 0x0
```
Notice how nasm doesn't automatically give us a null byte at the end so we need to do it ourselves to mark the end of the string.

# Priting
Now that we have our string and we've set up the terminal output, anything we write to the 0xb800 adress will be outputed on the screen.
To do so in an efficient manner, we can utilise the string manipulation instructions that your CPU has.
Here's the code to do that:
```
;; Set up printing to work with the string registers
cld            ;; clear direction flag,
               ;; so that the string instructions will increment the index
mov ax, 0xb800 ;; memory address of the video buffer
mov es, ax     ;; set the extra segment register to the video buffer
mov di, 0x0000 ;; set the destination index to the start of the video buffer


;; Print the welcome message
mov ax, welcome_message  ;; set the source index to the start of the message
mov si, ax
loop_welcome:
  mov al, [si]           ;; load the next character into al
  stosb                  ;; store al into es:[di] and increment di
  mov es:[di], byte 0x04 ;; make the next character red
  inc di                 ;; increment the destination index (next character in video buffer)
  inc si                 ;; increment the source index (next character from message)
  cmp al, byte 0x00 
  jnz loop_welcome       ;; if not, jump back to the start of the loop
```
We utilize a few registers to print our message, namely `ax`, `es`, `si`, and `di`.
`ax` is what is known as a general purpose register. Think of it as a 16 bit variable directly in your CPU.
You can also split it into the bytes that make it up: `ah` for the higher byte and `al` for the lower one.
The `es` register is a data segment register which we will use to manipulate our strings which.
The `di` and `si` registers are esentially indexes that mark where in our string we are and where in our output we should place it.

Let's walk through the code step by step.
1. We clear the direction flag so that when we go through the string, the index of the current character will increment automatically ([source](https://c9x.me/x86/html/file_module_x86_id_29.html)).
2. We move our special 0xb800 adress into the data segment because our string instruction will write to the data segment.
3. We set the destination index to zero, menaing that we want to print from the start of our terminal.
4. We load our welcome message's address into the source index.
5. We define a loop (or, more acurately, a label which we can jump to later).
6. We load the character at the address of the current source index (the source is the message).
7. We use the store byte instruction which takes `al` and places it into `es` + `di` (our screen memory + where we are on the screen). It also increments `di` automatically because we cleared the direction flag earlier.
8. We make the next byte the color red. Remember, each cell of our output is two bytes, a character and a color. For the available colors, check [here](https://www.plantation-productions.com/Webster/www.artofasm.com/DOS/ch23/CH23-1.html).
9. We manually move to the next byte in our screen because `mov` doesn't do that for us, unlike stosb.
10. We also manually move to the next character of the string.
11. We check if we've reached the end of the string i.e. if current byte is zero, and we jump back to the start of the loop if it isn't.

# Final Result
We can compile and run our code as so:
```
nasm -f bin main.asm -o main.img
qemu-system-i386 -drive format=raw,file=main.img
```
Here's what we get:
![Hello World in QEMU](/images/assembly_hello.png)
Isn't it fulfilling...

# Afterthoughts
You can find the whole code [here](https://gist.github.com/BobbyRaduloff/2d49c9bbf3a47fe7d36899fcb57229e2).
I also recommend checking out [TetrOS](https://github.com/daniel-e/tetros), a working Tetris clone built in the same
way we just built our example. If you want to dive deeper into this topic, the [OSDev Wiki](https://wiki.osdev.org/Expanded_Main_Page) has pretty much all that you need.
