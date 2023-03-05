---
title: 'More OpenGL'
date: '2023-02-13'
---

## Cube Map Reflections

Reflection is property that object reflects its surrounding environment (like a mirror). Calculate a reflection vector around the normal vector based on view vector and this can be used as a direction vector to sample the cubemap and return a colour value.

Refraction is the bending of light (change of direction) due to change of medium. View vector, Normal vector and a refraction vector are used and this is used to sampe the cubemap. Snells law is `n = sin(i)/sin(r)`.

## Face Culling

When viewing a cube, only 3 faces are visible at any one point thus only those need to be rendered and this improves performance. `Face culling` checks all the faces which are front facing the viewer and renders those. When vertices are defined, they can be clockwise or counterclockwise. Each set of 3 vertices contain a winding order and this information is used by OpenGL to determine direction of a triangle. To enable this just `glEnable(CL_CULL_FACE)` - back faces need to be culled. To switch the order `glFrontFace(GL_CCW)`. 

## Raycasting

Raycasting involves projecting a 3D ray from the mouse converting that coordinate into world space before checking what objects that ray intersects with. We begin by converting the viewport coordinates which are recieved from a mouse handler callback function into NDC, before converting into clip coordinates, camera coordinates and finally world coordinates. The last two steps are performed by multiplying by the inverse of the view and projection matrix respectively. For my basic voxel game, I march through the ray from the position of the camera. A bug I ran into was not adjusting for the camera orientation thus I had to add this this value. The general logic for this stems from the vector equation of a line in which `= PositionVector + x(DirectionVector)`.  For voxel editing, I simply check for right/left click and edit individual blocks within the chunk. Another issue I ran into was the higher resolution on the mac display being far higher which meant functionality didn't work correctly however I temporarily fixed this by testing on a monitor.

## Island 
To generate a general island shape, I multiplied the value generated from perlin noise to a value generated from the function below which essentially generates a circular shape by 0'ing the outer values. 
```
float GetGradient(float X, float Z)
{
    float DistanceX = abs(X - 240 * 0.5f);
    float DistanceZ = abs(Z - 240 * 0.5f);
    float Distance = sqrt(DistanceX * DistanceX + DistanceZ * DistanceZ);

    float MaxWidth = 240 * 0.5f - 15.0f;
    float Delta = Distance / MaxWidth;
    return Delta * Delta;
}
```