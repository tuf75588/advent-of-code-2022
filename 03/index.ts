// @ts-ignore
const input = await Deno.readTextFile('./input.txt');

// split them all in two?
const types = input.split('\n').map((element) => {
  const firstPart = element.slice(0, element.length / 2);
  const secondPart = element.slice(element.length / 2);
  console.log(firstPart.split('').includes('a'))
});
