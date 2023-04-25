const swiperSlider = new Swiper(".cases-swiper", {
  direction: "horizontal",
  slidesPerView: 1,
  spaceBetween: 45,

  breakpoints: {
    768: {
      slidesPerView: 1,
      spaceBetween: 45,
    },
  },

  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
  },
});

new Accordion(".accordion-container", {
  triggerClass: "ac-header",
  duration: 300,
  activeClass: "is-active",
});

new Swiper(".license-swiper", {
  direction: "horizontal",
  slidesPerView: 1,
  spaceBetween: 45,

  navigation: {
    nextEl: ".license-swiper .swiper-button-next",
    prevEl: ".license-swiper .swiper-button-prev",
  },

  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 45,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
    },
  },
});
