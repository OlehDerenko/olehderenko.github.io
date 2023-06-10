new Swiper(".partners-swiper", {
  direction: "horizontal",
  slidesPerView: 6,

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    1100: {
      slidesPerView: 6,
      spaceBetween: 30,
    },
  },

  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },

  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
});

new Swiper(".partners-mobile-swiper", {
  direction: "horizontal",
  slidesPerView: 3,

  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
});
