---
title: 'Advent Of Code - Day 4'
date: '2022-12-04'
---

### Part 1
After copying and pasting the usual file handling code, I split up the string given into 2 parts (both ranges of values eg `1-3` and `2-3`). Here I extracted each digit - initally I made the mistake of only extracting the first and last characters however this meant that 2 digit numbers wouldn't work at all so I did some more string splitting to split between the `-`. Last step was checking whether the numbers overlapped one another. My solution is below:

```
const fs = require("fs");

const allFileContents = fs.readFileSync('input.txt', 'utf-8')

let total = 0;

allFileContents.split(/\r?\n/).forEach(function (line) {
    let components = line.split(",");

    let num1 = parseInt(components[0].split("-")[0]);
    let num2 = parseInt(components[0].split("-")[1]);

    let num3 = parseInt(components[1].split("-")[0]);
    let num4 = parseInt(components[1].split("-")[1]);

    if (num1 >= num3 && num1 <= num4 && num2 >= num3 && num2 <= num4) {
        total += 1;
    } else if (num3 >= num1 && num3 <= num2 && num4 >= num1 && num4 <= num2) {
        total += 1;
    }
});
```

### Part 2
Once again this followed on quite nicely from part 1 and simply involved switching from using `&&` within the if statements to `||`!