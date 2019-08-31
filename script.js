const resultScreen = document.querySelector(".result-screen");

const armSpan = document.querySelector(".arm-span");

const input = document.querySelector(".set-deal");
const winsSpan = document.querySelector(".wins");
const losesSpan = document.querySelector(".loses");
const gamesSpan = document.querySelector(".games");
const lastDrawSpan = document.querySelector(".last-draw");
const cashSpan = document.querySelector(".cash");
let cards1Li = document.querySelectorAll("#card-1 li");
let cards2Li = document.querySelectorAll("#card-2 li");
let cards3Li = document.querySelectorAll("#card-3 li");
const gate = document.querySelector(".gate");
const gateText = document.querySelector(".gate-text");
const gateSubtext = document.querySelector(".gate-subtext");
const reset = document.querySelector(".reset");

const coinsFall = document.querySelector(".coins-fall-win");
const coinsReward = document.querySelector(".coins-win");
const lightsTop = document.querySelectorAll(".result .lights span");
const lightsBottom = document.querySelectorAll(".game-board .lights span");

const tip1 = document.querySelector(".fa-tip-1");
const tip2 = document.querySelector(".fa-tip-2");
const tip3 = document.querySelector(".fa-tip-3");

let cardUl = document.querySelectorAll(".card ul");
let isGameOver = true;
let isMachineWorks = false;
let isTriggerOn = false;
let inputValue;
let firstGame = true;
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

const availableCards = ["pineapple.png", "kiwi.png", "lemon.png"];

const handleTips = tip => {
  if (firstGame) {
    switch (tip) {
      case 1:
        tip1.style.display = "none";
        setTimeout(() => (tip2.style.display = "inline"), 1500);
        break;
      case 2:
        tip2.style.display = "none";
        tip3.style.display = "inline";
        break;
      case 3:
        tip3.style.display = "none";
        firstGame = false;
        break;
      default:
        break;
    }
  }
};

const screenAlert = input => {
  resultScreen.textContent = input;
  resultScreen.classList.add("alert");
  setTimeout(() => {
    resultScreen.classList.remove("alert");
    resultScreen.textContent = "Let's play!";
  }, 1000);
};

const gameOver = () => {
  gate.style.transform = "translateY(0)";
  gateText.textContent = "GAME OVER!";
  gateSubtext.innerHTML = `You lost all money!`;
  reset.textContent = "Start again with 1000$";
  isGameOver = true;
};

const fillSpans = (result = 0) => {
  winsSpan.textContent = stats.wins;
  losesSpan.textContent = stats.loses;
  gamesSpan.textContent = stats.games;
  if (result === 0) {
    lastDrawSpan.style.color = "rgb(0, 0, 0)";
    lastDrawSpan.textContent = `${stats.lastDraw}$`;
  } else if (result) {
    lastDrawSpan.style.color = "rgb(0, 200, 0)";
    lastDrawSpan.textContent = `+${stats.lastDraw}$ (${stats.lastDraw / 3}$)`;
    screenAlert("You win!");
  } else if (!result) {
    lastDrawSpan.style.color = "rgb(200, 0, 0)";
    lastDrawSpan.textContent = `-${stats.lastDraw}$`;
    screenAlert("You lost...");
  }
  cashSpan.textContent = stats.money + "$";
};

const liCreator = () => {
  cardUl.forEach(ul => {
    const liElement = ul.children[ul.children.length - 1];
    ul.style.transition = "none";
    ul.innerHTML = "";
    ul.append(liElement);
    ul.style.bottom = "0";
    setTimeout(() => {
      ul.style.transition = "bottom 2s ease";
    }, 100);
  });
};

