---
title: 'Core Data'
date: '2022-11-27'
---

Core data allows an app to save persistent data on device which makes it accessible whenever the app is used which can be useful for offline acess. It's a rather old framework which was first created in 2005. Whilst core data isn't a database, it manages an applications `object graph`. Whats an object graph? Simply a collection of objects which are connected with one another. Within the `MVC` model, Core Data falls under `M` where models are defined. 

A data model defines how the data Core Data should store. Entities can be defined which are similar to classes and attributes can be added (like properties). Relationships can be defined between entities.

To setup a core data stack, you must intialise it by creating a `NSPersistentContainer` which is a data type responsible for loading a data model and providing access. To actually load the data from the db, the `loadPersistentStores` function must be called. To actually use the stored data, a `managed object context` must be used as it's faster and this can be saved for it to be persistent. To work with core data fetch requests and embed the data directly into views, `@FetchRequest` must be used and it takes a parameter called `sortDescriptors` which is used to sort the data (by default no sorting is applied). 