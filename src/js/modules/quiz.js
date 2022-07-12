const num1 = document.querySelector(".game__math-num1");
const num2 = document.querySelector(".game__math-num2");
const operator = document.querySelector(".game__math-operator");
const result = document.querySelector(".game__math-result");
const goBtn = document.querySelector("#go");
const winElement = document.querySelector(".game__score p");
const currentGamerName = document.getElementById("currentGamerName");
const stopGameBtn = document.getElementById("stopGameBtn");
const getCurrentGamer = JSON.parse(localStorage.getItem("currentGamerInfo"));
const elem = document.querySelector(".game__math-box");
const onePlus = document.querySelector(".floating__score-plus");
const oneMinus = document.querySelector(".floating__score-minus");
const gameScore = document.querySelector(".game__score");

let win = 0;
let correctQty = 0;
let falseQuantity = 0;

export function quiz() {
  currentGamerName
    ? (currentGamerName.textContent = getCurrentGamer.name)
    : null;

  const getRandom = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  const operators = ["/", "+", "-", "*"];

  const sum = (a, b, operator) => {
    if (operator === "+") return a + b;
    if (operator === "-") return a - b;
    if (operator === "/") return a / b;
    return a * b;
  };

  const generateExample = () => {
    let num1 = getRandom(1, 10);
    let num2 = getRandom(1, 10);
    const operator = operators[getRandom(0, 3)];

    if (operator == "/") {
      for (let index = 0; ; index++) {
        if (num1 % num2 == 0) {
          break;
        }
        num1 = getRandom(1, 10);
        num2 = getRandom(1, 10);
      }
    }
    const result = sum(num1, num2, operator);

    return { num1, num2, operator, result };
  };

  const renderExample = (data) => {
    // elem.classList.add("game__math-box-move_right");
    num1 ? (num1.textContent = data.num1) : null;
    num2 ? (num2.textContent = data.num2) : null;
    operator ? (operator.textContent = data.operator) : null;
  };

  // setTimeout(() => {
  //   elem.classList.remove("game__math-box-move_right");
  // }, 700);

  let example = generateExample();
  renderExample(example);

  function correctQuantityFunc() {
    displayScorePlusAndMinus(onePlus);
    correctQty += 1;
    win += 1;
  }

  function falseQuantityFunc() {
    displayScorePlusAndMinus(oneMinus);
    gameScore.classList.add("addAnimationToScore");
    setTimeout(() => {
      gameScore.classList.remove("addAnimationToScore");
    }, 1000);
    falseQuantity++;
    win -= 1;
  }

  goBtn &&
    goBtn.addEventListener("keyup", function (e) {
      if (e.keyCode === 13) {
        if (!result.value && result.value !== 0) return;

        if (Number(result.value) === Number(example.result)) {
          correctQuantityFunc();
        } else {
          falseQuantityFunc();
        }
        elem.classList.remove("game__math-box-move_right");
        myMove("game__math-box-move_left");
        winElement.textContent = win;

        result.value = "";
        setTimeout(() => {
          elem.classList.add("game__math-box-move_right");
          example = generateExample();
          renderExample(example);
          console.log(this.value);
        }, 700);

        getCurrentGamer.score = win;
      }
    });

  stopGameBtn &&
    stopGameBtn.addEventListener("click", () => {
      addScoreOfPlayerToLSFunc();
      addCurrGamerToLeaderboard();
    });
}
export function addScoreOfPlayerToLSFunc() {
  getCurrentGamer.correct = correctQty;
  getCurrentGamer.false = falseQuantity;
  localStorage.setItem("currentGamerInfo", JSON.stringify(getCurrentGamer));
}
export function addCurrGamerToLeaderboard() {
  const getLeaderboard = JSON.parse(localStorage.getItem("gamerInfo"));

  getLeaderboard?.map((item) => {
    if (
      item.name === getCurrentGamer.name &&
      item.gameMode === getCurrentGamer.gameMode &&
      item.score < getCurrentGamer.score
    ) {
      item.score = getCurrentGamer.score;
    }
  });
  localStorage.setItem("gamerInfo", JSON.stringify(getLeaderboard));
}
function myMove(params) {
  elem.classList.add(params);
  setTimeout(() => {
    elem.classList.remove(params);
  }, 700);
}
function displayScorePlusAndMinus(params) {
  params.classList.add("floating__score-displaying");
  setTimeout(() => {
    params.classList.remove("floating__score-displaying");
  }, 700);
}
