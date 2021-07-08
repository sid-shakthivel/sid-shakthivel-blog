---
title: 'Zumo Robot & Gyroscope'
date: '2021-07-08'
---

After failing to get consistent results with a magnetometer when turning 90 degrees, I decided to try using a gyroscope to achieve somewhat similar results - the results were far more successful.

Firstly, a MEMS gyroscope measures angular velocity (how fast an object rotates relative to a point) in 3 axis - X, Y, Z. The gyroscope gives this angular velocity in a vector. They measure this in the units mdps/LSB. For my gyroscope (L3GD20H) to convert this arbitrary unit into something tangible I multiply each reading by 0.00875 to get a reading in degrees per second. Next, I multiply this value by delta time to find the degrees the robot has moved. But wait... What axis do I need to measure? I measured the Z axis, as it is vertical.

To actually rotate the robot, I use a while loop and move the motors until it has moved 90 degrees.

This method was actually quite a lot simpler than using the magnetometer, so I suggest you to use the gyroscope instead.
