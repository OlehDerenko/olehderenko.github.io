import { ScrollLock } from "./scroll-lock";
import Swal from "sweetalert2";

const scrollLock = new ScrollLock();

const burger = document.querySelector(".burger");
const burgerMenu = document.querySelector(".mobile-menu");
const body = document.querySelector("body");

burger.addEventListener("click", () => {
  const isOpen = burger.classList.contains("active");

  if (isOpen) {
    burger.classList.remove("active");
    burgerMenu.classList.remove("open");
    body.classList.remove("active");
  } else {
    burger.classList.add("active");
    burgerMenu.classList.add("open");
    body.classList.add("active");
  }
});

const openModalButtons = document.querySelectorAll("[data-open-modal]");
const closeModalButtons = document.querySelectorAll("[data-close-modal]");
const modals = document.querySelectorAll("[data-modal-name]");
const form = document.querySelector(".form");

openModalButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const modal = document.querySelector(
      `[data-modal-name=${button.getAttribute("data-open-modal")}]`
    );
    const block = button.getAttribute("data-block-name");
    const b = button.getAttribute("data-button-name");

    form.querySelector('input[name="block"]').value = block;
    form.querySelector('input[name="button"]').value = b;

    modal.classList.add("visible");
    scrollLock.enable();
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const modal = document.querySelector(
      `[data-modal-name=${button.getAttribute("data-close-modal")}]`
      // `[data-modal-name=${button.getAttribute("#close-form")}]`
    );
    modal.classList.remove("visible");
    scrollLock.disable();
  });
});

const links = document.querySelectorAll("a[data-inner-navigation]");
const button = document.querySelector("#submit-button");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    scrollLock.disable();

    burgerMenu.classList.remove("open");

    const target = document.querySelector(link.getAttribute("href"));

    target.scrollIntoView({
      behavior: "smooth",
    });
  });
});

const onClear = () => {
  form.querySelector("#name").value = "";
  form.querySelector("#phone").value = "";
  form.querySelector("#block").value = "";
  form.querySelector("#button").value = "";

  document.querySelector(".form-wrapper").classList.remove("visible");
  scrollLock.disable();
};

const onSubmit = async (e) => {
  e.preventDefault();
  button.disabled = true;

  const data = new FormData(e.target);

  try {
    await fetch("/server/mail.php", {
      method: "POST",
      body: data,
    });
  } catch (e) {
  } finally {
    Swal.fire("Спасибо!", "Заявка успешно отправлена!", "success");
    onClear();
    button.disabled = false;
  }
};

form.addEventListener("submit", onSubmit);

IMask(document.querySelector("#phone"), {
  mask: "+{7}(000)000-00-00",
});

const scrollTopGlobalButton = document.querySelector(
  "#global-scroll-top-button"
);

window.addEventListener("scroll", (e) => {
  const TOP = 195;
  const SCROLLED =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
  if (SCROLLED > TOP) {
    scrollTopGlobalButton.style.display = "block";
  } else {
    scrollTopGlobalButton.style.display = "none";
  }
});

scrollTopGlobalButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
