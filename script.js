const resultScreen = document.querySelector('.result-screen');

const arm = document.querySelector('.arm');
const armSpan = document.querySelector('.arm-span');

const card1 = document.querySelector('#card-1');
const card2 = document.querySelector('#card-2');
const card3 = document.querySelector('#card-3');
const cards = document.querySelectorAll('.card');
const input = document.querySelector('.set-deal');
const winsSpan = document.querySelector('#wins');
const losesSpan = document.querySelector('#loses');
const gamesSpan = document.querySelector('#games');
const lastDrawSpan = document.querySelector('#last-draw');
const cashSpan = document.querySelector('#cash');
let card1Li = document.querySelectorAll('#card-1 li');
let card2Li = document.querySelectorAll('#card-2 li');
let card3Li = document.querySelectorAll('#card-3 li');
let isMachineWorks = true;
let inputValue;
let stats = {
  wins: 0,
  loses: 0,
  games: 0,
  lastDraw: 0,
  money: 0
};

const availableCards = ['pineapple.png', 'kiwi.png', 'lemon.png'];

const setStats = result => {
  if (result) {
    stats.wins++;
    stats.games++;
    stats.lastDraw = '+' + inputValue;
    stats.money += inputValue;
  } else {
    stats.loses++;
    stats.games++;
    stats.lastDraw = '-' + inputValue;
    stats.money -= inputValue;
  }
  console.log(stats);
  // winsSpan.textContent = stats.wins;
  // losesSpan.textContent = stats.loses;
  // gamesSpan.textContent = stats.games;
  // lastDrawSpan.textContent = stats.lastDraw;
  // cashSpan.textContent = stats.cashSpan;
};

const drawRandomItems = () => {
  const randomNumberDraw = Math.floor(Math.random() * 15 + 40);
  let indexDraw = 0;
  let liArray = [];
  for (let i = 0; i < randomNumberDraw; i++) {
    if (indexDraw === availableCards.length) indexDraw = 0;
    const li = document.createElement('li');
    li.style.backgroundImage = `url('${availableCards[indexDraw]}')`;
    li.dataset.index = indexDraw;
    liArray.push(li);
    indexDraw++;
  }
  cards.forEach((card, index) => {
    const cardUl = card.children[0];
    cardUl.innerHTML = '';
    const indexCut = Math.floor(randomNumberDraw / availableCards.length);
    const newLiArray = liArray.splice(index, indexCut);
    cardUl.append(...newLiArray);
    const liItem = cardUl.children[0];
    const height = parseInt(getComputedStyle(liItem).height);
    cardUl.style.bottom = height * -newLiArray.length + height + 'px';
  });
  setTimeout(() => {
    let result;
    if (
      (card1Li[card1Li.length] === card2Li[card2Li.length]) ===
      card3Li[card3Li.length]
    ) {
      result = true;
    } else {
      result = false;
    }
    setStats(result);
  }, 3000);
};

const handleGameStart = () => {
  if (!isMachineWorks) return;
  isMachineWorks = false;
  inputValue = input.value;
  input.value = '';
  if (inputValue === '') {
    resultScreen.textContent = 'Empty value';
    resultScreen.classList.add('alert');
    setTimeout(() => {
      resultScreen.classList.remove('alert');
      resultScreen.textContent = "Let's play!";
      isMachineWorks = true;
    }, 2000);
  } else {
    resultScreen.textContent = inputValue + '$';
    armSpan.classList.add('arm-clicked');
    setTimeout(() => {
      armSpan.classList.remove('arm-clicked');
    }, 1500);
    drawRandomItems();
    isMachineWorks = true;
  }
};

arm.addEventListener('click', handleGameStart);
