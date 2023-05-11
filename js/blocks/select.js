const lang = document.querySelector("html").getAttribute("lang");
const language = document.querySelector(".language__item_active");
const list = document.querySelector(".language__items");

language.addEventListener("click", () => {
  list.classList.toggle("language__items_active");
});
