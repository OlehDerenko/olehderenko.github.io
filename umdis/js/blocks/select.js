const lang = document.querySelector("html").getAttribute("lang");
const languages = document.querySelectorAll(".language");
const active = document.querySelectorAll(".language .language__item_active");
const lists = document.querySelectorAll(".language .language__items");

languages.forEach((element, i) => {
  element.addEventListener("click", () => {
    lists[i].classList.toggle("language__items_active");
  });
});

const sort = document.querySelectorAll(".sort");
const sortActive = document.querySelectorAll(".sort .sort__item_active");
const sortLists = document.querySelectorAll(".sort .sort__items");

sort.forEach((element, i) => {
  element.addEventListener("click", () => {
    sortLists[i].classList.toggle("sort__items_active");
  });
});
