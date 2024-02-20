import $ from "jquery";

export default function () {
  function toggleTabsAccordion() {
    if ($(window).width() < 768) {
      $(".tabs").hide();
      $(".accordion").show();
    } else {
      $(".tabs").show();
      $(".accordion").hide();
    }
  }

  $(window).resize(function () {
    toggleTabsAccordion();
  });

  toggleTabsAccordion();

  $(".tab").click(function () {
    let targetContent = $(this).attr("aria-controls");
    $(".tab").removeClass("active").attr("aria-selected", "false");
    $(this).addClass("active").attr("aria-selected", "true");
    let classes = $(".bkg-climb").attr("class").split(" ");
    $(".bkg-climb").removeClass(classes[1]);
    $(".bkg-climb").addClass(targetContent);
    $(".tab-content").hide();
    $("#" + targetContent).show();
  });

  $(".accordion .accordion-item:not(:first-of-type) .accordion-header").attr("aria-expanded", "false");
  $(".accordion .accordion-item:not(:first-of-type) .accordion-content").hide();

  $(".accordion-header").click(function () {
    let targetContent = $(this).attr("aria-controls");
    let classes = $(".bkg-climb").attr("class").split(" ");
    $(".bkg-climb").removeClass(classes[1]);
    $(".bkg-climb").addClass(targetContent);
    $(".accordion-content").not($(this).next(".accordion-content")).slideUp();
    $(".accordion-header").not($(this)).attr("aria-expanded", "false");
    $(this).next(".accordion-content").slideToggle();
    $(this).attr("aria-expanded", function (_, attr) {
      return attr == "true" ? "false" : "true";
    });
  });
}
