---
title: 'Coordinate Systems'
date: '2023-01-01'
---

Coordinates of each vertex must be in normalised device coordinates (thus between -1.0 and 1.0). The vertex shader converts coordinates into NDC's and the rasterizer transforms them into 2D coordinates. There are 5 coordinate systems and when converting coordinates they must be transformed into many intermediate coordinate systems. 

## General Overview
Vertex coordinates start in local space (local coordinates) which are the coordinates of object relative to original origin. These are transformed into world space coordiantes (coordinates regarding world) whicha re relative to global world origin. These are transformed into view space coordinates (thus can be seen from camera). Next they are transformed into clip coordinates (can add perspective). Finally they are converted to screen coordinates through viewport transform which transforms from `-1.0-1.0` to coordinate range from the viewport and this is sent to the rasteriser. 

## Local Space
Local coordinate space local to an object (typically `(0,0,0)`).

## World Space
Coordinates of vertices relative to a general world and the conversion uses a `model matrix`. This matrix consists of any transformation which should apply to all vertices for all objects.

## View Space
Refered to as the `camera`. Space seen from a camera's point of view and done through a number of translations and rotations. These are stored in a `view matrix`.  

## Clip Space
OpenGl expects coordinates to be in a range and coordinates out of that range are clipped (discarded and unseen). The coordinate set is specified and are converted back to `NDC` later. A `projection matrix ` is used for this. A `projection matrix` creates a viewing box which is fustrum (any coordinate within this will end up on the screen). It's called a `projection matrix` because it projects 3D coordiantes to 2D.  Once they're transformed, `perspective division` is performed which dives `x, y, z` by `w`. From here the coordinates are mapped to screen coordinates and turned into gragments. There are 2 types of `projection matrix` which are below.

## Orthographic Projection
Defines a `cube like fustrum` in which the `width, height, length` are defined along with a `far plane` and `near plane`. Any coordinate in the front of the near or far plane is clipped. It maps all coordinates to `NDC`. 

## Perspective Projection
Perspective is an effect in which objects far away look smaller than objects close. It uses `perspective projection matrix` which maps a fustrum range to clip space but manipulates the `w` component so the further away an object is the higher it becomes. Perspective division is applied too. It's a large fustrum too which defines visible space. 

## Z-Buffer
All depth info is stores in a buffer called `depth buffer` and it's automatically created. The depth is stored within each fragment, when the fragment wants to output its colour, the depth values are compared and overwritten (or not). This must be enabled.