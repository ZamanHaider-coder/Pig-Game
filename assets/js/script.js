'use strict';

const p1score = document.getElementById('score--0');
const p2score = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const p1CurrentScore = document.getElementById('current--0');
const p2CurrentScore = document.getElementById('current--1');
const p1 = document.querySelector('.player--0');
const p2 = document.querySelector('.player--1');

// Declare variable.
let currentScore, activePlayer, score, playing;

// First Conditions.
const init = () => {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;

  p1score.textContent = 0;
  p2score.textContent = 0;
  p1CurrentScore.textContent = 0;
  p2CurrentScore.textContent = 0;

  diceEl.classList.add('hidden');
  p1.classList.remove('player--winner');
  p2.classList.remove('player--winner');
  p1.classList.add('player--active');
  p2.classList.remove('player--active');
};
init();

// Switch Player Functionality
const switchPlayer = () => {
  if (playing) {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    p1.classList.toggle('player--active');
    p2.classList.toggle('player--active');
  }
};

// Rolling dice Functionality
let rollingDice = () => {
  if (playing) {
    // Random number for dice upto 6.
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice number.
    diceEl.classList.remove('hidden');
    diceEl.src = `./assets/images/dice-${dice}.png`;

    // Check Dice number is 1.
    if (dice !== 1) {
      // If not 1 then add the dice number to current score.
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Change Player
      switchPlayer();
    }
  }
};

// Hold Button functionality.
const holdScore = () => {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
};

let keyRollDice = e => {
  if (e.key === 'r') {
    rollingDice();
  }
};

let keyHoldScore = e => {
  if (e.key === 'h') {
    holdScore();
  }
};

// Calling Functions.
btnNew.addEventListener('click', init);
btnHold.addEventListener('click', holdScore);
btnRoll.addEventListener('click', rollingDice);
document.addEventListener('keydown', keyRollDice);
document, addEventListener('keydown', keyHoldScore);
