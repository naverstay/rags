var mainSlider;

$(function ($) {


    initMainSlider();

});

function initMainSlider() {

    console.log($('.mainSlider'));

    mainSlider = $('.mainSlider').slick({
        dots: true,
        mobileFirst: true,
        infinite: false,
        arrows: true,
        //variableWidth: true,
        speed: 600,
        zIndex: 1,
        initialSlide: 0,
        //centerPadding: '0',
        slide: '.mainSlider .slide',
        prevArrow: '.mainSlider .slide_prev',
        nextArrow: '.mainSlider .slide_next',
        //appendDots: sld.parent().find('.slider_dots'),
        slidesToShow: 1,
        touchThreshold: 10

    });
}