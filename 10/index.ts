const instructions = puzzleInput.split("\n");
const addRegexp = /addx (-?\d+)/;

// create an array of just the x movement values for each cycle
const movements = instructions.reduce(
  (arr, instruction) =>
    addRegexp.test(instruction)
      ? [...arr, 0, Number(instruction.match(addRegexp)[1])]
      : [...arr, 0],
  []
);

// PART 1
const { sum: signalSum } = movements.reduce(
  ({ sum, x }, dx, cycle) => ({
    sum: sum + (cycle % 40 === 19 ? (cycle + 1) * x : 0),
    x: x + dx,
  }),
  { sum: 0, x: 1 }
);


// PART 2
const { screen } = movements.reduce(
  ({ screen, x }, dx, cycle) => {
    const r = Math.floor(cycle / 40);
    const c = cycle % 40;
    const pixel = Math.abs(x - c) < 2 ? "#" : ".";
    return {
      screen: screen.map((line, i) => (i === r ? line + pixel : line)),
      x: x + dx,
    };
  },
  { screen: Array(6).fill(""), x: 1 }
);

