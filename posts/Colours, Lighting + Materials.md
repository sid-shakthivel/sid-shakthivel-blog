---
title: 'Colours, Lighting + Materials'
date: '2023-01-05'
---

# Colours

Using different values of Red, Blue, and Green, plently of colours can be represented digitally. As per physics, objects absorb colours and reflect colours and colour they reflect is the very colour humans see. White light is a combination of all the colours. Multiplying the colour of an object by the colour of a light gives the reflected colour of an object.

# Lighting

## Phong Lighting Model
Lighting depends on a number of complex factors thus lighting in OpenGL is based off a number of models like the `phong lighting model` which consists of a number of components which come together and was named. 

## Ambient Lighting
There is usualy some light so objects are never completely dark (the moon and stars for example) thus we can give an ambient lighting constant that always gives objects colour. 

## Diffuse Lighting
Diffuse lighting gives objects more brighness the closer the fragments are aligned to the light rays from a source so the more of an object that is within a light source, the brighter it is. The angle at which the light source touches the fragment can be calculated using the dot product (if a light ray is perpendicular(90 degrees) to the object's surface light has the greatest impact). To calculate diffuse lighting a normal vector and directed light ray vector (difference vector between light position vector and fragment position vector)is required.

### Normal Vectors
Unit vectors are perpendicular to the surface off a vertex.

## Specular Lighting
Simulates a bright spot of light which appears on shiny objects. This is based again on the normal vector, light direction vector but also the view direction (from what direction the camera looks at the fragment). A reflection vector is calculated by reflecting the light around the normal. The angular distance between this and the view direction is calculated (the closer the angle, the greater the impact of the lighting). This is done by first calculating the dot product and setting that as the exponent to the shininess value. The shininess value is how much light is reflected or scattered. Specular strength intensity value must be set too.

## Materials
Each object reflects light differently meaning some seem shinier like streel compared to a piece of paper (this scatters light). To simulate objects, `material` properties can be given to a surface which defines a colour for ambient, diffuse, and specular. Structs can be written and filled in through `GLSL`.

Different objects consist of many materials. 

## Diffuse Maps
Textures are materias and thet represent all diffuse colours.

## Specular Maps
Texture maps can be used for specular highlights too - these are usually black and white which define specular intensities for different parts of an object. 