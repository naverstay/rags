$(function ($) {

    initCatDropDown();

    var price_toddler = $('#price_toddler');
    var filter_price_min = $('#filter_price_min');
    var filter_price_max = $('#filter_price_max');

    noUiSlider.create(price_toddler[0], {
        animationDuration: 0,
        step: 1,
        start: [10000, 950000],
        range: {
            'min': 0,
            'max': 1000000
        },
        connect: true
    });

    price_toddler[0].noUiSlider.on('update', function (values, handle) {
        filter_price_min.val('от ' + parseInt(values[0]).toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, " "));
        filter_price_max.val('до ' + parseInt(values[1]).toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, " "));
    });

});

function initCatDropDown() {

    $('.dropdownBtn').on ('click', function (e) {
        var firedEl = $(this);
        $('.catParameter').removeClass('opened');
        firedEl.closest('.catParameter').addClass('opened');
        return false;
    });

    $('.catReset').on ('click', function (e) {
        var firedEl = $(this);

        firedEl.closest('.catParameter').removeClass('opened active');

        return false;
    });

    $('.catApply').on ('click', function (e) {
        var firedEl = $(this);

        firedEl.closest('.catParameter').removeClass('opened').addClass('active');

        return false;
    });

    body.on ('click', function (e) {
        var target = $(e.target);

        if (!target.hasClass('catParameter') && !target.closest('.catParameter').length) {
            $('.catParameter').removeClass('opened');
        }
    });

}

