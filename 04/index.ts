// @ts-ignore
// const input = await Deno.readTextFile('./input.txt');

const sampleInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const ranges = sampleInput.split("\n");

// find the coordinates of each range
const samplePair = "2-4,6-8";

// count how many of our pairs have one range fully contained within the others

const parsePersonalPair = (rangePair: string) => {
  const [start1, end1, start2, end2] = rangePair.match(
    /(\d+)-(\d*),(\d+)-(\d*)/
  ).slice(1).map(Number);

  return [start1, end1, start2, end2];
};

console.log(parsePersonalPair(samplePair))