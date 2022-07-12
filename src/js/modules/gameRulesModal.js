const openModalBtn = document.querySelector(".registration__rules");
const closeModalBtn = document.getElementsByClassName("modal__close-btn")[0];
const modalClass = document.querySelector(".modal__rule");

export function modal() {
  openModalBtn &&
    openModalBtn.addEventListener("click", () => {
      modalClass.classList.add("class", "modal__open");
    });
  closeModalBtn &&
    closeModalBtn.addEventListener("click", () => {
      modalClass.classList.remove("class", "modal__open");
    });
}
