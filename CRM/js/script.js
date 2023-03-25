const burger = document.querySelector(".burger");
const sidebar = document.querySelector(".sidebar-mobile");
const body = document.querySelector("body");
const html = document.querySelector("html");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  sidebar.classList.toggle("active");
  body.classList.toggle("active");
  html.classList.toggle("active");
});
