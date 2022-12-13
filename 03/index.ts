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
  return item.charCodeAt(0) - (/[a-z]/.test(item) ? 96 : 38);
}

const commonItems = rucksacks
  .map(findCommonItems)
  .map(getItemPriorityCode)
  .reduce((a, b) => a + b, 0);
// part 2

/* 
 divide the rucksacks into groups of 3
 find the common item for each group of 3
*/

function findGroupsOfThree(array) {
  return array.length
    ? [array.slice(0, 3), ...findGroupsOfThree(array.slice(3))]
    : [];
}

function findCommonItemsInGroupsOfThree(group) {
  const [firstGroup, secondGroup, thirdGroup] = [group[0], group[1], group[2]];
  const [set1, set2] = [new Set(firstGroup), new Set(secondGroup)];
  const commonItem = [...thirdGroup].find(
    (item) => set1.has(item) && set2.has(item)
  );
  return commonItem;
}

const threeLines = findGroupsOfThree(rucksacks);
const commonByThirds = threeLines
  .map(findCommonItemsInGroupsOfThree)
  .map(getItemPriorityCode)
  .reduce((a, b) => a + b, 0);


// const everyThree = rucksacks
//   .map(findGroupsOfThree)
//   .map(getItemPriorityCode)
//   .reduce((a, b) => a + b, 0);
