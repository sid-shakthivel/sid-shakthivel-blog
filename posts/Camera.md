---
title: 'Camera'
date: '2023-01-02'
---

Cameras can be simulated by moving objects across the scene in the oppose direction. The camera needs a position within the world which can be `(0,0,-3.0f)`. The camera also needs a direction in which it's pointing at (needs a direction vector) and this can be found by normalising the difference between the position and target. The `right vector` represents the positive `x-axis` of camera space and this must be perpendicular to both an `up vector` and the `direction vector` (cross product). The vector pointing to positive y-axis can be found by again calculating the cross product between the x and z axis vectors.  

### Look At
The `LookAt` matrix looks at a given target and transforms all coordinates to that direction.

## Deltatime
Why is `Deltatime` used so much and what is it? Deltatime is the time between subsequent frames. Some computers are faster then others so having a single constant for say speed would lead for faster movement for those with faster CPU's. By using `deltatime` the speed can be balanced out so the speed is the same on any PC.

## Euler Angles
These are 3 values which can represent any 3D rotation: `pitch` (vertical rotation angle), `yaw` (horizontal rotation angle), `roll` (3D rolling angle). Camera systems deal with `pitch` and `yaw` by converting them into a 3D vector (representing a direction vector) using trig. These are gathered from mouse movement. Last mouse positions are stored and current mouse movements are calculated (higher the horizontal/vertical movement the higher pitch and yaw).