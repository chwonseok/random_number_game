'use strict';
// DOM: Document Object Model
const page = document.querySelector('body'),
  checkBtn = document.querySelector('.check'),
  message = document.querySelector('.message'),
  range = document.querySelector('.max-range'),
  maxNum = document.querySelector('.max-number'),
  secretNumber = document.querySelector('.number'),
  guess = document.querySelector('.guess'),
  score = document.querySelector('.score'),
  again = document.querySelector('.again'),
  highscore = document.querySelector('.highscore');

let number = Math.trunc(Math.random() * 20) + 1;
let initScore = 20;
let highScore = 0;

function changeStyle(pageColor, numWidth) {
  page.style.backgroundColor = pageColor;
  secretNumber.style.width = numWidth;
}

function resetGame() {
  setNumber();
  changeStyle('#222', '12rem');
  setContent(score, initScore);
  setContent(secretNumber, '?');
  setContent(message, 'Try to guess...');
  checkBtn.style.display = 'block';
  initScore = 20;
  guess.value = '';
}

function setContent(dom, msg) {
  dom.textContent = msg;
}

function setNumber() {
  number = Math.trunc(Math.random() * maxNum.textContent) + 1;
}

function playGame() {
  const guess = +document.querySelector('.guess').value;

  if (!guess) setContent(message, '👈🏻 Input your guess first!');
  // Success to guess
  else if (guess === number) {
    setContent(secretNumber, number);
    setContent(message, '🥳 You won! 🎉');
    changeStyle('#60b347', '24rem');

    checkBtn.style.display = 'none';

    if (initScore > highScore) {
      highScore = initScore;

      setContent(highscore, highScore);
    }
  } else if (guess !== number && initScore > 0) {
    initScore--;
    setContent(score, initScore);
    setContent(message, guess > number ? 'Too High!' : 'Too Low!');
  }

  initScore === 0 ? setContent(message, '...You Lost...') : '';
}

checkBtn.addEventListener('click', playGame);
range.addEventListener('input', setNumber);
again.addEventListener('click', resetGame);
