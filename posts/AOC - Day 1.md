---
title: 'Advent Of Code - Day 1'
date: '2022-12-01'
---

### What is the Advent of Code?
The advent of code is like a normal advent calendar but for programmers in which a new coding task which should oocupy you for 30 minutes is released every day. If I can keep up, hopefully, I'll release my solution to the current days problem.

### Part 1
This was a rather simplistic problem although I made the mistake of assuming the practise list embedded within the task was the data set however once signing in there was an actual txt file with data.

```
const allFileContents = fs.readFileSync('input.txt', 'utf-8');
let largest = 0;
let tempSum = 0;

allFileContents.split(/\r?\n/).forEach(function(line) {
	if (line === "") {
		if (tempSum > largest) {
			largest = tempSum;
		}
		tempSum = 0;
	} else {
		tempSum += parseInt(line)
	}
});
console.log(largest);
```
Essentially, you need to loop through the file line by line, and add up the numbers - each elf is separated by a `""`.

### Part 2
```
let elfCalorieCount = [];
allFileContents.split(/\r?\n/).forEach(function(line, i) {
	if (line === "") {
		elfCalorieCount.push(tempSum);
		tempSum = 0;
	} else {
		tempSum += parseInt(line)
	}
});

elfCalorieCount.sort(function(a, b) {
	return a - b;
});

console.log(elfCalorieCount[elfCalorieCount.length - 1] + elfCalorieCount[elfCalorieCount.length - 2] + elfCalorieCount[elfCalorieCount.length - 3]);
```

Once again, all I do is loop through the input, make an array of each elf calorie count and add up the last 3 entries by sorting the array.

Whilst my solutions aren't the best neither are efficient, I tried to solve these problems in the simplest way possible in the fastest time I can.