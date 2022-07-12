import { addCurrGamerToLeaderboard, addScoreOfPlayerToLSFunc } from "./quiz";

const gameTime = { h: 0, m: 1, s: 30 };
const progress = document.querySelector(".inner__line");
const timeText = document.querySelector(".game__timer-counter");
const getCurrentGamer = JSON.parse(localStorage.getItem("currentGamerInfo"));

export function timer() {
  if (progress) {
    let t = 0;
    let total = 0;

    if (getCurrentGamer.gameMode == "time-attack") {
      myFunction();
    }

    function myFunction() {
      let hr = gameTime.h;
      let min = gameTime.m;
      let sec = gameTime.s;
      t = hr * 3600 + min * 60 + sec;
      total = t;
      timerTime();
    }

    function timerTime() {
      t = t - 1;
      let temp = t;
      let h = Math.floor(temp / 3600);
      let m = Math.floor((temp % 3600) / 60);
      let s = Math.floor(temp - 3600 * h - 60 * m);
      m = checkTime(m);
      s = checkTime(s);
      // progress.style.transition = `width ${total}s ease-in-out`;
      progress.style.width = (temp * 100) / total + "%";

      timeText.textContent = `${m}:${s}`;
      let ti = setTimeout(timerTime, 1000);
      if (temp <= 0) {
        addScoreOfPlayerToLSFunc();
        addCurrGamerToLeaderboard();

        clearInterval(ti);
        window.location.href = "./timesUp.html";
      }
    }
    function checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
  }
}
