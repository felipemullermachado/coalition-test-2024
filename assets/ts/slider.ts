import $ from 'jquery'
import './libs/slick.min.js'

export default function () {
  $('.slider').slick({
    dots: true,
    infinite: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
  })
}