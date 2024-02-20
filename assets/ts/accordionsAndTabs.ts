import $ from "jquery";

export default function () {
  if ($(window).width() < 768) {
    $(".tabs").hide();
    $(".accordion").show();
  } else {
    $(".tabs").show();
    $(".accordion").hide();
  }

  $(window).resize(function () {
    if ($(window).width() < 768) {
      $(".tabs").hide();
      $(".accordion").show();
    } else {
      $(".tabs").show();
      $(".accordion").hide();
    }
  });

  $(".tab").click(function () {
    var targetContent = $(this).attr("aria-controls");
    $(".tab").removeClass("active").attr("aria-selected", "false");
    $(this).addClass("active").attr("aria-selected", "true");
    let classes = $(".bkg-climb").attr("class").split(" ");
    $(".bkg-climb").removeClass(classes[1]);
    $(".bkg-climb").addClass(targetContent);
    $(".tab-content").hide();
    $("#" + targetContent).show();
  });

  $(".accordion-header").click(function () {
    $(this).next(".accordion-content").slideToggle();
    $(this).attr("aria-expanded", function (_, attr) {
      return attr == "true" ? "false" : "true";
    });
  });
}
