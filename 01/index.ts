// @ts-ignore
const text = await Deno.readTextFile("./input.txt");
const numbers = text.split("\n\n").map((x) => x.split("\n").map(Number));
let totals: number[] = [];
for (const [index, _] of numbers.entries()) {
  const sums = numbers[index].reduce((a, b) => a + b);
  totals.push(sums);
}
const topAmount = Math.max(...totals);
const topThree = totals
  .sort((a, b) => {
    return b - a;
  })
  .slice(0, 3)
  .reduce((a, b) => a + b);

console.log(topThree);
