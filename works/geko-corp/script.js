$(document).ready(function () {
  $(".header-burger").click(function () {
    $(".burger-menu").toggleClass("active");
    $(".header-burger").toggleClass("active");
  });

  $(".reviews-block-flex").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    variableWidth: true,
  });
});
