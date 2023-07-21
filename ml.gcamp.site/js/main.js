$(document).ready(function () {
  $('a[href^="#"]').click(function () {
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top;
    jQuery("html:not(:animated), body:not(:animated)").animate(
      { scrollTop: destination },
      500
    );
    return false;
  });

  $(".reviews").slick({
    dots: true,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 7000,
    speed: 240,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 976,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 659,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

function CountBox() {
  dateNow = new Date();
  amount =
    ((23 - dateNow.getHours()) * 60 * 60 +
      (59 - dateNow.getMinutes()) * 60 +
      (60 - dateNow.getSeconds())) *
    1000;
  delete dateNow;
  if (amount < 0) {
    out =
      "<div class='countbox-num'><div class='countbox-hours'><span></span>00</div><div class='countbox-hours-text'></div></div>" +
      "<div class='countbox-num'><div class='countbox-mins'><span></span>00</div><div class='countbox-mins-text'></div></div>" +
      "<div class='countbox-num'><div class='countbox-secs'><span></span>00</div><div class='countbox-secs-text'></div></div>";
    var list = document.getElementsByClassName("countbox");
    for (var i = 0; i < list.length; i++) {
      list[i].innerHTML = out;
    }
    setTimeout("CountBox()", 10000);
  } else {
    days = 0;
    days1 = 0;
    days2 = 0;
    hours = 0;
    hours1 = 0;
    hours2 = 0;
    mins = 0;
    mins1 = 0;
    mins2 = 0;
    secs = 0;
    secs1 = 0;
    secs2 = 0;
    out = "";
    amount = Math.floor(amount / 1e3);
    days = Math.floor(amount / 86400);
    days1 = days >= 10 ? days.toString().charAt(0) : "0";
    days2 = days >= 10 ? days.toString().charAt(1) : days.toString().charAt(0);
    amount = amount % 86400;
    hours = Math.floor(amount / 3600);
    hours1 = hours >= 10 ? hours.toString().charAt(0) : "0";
    hours2 =
      hours >= 10 ? hours.toString().charAt(1) : hours.toString().charAt(0);
    amount = amount % 3600;
    mins = Math.floor(amount / 60);
    mins1 = mins >= 10 ? mins.toString().charAt(0) : "0";
    mins2 = mins >= 10 ? mins.toString().charAt(1) : mins.toString().charAt(0);
    amount = amount % 60;
    secs = Math.floor(amount);
    secs1 = secs >= 10 ? secs.toString().charAt(0) : "0";
    secs2 = secs >= 10 ? secs.toString().charAt(1) : secs.toString().charAt(0);
    out =
      "<div class='countbox-num'><div class='countbox-hours'><span></span>" +
      hours1 +
      hours2 +
      "</div><div class='countbox-hours-text'>Годин</div></div>" +
      "<div class='countbox-num'><div class='countbox-mins'><span></span>" +
      mins1 +
      mins2 +
      "</div><div class='countbox-mins-text'>Хвилин</div></div>" +
      "<div class='countbox-num'><div class='countbox-secs'><span></span>" +
      secs1 +
      secs2 +
      "</div><div class='countbox-secs-text'>Секунд</div></div>";
    var list = document.getElementsByClassName("countbox");
    for (var i = 0; i < list.length; i++) {
      list[i].innerHTML = out;
    }
    setTimeout("CountBox()", 1e3);
  }
}
window.onload = function () {
  CountBox();
};

function gettovid(obj) {
  let modalId = "";
  let btnId = "";
  let selectId = "";
  let checkboxId = "";
  let closebtnId = "";
  let closeformbtnId = "";
  modalId = obj.id + "_modal";
  btnId = obj.id + "_btn";
  selectId = obj.id + "_select";
  checkboxId = obj.id + "_checkbox";
  closemodalbtnId = obj.id + "_close";
  let modal = document.getElementById(modalId);
  modal.style.display = "block";
  let closemodalbtn = document.getElementById(closemodalbtnId);
  let formbtn = document.getElementById(btnId);
  let formmodal = document.getElementsByClassName("formbox-modal")[0];
  let formselect = document.getElementById(selectId);
  let formcheckbox = document.getElementById(checkboxId);
  let closeformbtn = document.getElementById("closeform");
  formbtn.onclick = function () {
    formselect.disabled = false;
    formmodal.style.display = "block";
    formselect.style.display = "block";

    formcheckbox.style.display = "none";
  };
  closeformbtn.onclick = function () {
    formselect.style.display = "none";
    formselect.disabled = true;
    formmodal.style.display = "none";
    formcheckbox.style.display = "block";
    document.getElementById("modal_order_form").reset();
  };
  closemodalbtn.onclick = function () {
    formselect.style.display = "none";
    formselect.disabled = true;
    modal.style.display = "none";
    formmodal.style.display = "none";
    document.getElementById("modal_order_form").reset();
  };

  document.getElementById("modal_order_form").reset();
  // }
  window.onclick = function (event) {
    if (event.target == modal) {
      formselect.style.display = "none";
      formselect.disabled = true;
      modal.style.display = "none";
      document.getElementById("modal_order_form").reset();
    }
    if (event.target == formmodal) {
      formselect.style.display = "none";
      formselect.disabled = true;
      formmodal.style.display = "none";
      formcheckbox.style.display = "block";

      document.getElementById("modal_order_form").reset();
    }
  };
}

const scrollTopGlobalButton = document.querySelector(".button-to-top");

window.addEventListener("scroll", () => {
  const TOP = 195;
  if (
    document.body.scrollTop > TOP ||
    document.documentElement.scrollTop > TOP
  ) {
    scrollTopGlobalButton.style.display = "flex";
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
