const burger = document.querySelector(".burger");
const dashboardMobile = document.querySelector(".dashboard-mobile");
const body = document.querySelector("body");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  dashboardMobile.classList.toggle("active");
  body.classList.toggle("active");
});
