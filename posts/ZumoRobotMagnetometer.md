---
title: 'Zumo Robot & Magnetometer'
date: '2021-07-06'
---

I recently purchased an arduino and a zumo robot thing I decided to do was to move the robot exactly 90 degrees - a seemingly simple task... However I can assure you it's not as simple as it seems!

The Zumo Robot contains a magnetometer - these give the magnetic field strength for all 3 axis (x, y, z). The X axis measures the North component of the magnetic field, the Y axis measures the East component of the magnetic field, and the Z component measures the vertical component of the magnetic field. These are all vectors. Our magnetometer gives us these readings.

But first we must calibrate our magnetometer. The earth acts as a giant magnet (with a magnetic field) but there are other objects which effect the magnetic field strength of an object such motors or even a fridge magnet. Hard Iron interference (V) is caused by permanent magnets such as iron. Soft iron interference is caused by changes in direction and magnitude. We want the magnetic field strength of the earth. We can get this by subtracting the hard iron interference (V) by the reading the magnetometer. V can be calculated for each axis by adding the maximum and minimum readings of the magnetometer and dividing by 2. So if we minus the readings for each axis by the V for each axis we will get accurate measurements of the earth's magnetic field.

We know know the vector of the earth's magnetic field strength - we need to get an angle! A bearing is the angle between North and the direction an object is facing. To calculate this we must find the arc tangent of X and Y, and then multiple by 180 and divide by PI to convert from radians to degrees. It's simply `bearing = atan2(y, x) * 180 / M_PI;`. We now know the angle of the object from North. We want to turn 90 degrees. To do this we simply add 90 to the bearing and turn (by moving the motors) until we hit our target bearing! If the target bearing is over 360, just subtract 90 from target bearing. It's important to note that this slightly overshoots so we must slow down the motors as we turn. Note that the results aren't 100% accurate because of the motors themselves, magnetic objects in the room, and the magnetometer.
