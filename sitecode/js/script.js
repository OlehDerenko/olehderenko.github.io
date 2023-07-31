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
const links = Array.from(document.querySelectorAll("a")).filter((link) =>
  link.getAttribute("href").startsWith("#")
);

const navigation = {
  open() {
    mobileMenu.classList.add("open");
    body.classList.add("active");
    burger.classList.add("is-active");
  },
  close() {
    mobileMenu.classList.remove("open");
    body.classList.remove("active");
    burger.classList.remove("is-active");
  },
  isOpen() {
    return mobileMenu.classList.contains("open");
  },
};

burger.addEventListener("click", (e) => {
  e.preventDefault();

  if (navigation.isOpen()) {
    navigation.close();
  } else {
    navigation.open();
  }
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));

    navigation.close();
    target.scrollIntoView({
      behavior: "smooth",
    });
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
      slidesPerView: 1.8,
      spaceBetween: 0,
    },
    600: {
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

new Swiper(".wrap-four-swiper", {
  direction: "horizontal",
  slidesPerView: 1,

  breakpoints: {
    320: {
      slidesPerView: 1.4,
      spaceBetween: 20,
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
  },

  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
});

new Accordion(".faq");
