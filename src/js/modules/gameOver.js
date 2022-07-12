const score = document.querySelector(".myModal__main h2");
const correctAnsvers = document.getElementById("correct-ansvers");
const falseAnsvers = document.getElementById("false-ansvers");
const playAgain = document.querySelector(".play__again-btn");

export function gameOver() {
  const getCurrentGamer = JSON.parse(localStorage.getItem("currentGamerInfo"));
  score ? (score.textContent = getCurrentGamer.score) : null;
  correctAnsvers
    ? (correctAnsvers.textContent = getCurrentGamer.correct)
    : null;
  falseAnsvers ? (falseAnsvers.textContent = getCurrentGamer.false) : null;

  playAgain?.addEventListener("click", () => {
    getCurrentGamer.score = 0;
    localStorage.setItem("currentGamerInfo", JSON.stringify(getCurrentGamer));
  });
}