const animReward = () => {
  coinsReward.parentNode.style.filter = "brightness(135%)";
  coinsReward.classList.add("active-anim");
  coinsFall.classList.add("active-anim");
  let topTime = 35;
  lightsTop.forEach(item => {
    item.classList.remove("light-active");
    setTimeout(() => {
      item.classList.add("light-active");
    }, topTime);
    topTime += 35;
  });
  lightsBottom.forEach(item => {
    item.classList.remove("light-active");
    setTimeout(() => {
      item.classList.add("light-active");
    }, topTime);
    topTime += 35;
  });
  setTimeout(() => {
    coinsReward.classList.remove("active-anim");
    coinsFall.classList.remove("active-anim");
    coinsReward.parentNode.style.filter = "brightness(100%)";
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
  cards1Li = document.querySelectorAll("#card-1 li");
  cards2Li = document.querySelectorAll("#card-2 li");
  cards3Li = document.querySelectorAll("#card-3 li");
  if (
    cards1Li[cards1Li.length - 1].dataset.index ===
      cards2Li[cards2Li.length - 1].dataset.index &&
    cards2Li[cards2Li.length - 1].dataset.index ===
      cards3Li[cards3Li.length - 1].dataset.index
  ) {
    setStats(true);
  } else {
    setStats(false);
  }
};

const drawRandomItems = () => {
  cardUl.forEach(ul => {
    const randomNumberDraw = Math.floor(Math.random() * 9 + 40);
    let indexDraw = Math.floor(Math.random() * availableCards.length);
    let liArray = [];
    for (let i = 0; i < randomNumberDraw; i++) {
      if (indexDraw === availableCards.length) indexDraw = 0;
      const li = document.createElement("li");
      li.style.backgroundImage = `url('${availableCards[indexDraw]}')`;
      li.dataset.index = indexDraw;
      liArray.push(li);
      indexDraw++;
    }
    ul.append(...liArray);
    const height = parseInt(getComputedStyle(ul.children[0]).height);
    ul.style.bottom = height * liArray.length + "px";
  });

  setTimeout(handleResultCheck, timeRoll);
};

const handleGameStart = () => {
  if (isGameOver) {
    screenAlert("Start New Game");
    return;
  } else if (!isMachineWorks) {
    return;
  }
  isMachineWorks = false;
  inputValue = input.value;
  input.value = "";
  resultScreen.textContent = inputValue + "$";
  if (inputValue > stats.money) {
    screenAlert("No money");
    isMachineWorks = true;
    return;
  } else if (inputValue == "" || inputValue == 0) {
    screenAlert("Empty value");
    isMachineWorks = true;
    return;
  } else if (inputValue == "") {
    screenAlert("Va banque!");
  }

  armSpan.classList.add("arm-clicked");
  setTimeout(() => {
    armSpan.classList.remove("arm-clicked");
  }, timeRoll);
  drawRandomItems();
};

const resetGame = () => {
  handleTips(1);
  screenAlert("1000$ for you!");
  gate.style.transform = "translateY(100%)";
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

reset.addEventListener("click", resetGame);
input.addEventListener("input", function() {
  const value = parseInt(this.value);
  if (isGameOver) {
    this.value = "";
  } else if (isNaN(value) || value === 0) {
    this.value = "";
    screenAlert("Wrong number");
  } else {
    handleTips(2);
  }
});
//

const myTriggerTop = document.querySelector(".arm-span span");
const myTriggerBottom = document.querySelector(".arm-span2 span");

myTriggerTop.addEventListener("mousedown", () => {
  if (isGameOver) {
    screenAlert("Start New Game");
    return;
  } else if (!isMachineWorks) {
    return;
  } else {
    isTriggerOn = true;
  }
});
myTriggerTop.addEventListener("mouseup", () => {
  if (isTriggerOn) {
    isTriggerOn = false;
    armSpan.style.transition = "transform 1s";
    armSpan.style.transform = "rotate(15deg)";
    setTimeout(() => {
      armSpan.style.transition = "none";
    }, 1000);
  }
});
document.body.addEventListener("mouseup", () => {
  if (isTriggerOn) {
    isTriggerOn = false;
    armSpan.style.transition = "transform 1s";
    armSpan.style.transform = "rotate(15deg)";
    setTimeout(() => {
      armSpan.style.transition = "none";
    }, 1000);
  }
});

const spanTopY = myTriggerTop.getBoundingClientRect().top;
const spanBottomY = myTriggerBottom.getBoundingClientRect().top;

document.body.addEventListener("mousemove", e => {
  if (isTriggerOn) {
    const angleArm = 150;
    const betweenArmSpans = spanBottomY - spanTopY;
    const cursorPosition = e.clientY - spanTopY;
    const newDeg = (cursorPosition * angleArm) / betweenArmSpans;
    armSpan.style.transform = `rotate(${newDeg}deg)`;
    if (newDeg >= 165) {
      isTriggerOn = false;
      handleTips(3);
      handleGameStart();
      armSpan.style.transition = "transform 1s";
      armSpan.style.transform = "rotate(15deg)";
      setTimeout(() => {
        armSpan.style.transition = "none";
      }, 1000);
    }
  }
});
