const lang = document.querySelector("html").getAttribute("lang");
const language = document.querySelector(".language__item_active");
const list = document.querySelector(".language__items");

language.addEventListener("click", () => {
  list.classList.toggle("language__items_active");
});

const scrollTopGlobalButton = document.querySelector(".button-to-top");

window.addEventListener("scroll", () => {
  const TOP = 195;
  if (
    document.body.scrollTop > TOP ||
    document.documentElement.scrollTop > TOP
  ) {
    scrollTopGlobalButton.style.display = "flex";
  } else {
    scrollTopGlobalButton.style.display = "none";
  }
});

scrollTopGlobalButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
