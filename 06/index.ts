// @ts-ignore
const input = await Deno.readTextFile('./input.txt');
const sampleInput = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;


function findUniqueSubstringIndex(str, i = 0) {
  // get the substring of length 4 at index i
  const substring = str.slice(i, i + 14);

  const uniqueCount = new Set(substring).size;

  return uniqueCount === 14 ? i + 14 : findUniqueSubstringIndex(str, i + 1);
};

console.log(findUniqueSubstringIndex(input));