const input = await Deno.readTextFile('./input.txt');


const [stackPart, instructionsPart] = input.split('\n\n');
// represent the stacks as an array of strings

const stackRows = stackPart.split('\n').slice(0, -1);
const stackMatrix = stackRows.map((row) =>
  [...row].filter((_, i) => i % 4 === 1)
);

const howManyStacks = stackMatrix[0].length;
const initialStacks = stackMatrix.reduce(
  (arr, row) =>
    row.reduce((innerArr, char, j) => {
      return char === ' '
        ? innerArr
        : innerArr.map((str, k) => (j === k ? str + char : str));
    }, arr),

  Array(howManyStacks).fill('')
);

function reverse(string) {
  return [...string].reverse().join('');
}

function moveCrates(stacks, amount, from, to) {
  return stacks.map((stack, i) => {
    return i === from - 1
      ? stack.slice(amount)
      : i === to - 1
      ? reverse(stacks[from - 1].slice(0, amount)) + stack
      : stack;
  });
}


const multiMoveCrates = (stacks, amount, from, to) =>
  stacks.map((stack, i) =>
    i === from - 1
      ? stack.slice(amount)
      : i === to - 1
      ? stacks[from - 1].slice(0, amount) + stack
      : stack
  );


const convertInstruction = (instructionStr) => {
  const [amount, from, to] = instructionStr
    .match(/move (\d+) from (\d+) to (\d+)/)
    .slice(1)
    .map(Number);
  return [amount, from, to];
};

const instructions = instructionsPart.split('\n').map(convertInstruction);

const finalStacks = instructions.reduce(
  (stacks, [amount, from, to]) => moveCrates(stacks, amount, from, to),
  initialStacks
);

const stackTops = finalStacks.map((stack) => stack[0]).join("");

// PART 2

const finalStacks2 = instructions.reduce(
  (stacks, [amount, from, to]) => multiMoveCrates(stacks, amount, from, to),
  initialStacks
);

const stackTops2 = finalStacks2.map((stack) => stack[0]).join("");
console.log(stackTops2);