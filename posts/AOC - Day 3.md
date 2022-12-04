---
title: 'Advent Of Code - Day 3'
date: '2022-12-03'
---

### Part 1

Today's puzzle involved yet again more file handling/parsing. Essentially it involved parsing each line, splitting that line into an array and checking whether that array contained another value within the other array (finding duplicates). Each letter had an offset and I calculated this by subtracting it's ascii value from the base ascii value eg `a` for lowercase which is 97 (but 96 in this case due to the range being from 1-27) and `A` which is 65 but 1 lower again for the same reason. 

```
// Part 1
allFileContents.split(/\r?\n/).forEach(function (line) { 
    let firstComponent = line.substring(0, line.length / 2);
    let secondComponent = line.substring(line.length / 2, line.length);
    let firstComponentArray = firstComponent.split("");
    let secondComponentArray = secondComponent.split("");

    for (let i = 0; i < firstComponentArray.length; i++) {
        if (secondComponentArray.includes(firstComponentArray[i])) {            
            if (firstComponentArray[i] == firstComponentArray[i].toUpperCase()) {
                // Uppercase
                total += firstComponentArray[i].charCodeAt(0) - 64;
                total += 26;
            } else {
                // Lowercase
                total += firstComponentArray[i].charCodeAt(0) - 96;
            }
            break;
        }
    }
});
```

### Part 2

The solution is largely similar to the first one however this involved dealing with multiple lines (namely 3) and checking whether ranges within those 3 were inside the others.
```
const allFileContents = fs.readFileSync('input.txt', 'utf-8');

let total = 0;

let lines = allFileContents.split(/\r?\n/);

for (let i = 0; i < lines.length; i += 3) {
    let firstSack = lines[i].split("");
    let secondSack = lines[i + 1].split("");
    let thirdSack = lines[i + 2].split("");

    for (let i = 0; i < firstSack.length; i++) {
        if (secondSack.includes(firstSack[i]) && thirdSack.includes(firstSack[i])) {
            if (firstSack[i] == firstSack[i].toUpperCase()) {
                // Uppercase
                total += firstSack[i].charCodeAt(0) - 64;
                total += 26;
            } else {
                // Lowercase
                total += firstSack[i].charCodeAt(0) - 96;
            }
            break;
        }
    }
}
```