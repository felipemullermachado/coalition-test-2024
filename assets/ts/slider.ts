import $ from 'jquery'
import './libs/slick.min.js'

export default function () {
  $('.slider').slick({
    dots: true,
    infinite: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ]
  })
}