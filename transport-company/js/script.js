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

const scrollTopGlobalButton = document.querySelector(".button-up");

scrollTopGlobalButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const openModalButtons = document.querySelectorAll("[data-modal-name]");

const scroll = {
  lock: () => {
    document.body.classList.add("scroll-lock");
  },
  unlock: () => {
    document.body.classList.remove("scroll-lock");
  },
};

openModalButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const modal = document.querySelector(
      button.getAttribute("data-modal-name")
    );

    modal.classList.add("visible");
    scroll.lock();
  });
});

const closeModal = document.querySelector("#close-modal");

closeModal.addEventListener("click", () => {
  const modal = document.querySelector(".form-wrapper");
  modal.classList.remove("visible");
  scroll.unlock();
});

const language = document.querySelector(".language__item_active");
const list = document.querySelector(".language__items");

language.addEventListener("click", () => {
  list.classList.toggle("language__items_active");
});
