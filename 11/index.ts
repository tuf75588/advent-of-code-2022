// @ts-ignore
const input = await Deno.readTextFile("./input.txt");


// @ts-ignore
function coordsToHash(x, y) {
  return 1e5 * x + y;
}

function hashToCoords(hash) {
  return [Math.floor(hash / 1e5), hash % 1e5];
}

const rows = input.split("\n");

// create a matrix replacing "S" and "E" with "a" and "z" respectively
const matrix = rows.map((row) => {
  return [...row].map((char) => {
    if (char === "S") return "a";
    if (char === "E") return "z";
    return char;
  });
});
