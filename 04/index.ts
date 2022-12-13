// @ts-ignore
const input = await Deno.readTextFile('./input.txt');



const ranges = input.split('\n');

// find the coordinates of each range
const samplePair = '2-4,6-8';

// count how many of our pairs have one range fully contained within the others

const parsePersonalPair = (rangePair: string) => {
  const [start1, end1, start2, end2] = rangePair
    .match(/(\d+)-(\d*),(\d+)-(\d*)/)
    .slice(1)
    .map(Number);

  return [start1, end1, start2, end2];
};

const checkContaining = ([start1, end1, start2, end2]) =>
  (start1 >= start2 && end1 <= end2) || (start1 <= start2 && end1 >= end2);

const coordinates = ranges.map(parsePersonalPair);
const containing = coordinates.filter(checkContaining);
console.log(containing.length);
