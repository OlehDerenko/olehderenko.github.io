new Blobity({ color: "rgb(255, 255, 255)", fontSize: 14, zIndex: -1 });

document.addEventListener("DOMContentLoaded", () => {
  TagCanvas.Start("skills", "", {
    textColour: "#fff",
    textHeight: 20,
    depth: 0.99,
    zoom: 1,
    zoomMax: 1,
    zoomMin: 1,
    outlineColour: "#08fdd8",
    initial: [0.3, -0.1],
  });
});

const burger = document.querySelector(".hamburger");
const burgerMenu = document.querySelector(".burger-menu");
const range = document.querySelector(".range");
const rangeThumb = range.querySelector("span");

burger.addEventListener("click", (e) => {
  e.preventDefault();
  burger.classList.toggle("is-active");

  burgerMenu.classList.toggle("open");
});

const thumbWidth =
  range.clientWidth / document.querySelectorAll(".portfolio__block").length;

rangeThumb.style.width = `${thumbWidth}px`;
let slidesLength;

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  navigation: {
    nextEl: ".arrow-next",
    prevEl: ".arrow-back",
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

swiper.on("slideChange", (swiper) => {
  const { realIndex } = swiper;

  rangeThumb.style.left = `${thumbWidth * realIndex}px`;
});
