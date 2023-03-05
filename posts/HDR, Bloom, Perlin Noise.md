---
title: 'HDR, Bloom, Perlin Noise'
date: '2023-01-09'
---

## Perlin Noise && Chunk Generation
Random but structured numbers can be generated through perlin noise. These random numbers can be used for terrain generation by generating a heightmap. A heightmap is an image used to generate 3D terrain (uses greyscale). Darker areas represent dips and whiter areas represent hills. I use simplex noise (which is supposedly faster) with `glm`. Essentially I calculate the heightmap position for the `VoxelX and VoxelZ` positions however you must divide this value by 64 to get closer values which help smoothen out terrain. The value then then put into a certain range (adding 1 and dividing by 4) before being multiplied by the maximum chunk height. The actual block at a position is determined by the position - essentially grass is at the top followed by dirt and stone. It's important to note for added performance, I found it easier to embed the texture data within a vertex rather then to set it as a uniform.

## HDR

Brightness are clamped between 0.0 and 1.0. For very bright areas, allow colours to exceed 1.0 and then clamp them back. HDR (High Dynamic Range), bright things are very bright and dark things very dark. Converting HDR values to LDR values is tone mapping. Allows to specify a light's intensity by real intensity. Colour values need not to be clamped and this can be done by making a floating point framebufer (by changing the parameters of `glTexImage2D`). `Tone mapping` transforms floating point colour values to 0.0-1.0 range. Reinhard tone mapping divides the HDR colour to LDR by balancing the brightness values onto LDR. 

## Bloom
Bloom makes bright lit regions glow and works well with HDR. Bloom requires a number of steps to work properly. Firstly the entire scene needs to be rendered to a HDR buffer. The extra bright entities (entities with a brightness of over `(1, 1, 1)`) need to be renderered separately. Essentiallly if this is the case then these need to be rendered to another texture of just these very bright areas (multiple render targets can be used).

The next step is blur everything by applying gaussian blur which is based off the gaussian curve (bell shaped). Weights need to be used and essentially do a horizontal and vertical blur (2 pass gaussian blur). For this a pair of `pingpong` buffers can be used in which they are rendered and swapped a number of times. Make sure to check the texture order is correct with the buffers and to have entities with a very bright colour.

This blurred texture consting of the bright areas must be blended in with the normal colour texture of the inital render and this can then be output to the framebuffer.