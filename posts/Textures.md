---
title: 'Textures'
date: '2022-12-24'
---

Textures are 1/2/3D images which add detail to an object. Lot's of details can be included within an image it gives the illusion an object is detailled and they can also store lot's of data to send to shaders. Each vertex should have a texture coordinate associated with it (fragment interpolation handles the rest). Sampling is getting the texture colour from a texture coordinate. Unlike normalised device coordinates, `(0,0)` refers to the lower left of a texture. 

## Texture Filtering
Texture coordinates don't depend on resolution but rather any floating point number thus OpenGL must figure out which texture pixel (texel) to map a texture coordinate to. There are two options - `GL_NEAREST` which selects the closest texel or `G_LINEAR` which takes an interpolated value from the adjacent texels. Texture filtering can be set for magnifying/minigying operations too.

## Mipmaps
These are collections of texture images in which each subsequent texture is twice as small as the last one. This allows far away objects (which have less fragments) to use a lower resolution texture. OpenGL can actualy generate these mipmaps too.

## Texture Units
This is location of a texture and the default is 0. Some graphics drivers don't assign a defauly texture unit. Texture units allow multiple textures to be used (there are usually a minimum of 16 texture units to use).

`glTexImage2D` has a number of paramters which are defined below:
- Texture target (`GL_TEXTURE_2D`)
- Specifies minmap level to create the texture at (if you want to do this manually)
- Speciffy what format to store the texture
- Set width, height, 0
- Format, datatype of image, actual image data

To actually sample a colour of a texture, simply use the `texture` function which takes a sampler and texture coordinate. The output is the filtered colour of the texture at an interpolated texture coordinate.
