---
title: 'A introduction to Next.js'
date: '2020-10-11'
---

Next.js is a react framework, allowing you to write react on the server. It allows developers to use both static and server rendering.

-   Static Generation is where HTML is generated at build time and then reused on requests. This is useful for a site which does not have dynamic content like a blog.

-   Server-side rendering is where the HTML is generated per request - this is good for a dashboard where user information is different for each client.

Dynamic routing is another interesting feature - you can get multiple pages of the same format with different data. The cool thing is if you just make more data, you can get more pages that are exactly the same. This is useful for blogs.

Sites can run faster with client side routing, when a user clicks a route, its handled by javascript that is loaded on the page, the URL changes however there is no request to the server. This means that routing between pages is faster, however the whole site needs to be loaded on the first request - therefore it takes longer to initially load.

If you haven't heard of css modules, you should pay attention to this, they allow you to write conventional css with a twist. When defining styles for a component you can make sure only a certain bit of css works for each component and you can write custom names for your modules of css! Next.js supports this out of the box.

```
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}
```

This is an example of a module of css.

You use it like this:

```
<header className={styles.header}>
</header>
```

Finally, your development environment supports Fast Refresh meaning as soon as you make a change to your code your site updates automatically so you can relish in the result (hopefully).

All the code for this website is available at: https://github.com/sid-shakthivel/nextjs-blog