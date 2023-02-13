import calculateWinner from './calculateWinner';
import { player } from '../components/TicTacToe';

export const makeCpuMove = (mode: string, squares: any[], setSquares: Function, setTurn: Function, setYouIsNext: Function) => {

  const emptySquares = squares.map((square, index) => square === player.Empty ? index : -1).filter(index => index !== -1);

  let cpuMove: number = 0;

  switch (mode) {
    case 'Easy': {
      cpuMove = easyMode(emptySquares);
      break;
    }
    case 'Medium': {
      cpuMove = mediumMode(emptySquares, squares);
      break;
    }
    case 'Hard': {
      cpuMove = hardMode(emptySquares, squares);
      break;
    }
    default: {
      return;
    }
  }

  const newSquares = [...squares];
  newSquares[cpuMove] = player.CPU;

  setTurn('you');
  setSquares(newSquares);
  setYouIsNext(true);
};


// Difficulty - Easy mode
const easyMode = (emptySquares: number[]) => {
  // randomly select an empty square
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
};

// Difficulty - Medium mode
const mediumMode = (emptySquares: number[], squares: any[]) => {
  // An array to store the possible moves that result in player winning the game
  let moves = [];

  // Loop through each of the empty squares
  for (let i = 0; i < emptySquares.length; i++) {
    const move = emptySquares[i];
    const newSquares = [...squares];

    // Place the player's move on the current empty square
    newSquares[move] = player.You;

    // Check if the player wins the game with the current move
    if (calculateWinner(newSquares) === player.You) {
      // If yes, add the move to the array of possible winning moves
      moves.push(move);
    }
  }

  // If there are any moves that result in player winning the game
  if (moves.length > 0) {
    // Select a random move from the array of winning moves
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
  } else {
    // If no winning moves are found, select a random empty square
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    return emptySquares[randomIndex];
  }
};


// Difficulty - Hard mode
const hardMode = (emptySquares: number[], squares: any[]) => {
  let cpuMove = 0; // variable to store the cpu's move

  let moves = [];// array to store possible moves that would lead to player's victory

  // loop through all empty squares
  for (let i = 0; i < emptySquares.length; i++) {
    const move = emptySquares[i];
    const newSquares = [...squares]; // create a copy of the squares array

    // set the current move as CPU
    newSquares[move] = player.CPU;

    // check if this move leads to CPU's victory
    if (calculateWinner(newSquares) === player.CPU) {
      cpuMove = move;
      break;
    } else {
      // if not, set the current move as player's move
      newSquares[move] = player.You;
      // check if this move leads to player's victory
      if (calculateWinner(newSquares) === player.You) {
        moves.push(move);
      }
    }
  }

  // if CPU has not found a winning move,
  // and player has possible winning moves,
  // choose a random move from player's possible winning moves
  if (cpuMove === 0 && moves.length > 0) {
    const randomIndex = Math.floor(Math.random() * moves.length);
    cpuMove = moves[randomIndex];
  }

  // if CPU has not found a winning move or player's possible winning move,
  // choose a random move from all available empty squares
  if (cpuMove === 0) {
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    cpuMove = emptySquares[randomIndex];
  }
  // return the cpu's move
  return cpuMove;
};
