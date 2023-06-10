const burger = document.querySelector(".burger");
const burgerMenu = document.querySelector(".burger-menu");
const body = document.querySelector("body");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  burgerMenu.classList.toggle("open");
  body.classList.toggle("active");
});
