---
title: 'Cascaded Shadow Maps'
date: '2023-03-02'
---

There are a number of methods which can improve the quality of shadows. Once of which is CSM.

The first step is to constuct a fustrum using world space by multiplying the inverse of projection and view matrix to the NDC corners (these are in range of -1 and 1). The centre is calculated by averaging out the 4 corners. This look at matrix needs to be defined like using `Centre.Add(LightDirection)` and `Centre`. The fustrum corners then need to be transformed into light space to find minimum and maximum coordiantes.

The final thing is to increase size by using a `ZMultipier` which pushes back the far plane and pulls in the near plane. From here, I wrote a geometry shader which actually helps output the depth values directly to the textures depending on the level of near and far. To store the light matrices, I use a uniform buffer object (UBO) and pass this into my shaders.

The actual code within the shaders to check for shadows is fairly simple - essentially I calculate the cascade level to use depending on the depth value of the fragment position. From here it's very similar to simple shadow mapping.