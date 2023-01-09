---
title: 'HDR, Bloom, Perlin Noise'
date: '2023-01-09'
---

## Perlin Noise
Random but structured numbers can be generated through perlin noise. These random numbers can be used for terrain generation by generating a heightmap. A heightmap is an image used to generate 3D terrain (uses greyscale). Darker areas represent dips and higher areas represent hills. With a heightmap, meshes can be formed from vertices in which the height of each vertex depends on the colour of the pixel. 

## HDR

Brightness are clamped between 0.0 and 1.0. For very bright areas, allow colours to exceed 1.0 and then clamp them back. HDR (High Dynamic Range), bright things are very bright and dark things very dark. Converting HDR values to LDR values is tone mapping. Allows to specify a light's intensity by real intensity. Colour values need not to be clamped and this can be done by making a floating point framebufer (by changing the parameters of `glTexImage2D`). `Tone mapping` transforms floating point colour values to 0.0-1.0 range. Reinhard tone mapping divides the HDR colour to LDR by balancing the brightness values onto LDR. 

## Bloom
Bloom makes bright lit regions glow. Bloom works well with HDR. To implement it, lit scene is rendered and the HDR colour buffer is extracted along with an image of the scene with bright regions visble. The brightness image is blurred and added onto the HDR image.