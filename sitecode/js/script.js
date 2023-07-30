const lang = document.querySelector("html").getAttribute("lang");
const languages = document.querySelectorAll(".language");
const active = document.querySelectorAll(".language .language__item_active");
const lists = document.querySelectorAll(".language .language__items");

languages.forEach((element, i) => {
  element.addEventListener("click", () => {
    lists[i].classList.toggle("language__items_active");
  });
});

const body = document.querySelector("body");
const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu");
const links = document.querySelectorAll(".mobile-menu nav a");

const toggleNavigation = () => {
  mobileMenu.classList.toggle("open");
  body.classList.toggle("active");
  burger.classList.toggle("is-active");
};

burger.addEventListener("click", (e) => {
  e.preventDefault();

  toggleNavigation();
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
    });

    toggleNavigation();
  });
});

class Tabs {
  constructor(element) {
    this.element = element;
    this.buttons = this.element.querySelectorAll(".tabs-item");
    this.contents = this.element.querySelectorAll(".tabs-content-item");

    this.initialize();
  }

  clear() {
    this.buttons.forEach((button) => {
      button.classList.remove("active");
    });

    this.contents.forEach((content) => {
      content.classList.remove("active");
    });
  }

  initialize() {
    this.buttons.forEach((button, i) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.clear();
        this.buttons[i].classList.add("active");
        this.contents[i].classList.add("active");
      });
    });
  }
}

const tabs = document.querySelectorAll(".tabs").forEach((tab) => new Tabs(tab));

new Swiper(".wrap-two-swiper", {
  direction: "horizontal",
  slidesPerView: 1,

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    1100: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },

  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
});
