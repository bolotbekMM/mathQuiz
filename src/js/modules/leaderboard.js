const select = document.getElementById("mySelect");
let ul = document.querySelector(".leaderboard__ul");

export function leaderboard() {
  if (select && ul) {
    const storageData = JSON.parse(localStorage.getItem("gamerInfo"));
    const getCurrentGamer = JSON.parse(
      localStorage.getItem("currentGamerInfo")
    );

    let selectedMode;

    if (getCurrentGamer) {
      if (getCurrentGamer.gameMode) {
        selectedMode = storageData?.filter(
          (item) => item.gameMode == getCurrentGamer.gameMode
        );
      }

      Array.from(select.children).map((item) => {
        if (item.value === getCurrentGamer.gameMode) {
          item.selected = true;
        }
      });

      if (selectedMode) {
        sortScoreFunc(selectedMode);
        addListsToHTMLPageFunc(selectedMode);
      }
    }

    select.addEventListener("change", () => {
      const selectedMode = storageData?.filter(
        (item) => item.gameMode == select.value
      );

      sortScoreFunc(selectedMode);
      addListsToHTMLPageFunc(selectedMode);
    });
  }
}

function sortScoreFunc(data) {
  data.sort(function (a, b) {
    if (a.score > b.score) {
      return -1;
    }
    if (a.score < b.score) {
      return 1;
    }
    return 0;
  });
}

function addListsToHTMLPageFunc(data) {
  ul.innerHTML = "";

  data.forEach((element) => {
    // if (element.score > 0) {
    let li = document.createElement("li");
    let p = document.createElement("p");
    let span = document.createElement("span");

    p.textContent = element.name;
    span.textContent = element.score;

    ul.appendChild(li);
    li.appendChild(p);
    li.appendChild(span);
    // }
  });
}
