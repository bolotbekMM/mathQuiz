let form = document.getElementById("registration-form");
let input = document.getElementById("enteredName");
const gameMode = document.getElementsByClassName("radio__button");
const getCurrentGamer = JSON.parse(localStorage.getItem("currentGamerInfo"));

function inputValidationFunc() {
  if (input.value.trim().length == 0) {
    input.classList.add("registration__input-error");
    input.nextElementSibling.classList.add("registration__textError-allow");
    return false;
  } else {
    input.classList.remove("registration__input-error");
    input.nextElementSibling.classList.remove("registration__textError-allow");
    return true;
  }
}

export function validation() {
  getCurrentGamer && input ? (input.value = getCurrentGamer.name) : null;
  form &&
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      input.addEventListener("input", () => inputValidationFunc());

      if (inputValidationFunc()) {
        window.location.href = "./game.html";
        currentGamerFunc();
        addGamerData();
      }
    });
}

function currentGamerFunc() {
  const mode = Array.from(gameMode)?.find((item) => item.checked);
  let gamer = {
    name: input.value,
    gameMode: mode.value,
    score: 0,
    correct: 0,
    false: 0,
  };

  localStorage.setItem("currentGamerInfo", JSON.stringify(gamer));
}

function addGamerData() {
  const mode = Array.from(gameMode)?.find((item) => item.checked);
  let gamer = {
    name: input.value,
    gameMode: mode.value,
    score: 0,
  };

  const storageData = JSON.parse(localStorage.getItem("gamerInfo"));

  const checkGamer = storageData?.find(
    (el) => el.name == gamer.name && el.gameMode == gamer.gameMode
  );

  if (!storageData) {
    localStorage.setItem("gamerInfo", JSON.stringify([gamer]));
  }

  if (!checkGamer) {
    storageData.push(gamer);
    localStorage.setItem("gamerInfo", JSON.stringify(storageData));
  }
}
