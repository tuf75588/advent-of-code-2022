// @ts-ignore
const input = await Deno.readTextFile("./input.txt");

//! opponent
// A is rock
// B is paper
// C is scissors

//! our moves
// X is rock
// Y is paper
// Z is scissors

const gameValues = {
  A: { X: 3, Y: 6, Z: 0 },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 },
};

// break up scores by newline into an array
const moreValues = { X: 1, Y: 2, Z: 3 };

// write a function to get the game score and move score of a game

function getScore(game) {
  const [opponentMove, yourMove] = game.split(" ");
  const gameScore = gameValues[opponentMove][yourMove];

  const moveScore = moreValues[yourMove];

  return gameScore + moveScore;
}

function add(x, y) {
  return x + y;
}

const games = input.split("\n");
const scores = games.map(getScore).reduce(add);

console.log(scores);
