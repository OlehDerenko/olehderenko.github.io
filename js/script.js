const lang = document.querySelector("html").getAttribute("lang");
const message =
  lang === "ru" ? "Это обязательное поле." : "Це обов'язкове поле.";

const sendMessageToTelegram = async () => {
  const token = "5659885385:AAEvn4_q8enkKy907djlkDn113FPsJ6nfmU";
  const chatId = "-855281779";
  const API_URL = `https://api.telegram.org/bot${token}/sendMessage`;

  const name = document.querySelector("#name").value;
  const phone = document.querySelector("#phone").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  const text = `
    <b>Заявка з сайту.</b>
  Ім'я: ${name} .
  Телефон: ${phone} .
  Імейл: ${email} .
  Повідомлення: ${message ? message : "Немає"}.
  `;

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      parse_mode: "html",
      text,
    }),
  });

  console.log({
    name,
    phone,
    email,
    message,
  });
};

$(document).ready(function () {
  $(".form-wrapper .form").validate({
    errorElement: "span",
    rules: {
      name: {
        required: true,
      },
      phone: {
        required: true,
      },
      email: {
        required: true,
      },
      agreement: {
        required: true,
      },
    },
    messages: {
      name: {
        required: message,
      },
      phone: {
        required: message,
      },
      email: {
        required: message,
      },
      agreement: {
        required: message,
      },
    },
    errorPlacement: function (error, element) {
      error.insertAfter(`[data-error-name="${element.attr("name")}"]`);
    },
    errorClass: "has-error",
    submitHandler: (form) => {
      sendMessageToTelegram();
    },
  });
});

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

const form = document.querySelector(".form-wrapper .form");
