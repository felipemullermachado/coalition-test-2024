import $ from "jquery";

export default function () {
  $(window).on("scroll", function () {
    let targetPosition = $("main>*:nth-child(2)").offset().top;
    let scrollValue = $(window).scrollTop();

    if (scrollValue > targetPosition) {
      $(".header").addClass("fixed");
    } else {
      $(".header").removeClass("fixed");
    }
  });

  $('.header nav a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    let id = $(this).attr("href"),
      targetOffset =
        id == "#team" ? $(id).offset().top - 70 : $(id).offset().top;

    $("html, body").animate(
      {
        scrollTop: targetOffset + 2,
      },
      500
    );
  });
}
