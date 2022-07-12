const timer = document.querySelector(".game__timer-box");

export function gameMode() {
  if (timer) {
    const getCurrentGamer = JSON.parse(
      localStorage.getItem("currentGamerInfo")
    );

    if (getCurrentGamer.gameMode == "practice") {
      timer.classList.add("game__timer-close");
    } else {
      timer.classList.remove("game__timer-close");
    }
  }
}
