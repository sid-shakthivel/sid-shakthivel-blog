---
title: 'OpenGL'
date: '2022-12-20'
---

### What is OpenGL?
Contrary to popular belief, OpenGL is not a graphics API but rather a specification (managed by Khronos). This spec is implemented by different companies for their operating systems for example Apple manages the OpenGL library for MacOS. That specification  specifies how each function should act. The OpenGL libraries allow programmers to manipulate graphics and these provide a large array of functions and types. 

### GLFW
OpenGL (Open Graphics Library) is a low level API which can do stuff like 3D rendering but can't create a window for example. Libraries like GLFW (others include SFML) abstract a few levels higher and can handle user input, defining contexts, and windows for us which are all operating specific things. 

### Glad
There are many versions of OpenGL drivers and the location of functions within must be queried at runtime. Programmers must retrieve the location of these and store them in function pointers (this is all OS specific). Therefore it's far easier to use a library like GLAD which handles this for us.

### Setup on MacOS
The setup process on MacOS was slightly cumbersome but not too bad. First you'll want to install GLFW by running `brew install glfw`, you'll also need Glad. Go to `https://glad.dav1d.de/`, and set GL to `4.1` (This is the highest version of MacOS) and Profile to `Core`.  Create a new project and make both `include` and `lib` folder within and copy over the `libglfw.3.3dylib` file from `/usr/local/Cellar/glfw` into the `lib folder` and the `GLFW` folder (within the `/usr/local/Cellar/glfw`) into the `include folder`. To setup `Glad`, unzip the folder created from the website above and copy `glad` and `KHR` folders from `include` into your project's `include` folder and the `glad.cpp` file too. I made a minimal makefile too.
