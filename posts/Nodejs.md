---
title: 'Nodejs'
date: '2022-11-26'
---
Below are a series of sporadic notes on node js.

### What is NodeJs?
Node is simply a javascript runtime? What's a JS runtime? Simply an environment in which JS code runs. Typically javascript runs in the browser which contains a JS runtime however node is it's own runtime. Node uses V8 which is a javascript engine developed by google which takes JS code and compiles it down to machine code. Whilst the ability to interact with the DOM and any front end code is lost, the capability to manipulate files and databases is gained. Node can be used for utility scripts and build tools but is commonly just used for web development.

The `node` command is REPL (Read, Evaluate, Print, Loop) and it useful for testing out JS code and generally as a playground as it executes code as you write it.

### Digging deeper

NodeJS is a single threaded, non blocking, asyncronous programming language. What does any of that mean? Being single threaded means there is a singular call stack which means unlike languages like python and c++, there is only a singular stack so only 1 thing can be done at a time.

#### What is a call stack?
A stack is a data structure which is first in, first out similar to a physical stack of plates. The call stack holds alls the functions that are being called. When a function is stepped into, it's added onto the stack and when exited, the function pops off the top of the stack.

```
function main(p1, p2) {  
  foo(1, 1);
}

function foo(p1, p2) {  
  bar(p1, p2);
}

function bar(p1, p2) {  
  return p1 + p2;  
}
```

When in function `bar` the call stack will look roughly like this `Main -> Foo -> Bar`.

#### Async and Non Blocking
Generally, asynchronous communication is when data is transmitted at irregular intervals rather then a steady stream.
If requests were synchronous, the browser would be blocked from doing anything else since JS is single threaded and thus the stack is blocked as no additional JS can be run until other JS is complete. Recall how JS is non blocking which means requests can be initaited in parallel. JS has an event loop

#### Event Loop
Methods are pushed onto the call stack and async functions may use node API's or webworkers which run on another thread. Once these are done, callbacks enter the callback quee and the event loop pushes these onto the stack.

### Webservers + Web stuff

These are networking servers which send responses to requests. Within node, you can create a server and handle requests by for example doing validation and a database request and return HTML or JSON.

Data is transferred across networks through packets which have a header and payload.
Protocols allow clients and servers to communicate with a known standard.
Sockets are channels of communications between a client and server.

A stream is similar to a waterfall in which data flows between 2 points and streaming data allows data is be accessed as it's transferred rather then recieving all the data before using it. Sites like Netflix use this.