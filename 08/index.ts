const puzzleInput = `30373
25512
65332
33549
35390`;

const treeInput = await Deno.readTextFile("./input.txt");
const coordsToHash = (r, c) => r * 1e5 + c;
const matrix = treeInput.split("\n").map((row) => [...row]);
const [n, m] = [matrix.length, matrix[0].length];

const findVisible = (matrix, r, c, dr, dc, tallest = -1) => {
  return r in matrix && c in matrix[0]
    ? matrix[r][c] > tallest
      ? new Set([
          ...findVisible(matrix, r + dr, c + dc, dr, dc, matrix[r][c]),
          coordsToHash(r, c),
        ])
      : findVisible(matrix, r + dr, c + dc, dr, dc, tallest)
    : new Set();
};

const allVisibleTreesSet = matrix.reduce(
  (horizontalSet, _, r, matrix) =>
    // visible from horizontal edges
    new Set([
      ...horizontalSet,
      ...findVisible(matrix, r, 0, 0, 1),
      ...findVisible(matrix, r, m - 1, 0, -1),
      ...matrix[r].reduce(
        (verticalSet, _, c) =>
          // visible from vertical edges
          new Set([
            ...verticalSet,
            ...findVisible(matrix, 0, c, 1, 0),
            ...findVisible(matrix, n - 1, c, -1, 0),
          ]),
        new Set()
      ),
    ]),
  new Set([])
);

const howManyVisible = allVisibleTreesSet.size;
console.log(howManyVisible);

/* part 2 */

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
