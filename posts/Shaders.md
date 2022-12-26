---
title: 'Graphics Pipeline'
date: '2022-12-23'
---

Shaders are little programs which run on the GPU which simply transform inputs into outputs. They are written in GLSL. They dont communicate with one another either. The structure of a shader is shown below:
```
#version version_number
in type in_name;
out type out_name;

uniform type uniform_name;

void main() {
	out_name = stuff;
}
```
There are number of types including all the usual ones (int, double) but also vectors like `vec2` and `vec3` to determine 2D and 3D positions. Specific shaders need specific inputs and outputs - for example the vertex shader must always recieve some sort of input along with specifying where the vertex data is located (`layout (location = 0)`). The fragment shader requires a vec4 colour output since it must generate a final colour. Linking variables together is possible as long as the same name is used.

## Uniforms
These are another way to pass data and these are global and can be modified from `c++` code as well. 

### Vertex Shader
To set it's output, we must assign position data to `gl_Position`.