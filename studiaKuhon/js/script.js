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
      spaceBetween: 40,
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
