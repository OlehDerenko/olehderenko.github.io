const burger = document.querySelector(".burger");
const burgerMenu = document.querySelector(".burger-menu");

burger.addEventListener("click", () => {
  burger.classList.toggle("is-active");
  burgerMenu.classList.toggle("open");
});

const swiper = new Swiper("#swiper", {
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
});

const currentIndex = document.querySelector("#slide-index");

swiper.on("slideChange", function () {
  console.log("slide changed");
  console.log(swiper.activeIndex);
  currentIndex.textContent = "0" + (swiper.activeIndex + 1);
});

const swiperReviews = new Swiper("#swiper-reviews", {
  direction: "horizontal",
  slidesPerView: 1,

  breakpoints: {
    768: {
      slidesPerView: 2.5,
      spaceBetween: 30,
    },
  },

  navigation: {
    nextEl: ".reviews #swiper-reviews .swiper-button-next",
    prevEl: ".reviews #swiper-reviews .swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
});

const accordions = document.querySelectorAll(".faq-item");

document.addEventListener("DOMContentLoaded", () => {
  accordions.forEach((accordion) => {
    setTimeout(() => {
      const expandedHeight = accordion.offsetHeight;
      const margin = parseFloat(
        window
          .getComputedStyle(accordion.querySelector(".faq-top"))
          .getPropertyValue("margin-bottom")
      );

      const closedHeight =
        accordion.querySelector(".faq-top").offsetHeight + margin + margin;

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
    }, 1000);
  });
});
