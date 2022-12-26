---
title: 'Graphics Pipeline'
date: '2022-12-22'
---

Everything is in 3D space however a screen is a 2D array of pictures thus 3D coordinates must be transformed into 2D coordinates before transforming those into coloured pixels. Shaders are small programs which process data. The pipeline contains many sections which perform specific functions. Vertex data is a collection of vertices which are collections of data for a 3D coordinate and is represented using vertex attributes for example x, y, z, and colour. Each stage takes the previous output as input. It's a rather complex chain however we only neeed to work with the vertex and fragment shader (for the most part).

### Vertex Shader
These take a single vertex as input and transform 3D coordinates into different 3D coordinates. OpenGL only processes 3D coordinates when they're in range `-1.0 -> 1` which is called normalised device coordinates. 

#### Normalised Device Coordinates
In this form `(0, 0)` are at the centre. Coordinates outside this range are clipped and ignored. These coordinates are transformed to `screen-space` coordinates  through viewport transform into fragments. Usually they would go through more phases however we can send these straight through to the fragment shader.

#### Vertex Buffer Object
Vertex data is sent to the vertex shader by creating memory on the GPU and this is managed through vertex buffer objects (VBO). The format this data can be anything including position, normals, texture coordinates, etc. To specify how OpenGL should interpret the vector data, `glVertexAttribPointer` and `glEnableVertexAttribArray` can be used. ``glVertexAttribPointer`` has a number of parameters which are below:
- Index (specifies index of vertex attribute)
- Size (specifies the number of components per attribute)
- Normalised (should be clamped)
- Stride (specifies the byte offset between consecutive vertex attributes)
- Pointer (specifies offset for first component of first vertex attribute within array)
Large batches of data can be sent at once (minimises time as sending data to GPU is slow). Every object in OpenGL has a unique ID. Buffer types of vertex buffer is `GL_ARRAY_BUFFER`. The functions `glBindBufer` binds a buffer object to a specific type and `glBufferData` copies vertex data into the buffer.  

#### Vertex Array Objects
These are arrays of vertex buffer objects used by OpenGL. All state is stored within and can be switched by binding a different one. These are required (as of OpenGL 3.1) to render anything. Each mesh should have it's own VBO. They store calls to `glEnableVertexAttribArray` and vertex attribute configurations as well.

#### Shaders
Shaders are written in GLSL (OpenGL Shading Language) and this is similar to C and are compiled too. To use a shader, it must dynamically compile at runtime. 

### Primitive assembly stage
Takes vertices as input and assembles points into a primitive shape like triangle.

### Geometry Shader
Generates other shapes by emitting new vertices to form more/new primitives. 

### Rasterisation Stage
Maps the primitives to corresponding pixels on screen resuling in fragments (these represent all the data required for OpenGL to render a pixel). 

### Fragment Shader
Calculates the final colour of a pixel (contains data about 3D scene and can calculate final pixel colour). Colours are essentially an array containing red, green, blue, and alpha (opacity). Strength of components are between `0.0 -> 1.0`. The fragment shader reqires 1 output variable. 

### Alpha test and blending stage
The final stages check for alpha values and blends objects.

### Shader Program
These are the final linked version of multiple shaders combined. Essentially you create a new program, attach the shaders, and link them.

#### Element Buffer Objects
When creating something like a rectangle, we can define it as 2 triangles however there may be overlap between coordinates which obviously brings about a performance deficit. Using a `EBO`, you can specify the coordinates and the specific order they need to be drawn. It acts like a regular `VBO` and you just need to a few types to get everything working. 