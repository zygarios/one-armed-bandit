const resultScreen = document.querySelector('.result-screen');

const arm = document.querySelector('.arm');
const armSpan = document.querySelector('.arm-span');

const cards = document.querySelectorAll('.card');

const input = document.querySelector('.set-deal');
const winsSpan = document.querySelector('.wins');
const losesSpan = document.querySelector('.loses');
const gamesSpan = document.querySelector('.games');
const lastDrawSpan = document.querySelector('.last-draw');
const cashSpan = document.querySelector('.cash');
let cards1Li = document.querySelectorAll('#card-1 li');
let cards2Li = document.querySelectorAll('#card-2 li');
let cards3Li = document.querySelectorAll('#card-3 li');
const gate = document.querySelector('.gate');
const gateText = document.querySelector('.gate-text');
const gateSubtext = document.querySelector('.gate-subtext');
const reset = document.querySelector('.reset');

const coinsFall = document.querySelector('.coins-fall-win');
const coinsReward = document.querySelector('.coins-win');
const lightsTop = document.querySelectorAll('.result .lights span');
const lightsBottom = document.querySelectorAll('.game-board .lights span');

let cardUl = document.querySelectorAll('.card ul');
let isGameOver = true;
let isMachineWorks = false;
let inputValue;
let stats = {
  wins: 0,
  loses: 0,
  games: 0,
  lastDraw: 0,
  money: 1000
};
const timeGameOverScreen = 1500;
const timeRoll = 2000;
const timeRewardAnim = 4000;

const availableCards = ['pineapple.png', 'kiwi.png', 'lemon.png'];

const screenAlert = input => {
  resultScreen.textContent = input;
  resultScreen.classList.add('alert');
  setTimeout(() => {
    resultScreen.classList.remove('alert');
    resultScreen.textContent = "Let's play!";
  }, 1000);
};

const gameOver = () => {
  gate.style.transform = 'translateY(0)';
  gateText.textContent = 'GAME OVER!';
  gateSubtext.innerHTML = `You lost all money!`;
  reset.textContent = 'Start again with 100$';
  isGameOver = true;
};

const fillSpans = (result = 0) => {
  winsSpan.textContent = stats.wins;
  losesSpan.textContent = stats.loses;
  gamesSpan.textContent = stats.games;
  if (result === 0) {
    lastDrawSpan.style.color = 'rgb(0, 0, 0)';
    lastDrawSpan.textContent = `${stats.lastDraw}$`;
  } else if (result) {
    lastDrawSpan.style.color = 'rgb(0, 200, 0)';
    lastDrawSpan.textContent = `+${stats.lastDraw}$ (${stats.lastDraw / 3}$)`;
    screenAlert('You win!');
  } else if (!result) {
    lastDrawSpan.style.color = 'rgb(200, 0, 0)';
    lastDrawSpan.textContent = `-${stats.lastDraw}$`;
    screenAlert('You lost...');
  }
  cashSpan.textContent = stats.money + '$';
};

const liCreator = () => {
  cardUl.forEach(ul => {
    const liElement = ul.children[ul.children.length - 1];
    ul.style.transition = 'none';
    ul.innerHTML = '';
    ul.append(liElement);
    ul.style.bottom = '0';
    setTimeout(() => {
      ul.style.transition = 'bottom 2s ease';
    }, 100);
  });
};

const animReward = () => {
  coinsReward.parentNode.style.filter = 'brightness(135%)';
  coinsReward.classList.add('active-anim');
  coinsFall.classList.add('active-anim');
  let topTime = 35;
  lightsTop.forEach(item => {
    item.classList.remove('light-active');
    setTimeout(() => {
      console.log(item.classList);
      item.classList.add('light-active');
    }, topTime);
    topTime += 35;
  });
  lightsBottom.forEach(item => {
    item.classList.remove('light-active');
    setTimeout(() => {
      item.classList.add('light-active');
    }, topTime);
    topTime += 35;
  });
  setTimeout(() => {
    coinsReward.classList.remove('active-anim');
    coinsFall.classList.remove('active-anim');
    coinsReward.parentNode.style.filter = 'brightness(100%)';
    isMachineWorks = true;
  }, timeRewardAnim);
};

const setStats = result => {
  if (result) {
    stats.wins++;
    stats.games++;
    stats.lastDraw = inputValue * 3;
    stats.money += inputValue * 3;
  } else {
    stats.loses++;
    stats.games++;
    stats.lastDraw = inputValue * 1;
    stats.money -= inputValue * 1;
  }
  fillSpans(result);
  liCreator();

  if (stats.money <= 0) {
    setTimeout(() => {
      gameOver();
    }, 2000);
  } else if (result) {
    animReward();
  } else {
    isMachineWorks = true;
  }
};

const handleResultCheck = () => {
  cards1Li = document.querySelectorAll('#card-1 li');
  cards2Li = document.querySelectorAll('#card-2 li');
  cards3Li = document.querySelectorAll('#card-3 li');
  if (
    cards1Li[cards1Li.length - 1].dataset.index ===
      cards2Li[cards2Li.length - 1].dataset.index &&
    cards2Li[cards2Li.length - 1].dataset.index ===
      cards3Li[cards3Li.length - 1].dataset.index
  ) {
    setStats(true);
  } else {
    setStats(true);
  }
};

const drawRandomItems = () => {
  cardUl.forEach(ul => {
    const randomNumberDraw = Math.floor(Math.random() * 9 + 40);
    let indexDraw = Math.floor(Math.random() * availableCards.length);
    let liArray = [];
    for (let i = 0; i < randomNumberDraw; i++) {
      if (indexDraw === availableCards.length) indexDraw = 0;
      const li = document.createElement('li');
      li.style.backgroundImage = `url('${availableCards[indexDraw]}')`;
      li.dataset.index = indexDraw;
      liArray.push(li);
      indexDraw++;
    }
    ul.append(...liArray);
    const height = parseInt(getComputedStyle(ul.children[0]).height);
    ul.style.bottom = height * liArray.length + 'px';
  });

  setTimeout(handleResultCheck, timeRoll);
};

const handleGameStart = () => {
  if (isGameOver) {
    screenAlert('Click Reset');
    return;
  } else if (!isMachineWorks) {
    return;
  }
  isMachineWorks = false;
  inputValue = input.value;
  input.value = '';
  if (inputValue > stats.money) {
    screenAlert('No money');
    isMachineWorks = true;
    return;
  } else if (inputValue == '') {
    screenAlert('Empty value');
    isMachineWorks = true;
    return;
  } else if (inputValue == stats.money) {
    screenAlert('Va banque!');
  }

  resultScreen.textContent = inputValue + '$';
  armSpan.classList.add('arm-clicked');
  setTimeout(() => {
    armSpan.classList.remove('arm-clicked');
  }, timeRoll);
  drawRandomItems();
};

const resetGame = () => {
  screenAlert('1000$ for you!');
  gate.style.transform = 'translateY(100%)';
  stats = {
    wins: 0,
    loses: 0,
    games: 0,
    lastDraw: 0,
    money: 1000
  };

  setTimeout(() => {
    fillSpans();
    isGameOver = false;
    isMachineWorks = true;
  }, timeGameOverScreen);
};

cashSpan.textContent = stats.money + '$';
reset.addEventListener('click', resetGame);
arm.addEventListener('click', handleGameStart);

window.addEventListener('mousemove', e => {
  console.log(e.clientX);
  console.log(e.clientY);
  const ball = document.querySelector('.arm-span::after');
  console.log(ball);
});
