
const sampleInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

const [stackPart, instructionsPart] = sampleInput.split('\n\n');
// represent the stacks as an array of strings


const stackRows = stackPart.split('\n').slice(0, -1);
const stackMatrix = stackRows.map((row) => [...row].filter((_, i) => i % 4 === 1));


const howManyStacks = stackMatrix[0].length;
const stack = Array(howManyStacks).fill('');

// for (let i = 0; i < stackMatrix.length; i++) {
//   for (let j = 0; j < stackMatrix[0].length; j++) {
//     const char = stackMatrix[i][j];
//     if (char !== ' ') {
//       stack[j] += char;
//     }
//   }
// }

const stacks = stackMatrix.reduce((
  (arr, row) =>
    row.reduce(
      (innerArr, char, j) => {
        return char === ' '
          ? innerArr
          : innerArr.map((str, k) => (j === k ? str + char : str))
      }, arr)

), Array(howManyStacks).fill(" "))






























