// @ts-ignore
const input = await Deno.readTextFile('./input.txt');
//! opponent
// A is rock
// B is paper
// C is scissors

//! our moves
// X is rock
// Y is paper
// Z is scissors

interface GameValues {
  A: { X: number; Y: number; Z: number };
  B: { X: number; Y: number; Z: number };
  C: { X: number; Y: number; Z: number };
}

type MoreValues = {
  X: number;
  Y: number;
  Z: number;
};

const gameValues: GameValues = {
  A: { X: 3, Y: 6, Z: 0 },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 },
};

// break up scores by newline into an array
const moreValues: MoreValues = { X: 1, Y: 2, Z: 3 };

// write a function to get the game score and move score of a game

function getScore(game: string): number {
  const [opponentMove, yourMove]: string[] = game.split(' ');
  const gameScore = gameValues[opponentMove][yourMove];

  const moveScore = moreValues[yourMove];

  return gameScore + moveScore;
}

function add(x: number, y: number) {
  return x + y;
}

const games = input.split('\n');
const scores = games.map(getScore).reduce(add);

/* 
PART 2
*/

/* 
X is lose
Y is draw
Z is win
*/

const requiredMoves = {
  A: { X: 'S', Y: 'R', Z: 'P' },
  B: { X: 'R', Y: 'P', Z: 'S' },
  C: { X: 'P', Y: 'S', Z: 'R' },
};

const actualMoveValues = { R: 1, P: 2, S: 3 };
const actualGameValues = { X: 0, Y: 3, Z: 6 };

function getActualScore(game) {
  const [opponentMove, gameOutcome] = game.split(' ');

  const yourMove = requiredMoves[opponentMove][gameOutcome];

  const gameScore = actualGameValues[gameOutcome];

  const moveScore = actualMoveValues[yourMove];

  return gameScore + moveScore;

}


const actualGames = input.split('\n');
const actualScores = games.map(getActualScore).reduce(add);
console.log(actualScores);