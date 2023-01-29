const accordions = document.querySelectorAll(".faq-item");

document.addEventListener("DOMContentLoaded", () => {
  accordions.forEach((accordion) => {
    const expandedHeight = accordion.offsetHeight;
    const closedHeight = accordion.querySelector(".answer").offsetHeight + 46;

    accordion.setAttribute("data-expanded-height", expandedHeight);
    accordion.setAttribute("data-height", closedHeight);
    accordion.style.height = `${closedHeight}px`;

    accordion.addEventListener("click", (e) => {
      if (accordion.classList.contains("open")) {
        accordion.classList.remove("open");
        accordion.style.height = `${accordion.getAttribute("data-height")}px`;
      } else {
        accordion.classList.add("open");
        accordion.style.height = `${accordion.getAttribute(
          "data-expanded-height"
        )}px`;
      }
    });
  });
});

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 1,
  centeredSlides: true,
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".reviews .navigation .right",
    prevEl: ".reviews .navigation .left",
  },
});

const links = document.querySelectorAll(".nav a");

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

const openModalButtons = document.querySelectorAll("[data-open-modal]");
const closeModalButtons = document.querySelectorAll("[data-close-modal]");
const modals = document.querySelectorAll("[data-modal-name]");

openModalButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const modal = document.querySelector(
      `[data-modal-name=${button.getAttribute("data-open-modal")}]`
    );

    modal.classList.add("visible");
    document.body.style.overflow = "hidden";
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const modal = document.querySelector(
      `[data-modal-name=${button.getAttribute("data-close-modal")}]`
    );
    modal.classList.remove("visible");
    document.body.style.overflow = "visible";
  });
});

const burger = document.querySelector(".burger");
const burgerMenu = document.querySelector(".mobile-menu");
const body = document.querySelector("body");

const toggleNavigation = () => {
  burgerMenu.classList.toggle("open");
  body.classList.toggle("active");
  burger.classList.toggle("is-active");
};

burger.addEventListener("click", (e) => {
  e.preventDefault();

  toggleNavigation();
});

// links.forEach((link) => {
//   link.addEventListener("click", (e) => {
//     e.preventDefault();
//     const target = document.querySelector(link.getAttribute("href"));
//     target.scrollIntoView({
//       behavior: "smooth",
//     });

//     toggleNavigation();
//   });
// });
