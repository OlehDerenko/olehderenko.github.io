new Swiper(".courses-swiper", {
  direction: "horizontal",
  slidesPerView: 1,
  spaceBetween: 30,

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
