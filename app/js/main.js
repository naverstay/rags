var body, html, doc, wnd;

$(function ($) {

    body = $('body');


    $('.openMobMenu').on ('click', function () {
        body.toggleClass('menu_opened');
        return false;
    });

    body.delegate('.callback_phone', 'mouseleave', function () {
        $(this).find('select.select2').data().select2.trigger("close");
    });

    initSelect2();
});

function initSelect2() {

    $('.select2').each(function (ind) {
        var slct = $(this);

        slct.select2({
            minimumResultsForSearch: Infinity,
            dropdownParent: slct.parent(),
            width: '100%'
        });
    });
}