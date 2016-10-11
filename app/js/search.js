var review_popup;

$(function ($) {

    initCatDropDown();

    initToddler();

    initMask();

    initReviewPopup();

});

function initReviewPopup() {

    review_popup = $('#review_popup').dialog({
        autoOpen: false,
        modal: true,
        closeOnEscape: true,
        closeText: '',
        dialogClass: 'no_close_mod dialog_g_size_2',
        //appendTo: '.wrapper',
        width: 750,
        draggable: true,
        collision: "fit",
        position: {my: "top center", at: "top center", of: window},
        open: function (event, ui) {
            body.addClass('modal_opened overlay_v2');
        },
        close: function (event, ui) {
            body.removeClass('modal_opened overlay_v2');
        }
    });

    $('.openReview').on ('click', function () {

        review_popup.dialog('open');

        return false;
    });

}

function initToddler() {
    var manual_update = true;
    var toddler_update = false;
    var price_range = [0, 1000000];
    var price_toddler = $('#price_toddler');
    var filter_price_min = $('#filter_price_min');
    var filter_price_max = $('#filter_price_max');

    filter_price_min.on('change', function (e) {
        var new_val = parseInt((this.value).replace(/\D*/g, '') || 0), old_val = parseInt(price_toddler[0].noUiSlider.get()[0]);

        console.log(new_val, e.type);

        if (new_val != old_val) {
            price_toddler[0].noUiSlider.set([new_val, null]);
        }

        if (e.type.toLowerCase() == 'keyup') manual_update = true;

        console.log(manual_update);

    });

    filter_price_max.on('change', function (e) {
        var new_val = parseInt((this.value).replace(/\D*/g, '') || 0), old_val = parseInt(price_toddler[0].noUiSlider.get()[1]);

        if (new_val != old_val) {
            price_toddler[0].noUiSlider.set([null, new_val]);
        }

        if (e.type.toLowerCase() == 'keyup') manual_update = true;

        console.log(manual_update);
    });

    noUiSlider.create(price_toddler[0], {
        animationDuration: 0,
        step: 1,
        start: [10000, 950000],
        range: {
            'min': price_range[0],
            'max': price_range[1]
        },
        connect: true
    });

    price_toddler[0].noUiSlider.on('update', function (values, handle) {

        if (!manual_update) {
            filter_price_min.val(parseInt(values[0]));
            filter_price_max.val(parseInt(values[1]));
        }

        manual_update = false;

    });
}

function initMask() {
    $("input").filter(function (i, el) {
        return $(el).attr('data-inputmask') != void 0;
    }).inputmask();
}

function formatNum(num) {
    return num.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, " ");
}

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

