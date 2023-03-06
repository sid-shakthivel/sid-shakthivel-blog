---
title: 'More on ERA'
date: '2022-11-26'
---

There were a couple of other features that I wanted to implement within ERA on popular demand. The first step was to include features to modify line and letter spacing which can be useful for some people. Another request was to only highlight important words within sentences. The way I went about this was to use natural language processing to determine important words like nouns, verbs, etc and only bolden these words. 

Another key issue was saving documents. Currently I used `TextEditor` however this was giving rather strange results and bugs including the entire app crashing or simply issues when saving back to coredata. I ended up using `TextField` and specifying the `axis: .vertical` specifically to fix this strange bug and it ended up looking a lot cleaner then my `TextEdtior` implementation. To save documents I added a specific button and for it to autosave as you exited the document. I had used a previous method to save settings too.

Another issue was not being able to draw upon the image but this was an easy fix as all that was needed was to add another canvas and store another set of data values relating to this canvas. 

After conducting market research, users seemed to have difficuly in determining what different symbols. The options were to either make an inital tutorial which seemed rather challenging or to make a short information page with a list of symbols and what they did. 

I had never really build such a complex application before thus adding dark mode was an interesting challenge - it resulted in a number of methods which would invert colours and would set colours depending on whether the global environmental variable was set. Data flow is a rather interesting problem within swift.

The app is available here: https://apps.apple.com/gb/app/era-easy-reading-assistant/id6444321235