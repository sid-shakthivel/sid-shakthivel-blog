---
title: 'Water'
date: '2023-03-03'
---

Realistic water was the next thing I wanted to add to my voxel game. The first issue was how to seperate water from the rest of the chunk data for a different shader would have to be used to render it. I set a water layer which meant that any block under that depth would be set to water. I would need another VAO, VBO, etc for this. I tried to do this all in one loop however this would cause some issues later on. The next step was to learn how rendering water worked.

Water consists of a a reflection of things above the water and a look into things under the water itself. This means 2 FBO's are needed - a reflection buffer for things above the surface and a refraction buffer for things below the surface. But first what is a FBO? There are multiple different buffers like colour buffers which hold colour information, depth buffers which hold depth information. When we combine these buffers, we get a framebuffer. To render specfic portions I used a clipping plane and these can be invoked using an inbuilt variable called `glClipDistance` which tells us how far each vertex is from the clipping plane. To calculate this value we can work out the dot product of the fragment position and the clip plane. The clip plane can be defined by the normal and the actual `y` coordinate (the water level). Since it's horizontal the normals are `(0, 1, 0)` and `(0, -1, 0)`. From here all that was needed was to render the scene using the specific clipping planes into a framebuffer which contained a texture. 

The water shader worked by using a setting a combination of the reflection and refraction texture as the output colour. However I ran into a few bugs here. Firstly there was some weird glitching and the reflection didn't work whatsover. It turned out that the way my chunk generation worked meant that sides with water adjacent to them weren't rendered which caused some strange lighting effects. I fixed this by simply putting the water in another for loop. I also added sand which was present for blocks a certain range near the water. The way I fixed reflection was to move the camera below the water and slightly behind the water too. From here the water simply wasn't blue enough so I `mix`'d the output with a value from my texture atlas. 

The water was stationary at this point and I wanted to change that. The way I did that was by using a DuDv map. After following a tutorial I still couldn't get it to work. From here I tried rendering the actual texture to a quad and I found out the actual texture wasn't being loaded in correctly - it didn't have an alpha channel (like the other textures I was using thus far). Once I fixed this everything else seemed to work. I also added a normal map with specular lighting for a better effect. 

The amount of reflectance was still constant though at `0.5` - the fix for this was using the fresnel effect which changes the amont of reflectance seen depdending on the viewing distance and thankfully this was done in 2 lines of GLSL:
```
vec3 ViewVector = normalize(ToCameraVector);
float RefractiveFactor = dot(ViewVector, vec3(0, 1, 0));
```
All this did was work out the dot product between the camera vector and the horizontal since the normal for the water was vertical.

That's about all it took to get a realistic water.