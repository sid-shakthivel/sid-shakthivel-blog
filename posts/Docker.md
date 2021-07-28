---
title: 'Docker & Containers'
date: '2021-07-06'
---

Docker is a platform that allows developers to containerize an application. What are containers? Containers are essentially a runtime environment - they have their own OS, CPU, and RAM share and are fast, light, and isolated. Containers package your application, dependencies, and any thing else required into one package of sorts. Docker solves the problem of `it works on my machine`; all developers use the same environment so the same version off all dependencies are used. Furthermore, containers can be shipped onto production.

Containers aren't new and are similar to virtual machines. A virtual machine is a computing environment of sorts which functions as a computer running a different operating system. You can configure how much RAM, CPU cores, Storage it uses as well. The problem with virtual machines is that they are rather slow compared to containers. Virtual machines virtualises hardware while docker virtualises the OS. To run a virtual machine, one needs a hypervisors this divides and virtually shares the computers resources. Each virtual machine has it's own kernel, and full OS. With docker, containers don't need their own kernel; they rely on the hosts kernel. This is why you can't run a windows container on a mac - they use completely different kernels.
Interestingly, if you're on windows you get both the native windows docker engine, and a linux OS docker engine running in a virtual machine.

Next concepts to understand are dockerfiles, images, and containers. A dockerfile is a blueprint for an image. An image is a template for a container, and a container is a running instance of an image. It's rather confusing, a dockerfile contains all information for how you want your image to be built - what os? what files should it have? what dependencies? We'll go over this in more detail later. An image is the result of a dockerfile - it contains the set of instructions on how to build a container. From here we can instantiate this image and make lot's of containers.

You can pull down pre-made images from docker hub (hub.docker.com). Having installed docker, run `docker pull ubuntu` - great, you've just pulled down an image. Note that this image has it's own dockerfile that served as it's blueprint. The docker `run` command is used to create a container from an image and start up a container. It has some interesting options `--name` is used to set a name for your container, and `-d` is used to start the container in detached mode (runs in the background). Option `-i` keeps the STDIN open even if not attached, and '-t' allocates a pseudo TTY for the process. A pseudo TTY is software that emulates real terminal hardware - it handles input and output the same way a physical device would. This pseudo TTY allows us to interact directly with the container similar to ssh or telnet. The `-p` option is also powerful it allows you to map certain ports eg `-p 80:8080` maps port `80` of the host to port `8080` of the container.
And `--rm` deletes the container once it's finished running. Try running the command `docker run -dt --name ubuntulinux ubuntu`. Your container has been created and is running!

To actually interact with your container you'll want to run `docker exec -it ubuntulinux bash` - this starts a bash session within a directory of your container where you can execute various commands. Note the `-it` specifies the bash shell will be interactive (you can send and receive commands). You can also just run one command (no real interaction) - eg `docker exec ubuntulinux ls` - that just runs the ls command in your container.

As you work with docker you'll want to manage your containers - `docker ps` lists all containers that are running, `docker ps -a` lists all containers (even if they're not running). From here you can pipe the result using grep eg `docker ps -a | grep ubuntu` for example. Starting stopping, and deleting containers is intuitive - `docker start ubuntulinux` `docker stop ubuntulinux`, and `docker rm ubuntulinux` - note that to start and stop containers you can also use their container id eg `docker start 30ab1cb39d01`. Also you can manage images in a similar fashion - `docker image ls, and `docker image rm`.

Now we'll move on onto how to write a dockerfile. It's best to show you an example and explain from there.

```
FROM ubuntu

RUN apt-get update &&  apt-get install nodejs -y && apt-get install npm -y

WORKDIR /app

COPY package*.json ./

RUN npm-install

COPY . .

EXPOSE 8080

CMD ["node", "app.js"]
```

The `FROM` keyword specifies what docker image we're starting off with - in our case ubuntu. This means we are working with a fresh ubuntu container. Next we we use the `RUN` command - this can essentially run a command you want. We need to install node and npm since this is a fresh ubuntu image. Next we set the working directory via `WORKDIR`. This is where all our code will be packaged. The `COPY` command copies whatever you want from your local project into the container. `EXPOSE` exposes a port so we can map it to another port on the host machine. Finally, the `CMD` command allows you to specify a default command - this is what will be executed when you run the container without specifying a command. If you don't do either nothing will run! This is just a dockerfile, remember that dockerfiles are blueprints for images, to build an image you simply run `docker build -t newdockerimage .` builds a new docker image called `newdockerimage` using the dockerfile in the current directory. The `-t` flag allows you to set a name for your image. Also it's important to note that similar to a .gitignore file, you can make a `.dockerignore` file which contains anything you don't want docker to copy over. This could be node modules in a node js project!

Well that is docker in a nutshell. It's not that complex once you get the hang of using the commands!
