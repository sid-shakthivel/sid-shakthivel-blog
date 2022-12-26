---
title: 'Transformations'
date: '2022-12-26'
---

## Vectors
As per A level maths, a vector has a direction and magnitude. Vectors can represent positions or directions and can be 3D or 2D. Vectors can be added, subtracted intuitively. To calculate the magnitude, just use Pythagoras and use triginometry to calcualte sides. For the angle between 2 vectors, the dot product equation can be used. The cross product takes in 2 vectors and spits out a third vector which is perpendicular to the other two. 

## Matrices
A matrix is like an array (in which items within are called elements). Once again they can be added, subtracted and multiplied (by a scalar) intuitively. Multiplying matrices is a little more complex so I'd recommend watching a video on the topic. Multiplying a vector (which can represent a position) by a matrix (representing a movement) can transform that vector around. Just to note - in case you want to create your own Matrix class, in OpenGL matrices are actually Column Major (the inverse of what it is intuitively) - I hope this saves you hours of debugging. 

## OpenGL?
This is rather trivial, essentially create a matrix, send it to the shaders (via `uniform`) and then multiply the position vector by the matrix. Setting that uniform value can be done through `glUniformMatrix4fv`. Just to note transformations actually occur in the opposite order (translate -> rotate occurs rotate -> translate).
