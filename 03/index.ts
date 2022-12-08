// @ts-ignore
const input = await Deno.readTextFile('./input.txt');
const rucksacks = input.split('\n');

const sampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp`;

// split them all in two?
// const types = sampleInput.split('\n').map(splitStringInTwo)

function findCommonItems(rucksack) {
  const halfIndex = rucksack.length / 2;
  const [firstHalf, secondHalf] = [
    rucksack.slice(0, halfIndex),
    rucksack.slice(halfIndex),
  ];
  const firstHalfSet = new Set(firstHalf);
  const commonItem = [...secondHalf].find((item) => firstHalfSet.has(item));
  return commonItem;

}

// assign each common character a priority code
function getItemPriorityCode(item: string) {
  return item.charCodeAt(0) >= 65 ? item.charCodeAt(0) - 96 : item.charCodeAt(0) - 38;
}



// find which characters of the second half are also in the first half
console.log(getItemPriorityCode(findCommonItems(sampleInput)))


