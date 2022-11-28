---
title: 'GUD'
date: '2022-11-29'
---

### Premise 

A few weeks ago, I decided to attempt to make my very own MUD (Multi User Dungeon) which is a small text based game which can be played by multiple people simultaneously. I've never played a MUD before, but it seemed like a fun project. I decided to use Go because I wanted to play with goroutines and concurrency and just to use a new language for fun.

### Simple prototype

The first thing I needed was a server and a way to send and recieve messages. This turned out to be very easy in go:
```
port := "localhost:5000"
ln, err := net.Listen("tcp", port) // Create a new server
if err != nil {
	panic(err)
}
fmt.Println("GUD running on port " + port)
for {
	conn, err := ln.Accept()
	if err != nil {
		panic(err)
	}
	go handleConnection(conn)
}
```
The `go handleConnection(conn)` invokes a `goroutine` which is just a lightweight thread which can execute code and is a function or method. Every program has at least 1 goroutine (the main function).  Whenever a player connects to the server, I parse the input by splitting it up by writespace and passing this into a map of strings to methods which holds all possible commands and executes these.

### Map and procedural generation

The map code is somewhat more interesting as I use procedural genaration to generate a number of random `dungeons` which are interconnected. I use the random walk algorithm which essentially just runs a loop a number of times to create walks. The map can be represented by a 2D array in which 1 represents space, and 0 represents walls. A random direction is picked which is perpendicular to the last one is picked (eg if last one was right, new direction would be up or down), and another for loop is used to actually iterate and actually set coordinates in the 2D array to 1. Surprisingly, it's this simple to setup a randomly generated world and if you make enough of them you can get a whole procedurally generated world.

### Items and hotspots and more

I use text files to hold information like room names, descriptions along with item names, food names and more. Essentially a random number of rooms (paired with descriptions) and items are made. These can be picked up or dropped and a simple array is used to store this data. Hotspots were more interesting. In each room a number of hotspots are placed and whenever a user moves, whether they find a hotspot is detected - if detected, they move.

### Enemies

Enemies are a vital aspect of any game. As far as I know, in most traditional MUD games when you encounter an enemy a sort of text battle plays out. What I ended up doing was ~~copying~~ getting inspired from https://dwwiki.mooo.com/wiki/Attack_messages for my attack messages. Attacks/defenses from enemy and player are determined by what weapon/armour the player yields.

### A* Pathfinding

The last intersting aspect of my MUD is pathfinding. Essentially you're able to use the `find` command to recieve a path to the item you so desire. I had used dijkstra's path finding algorithm last year in a dungeon crawler game in unity, but I wondered if there was a great difference between dijkstra and A*. The key difference with A* is having a goal in mind. `G` cost is the distance between the current node and start node and the `H` cost is the estimated distance from current node to end node.

A node roughly looks like this:
```
type Point struct {
	x int
	y int
	gcost int // Cost of start point to end goal
	hcost int // Heuristic cost estimated cost from node to goal
	parent *Point
}
```

So the algorithm roughly goes like this:
```
var openNodes []Point // Nodes that have calculated cost
var closedNodes []Point // Nodes that haven't calculated cost

// Add starting node to list

// Loop through all open nodes (initally just the starting one)
for len(openNodes) > 0 { 
		/* Sort the open nodes 
		to get the one with the lowest heuristic cost 
		(cost to the actual node)
		*/
		
	// Get the node with the lowest cost and add it to closed list

	// Check whether this node is the node we desire
	
	// If not, get all adjacent nodes and loop through them

	/*
		If the node is walkable and not on the closed list closed:
		Calculate the heuristic cost, and set gcost, hcost
		Add if open nodes list doesn't contain it
	*/
	
}
```

### Conclusion
Thats about all the interesting aspects of my MUD. The name `GUD` came about since it's a `MUD` written in golang. You can find the source code here: https://github.com/sid-shakthivel/GUD