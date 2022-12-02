---
title: 'Advent Of Code - Day 2'
date: '2022-12-02'
---

### Part 1

Todays coding question involved more file handling and was essentially building a rock paper scissors game with scoring. I was slightly confused with the letters and what they represented but I eventually got the answer and below is my solution.

```
const allFileContents = fs.readFileSync('input.txt', 'utf-8');

  

// Part 1
let total = 0;

allFileContents.split(/\r?\n/).forEach(function(line) {
	const opponentMove = line.charAt(0);
	const ourMove = line.charAt(line.length - 1);
	
	switch (ourMove) {
		case "X": // Rock
			if (opponentMove == "A") { // Rock
				total += 3;
			} else if (opponentMove == "C") { // Scissors
				total += 6;
			}
			total += 1;
			break;
		case "Y":
			if (opponentMove == "A") {
				total += 6;
			} else if (opponentMove == "B") {
				total += 3;
			}
			total += 2;
			break;
		case "Z":
			if (opponentMove == "B") {
				total += 6;
			} else if (opponentMove == "C") {
				total += 3;
			}
			total += 3;
			break;
	}
});
```

### Part 2
This continued the theme however, the new rule made the letters `XYZ` stand for the 3 outcomes of the game (win, lose, draw). My solution is below:

```
allFileContents.split(/\r?\n/).forEach(function (line) {
    const opponentMove = line.charAt(0);
    const roundEnd = line.charAt(line.length - 1);

    // X - Lose, Y - Draw, Z - Win
    switch (opponentMove) {
        case "A": // Rock
            switch (roundEnd) {
                case "X":
                    // Must play Scissors (Lose)
                    total += 3;
                    break;
                case "Y":
                    // Must play Rock (Draw)
                    total += 3;
                    total += 1;
                    break;
                case "Z":
                    // Must play Paper (Win)
                    total += 6;
                    total += 2;
                    break;
            }
            break;
        case "B": // Paper
            switch (roundEnd) {
                case "X": 
                    // Must play Rock (Lose)
                    total += 1;
                    break;
                case "Y":
                    // Must play Paper (Draw)
                    total += 3;
                    total += 2;
                    break;
                case "Z":
                    // Must play Scissors (Win)
                    total += 6;
                    total += 3;
                    break;
            }
            break;
        case "C": // Scissors
            switch (roundEnd) {
                case "X": 
                    // Must play Paper (Lose)
                    total += 2;
                    break;
                case "Y":
                    // Must play Scissors (Draw)
                    total += 3;
                    total += 3;
                    break;
                case "Z":
                    // Must play Rock (Win)
                    total += 6;
                    total += 1;
                    break;
            }
            break;
    }

    console.log(total);
});
```