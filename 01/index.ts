// @ts-ignore
const text = await Deno.readTextFile('./input.txt');
const numbers = text.split('\n\n').map((x) => x.split('\n').map(Number));
let totals: number[] = [];
for (const [index, _] of numbers.entries()) {
  const sums = numbers[index].reduce((a, b) => a + b);
  totals.push(sums);
}

const topAmount = Math.max(...totals);
const secondHighest = Math.max(
  ...totals.filter((element) => element !== topAmount)
);
const thirdHighest = Math.max(
  ...totals.filter((counts) => counts !== secondHighest && counts !== topAmount)
);
console.log(topAmount + secondHighest + thirdHighest); // 209481
