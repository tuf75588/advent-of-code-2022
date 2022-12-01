// @ts-ignore
const text = await Deno.readTextFile('./input.txt');
const numbers = text.split('\n\n').map(x => x.split('\n').map(Number));
let totals: number[] = []
for (const [index, _] of numbers.entries()) {
  const sums = numbers[index].reduce((a,b) => a + b);
  totals.push(sums);  
}
console.log(Math.max(...totals)); // 74711
