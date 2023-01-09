---
title: 'Colours, Lighting + Materials'
date: '2023-01-06'
---

Light sources which cast light upon objects are light casters. There are many types.

## Directional Light
Whena a light source is modelled to be infinitely far away it's directional as all rays have same direction for example the Sun. All the light rays are paralell.

## Point Light
Point lights are light sources which illuminate in al directions but dim over distance like a light bulb. `Attenuation` is when the intensity of light is reduced over a distance that a light ray travels. The formula to calculate this is `1.0 / (Light.constant + Light.linear * dist + Light.quadratic * (dist * dist));` in which `dist` is the distance between fragment and light source.

## Spotlight
Light course located somewhere which only shoots light in 1 direction like a streetlight. In OpenGL, these are represented by a direction and cutoff angle. If a fragment is within the spotlights cutoff directions, it's lit. A flashlight is a specific spotlight pointed in the direction of the player. 

## Models

Models can be imported into an application designed on something like Blender so vertices, normals, and textures don't have to be manuallly declared. Models are something in it's entirety such as a computer setup for example including a PC, monitor, keyboard, mouse, etc. The library `Assimp (Open Asset Import Library` can import many models and parse them. All data is contained in a `Scene` object (including materials and meshes). The `Root node` contains child nodes and have data. `Mesh` objects a set of vertex data which consist of vertex positions, normal vectors, texture coordinates and faces of an object. A `Face` represents a primitive render of the object. The Mesh also links to a `Material` object which contains lighting maps and more.