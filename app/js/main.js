var body, html, doc, wnd, closeMenuTimer, callback_popup;

$(function ($) {

    body = $('body');


    $('.openMobMenu').on ('click', function () {
        clearTimeout(closeMenuTimer);

        if (body.hasClass('menu_opened')) {
            closeMenuTimer = setTimeout(function () {
                body.removeClass('icon_close');
            }, 250);
        }

        body.addClass('icon_close').toggleClass('menu_opened');
        return false;
    });

    body.delegate('.callback_phone', 'mouseleave', function () {
        $(this).find('select.select2').data().select2.trigger("close");
    });

    callback_popup = $('#callback_popup').dialog({
        autoOpen: false,
        modal: true,
        closeOnEscape: true,
        closeText: '',
        dialogClass: 'no_close_mod dialog_g_size_1',
        //appendTo: '.wrapper',
        width: 300,
        draggable: true,
        collision: "fit",
        position: {my: "top center", at: "top center", of: window},
        open: function (event, ui) {
            body.addClass('modal_opened');
        },
        close: function (event, ui) {
            body.removeClass('modal_opened');
        }
    });

    $('.callbackBtn').on ('click', function () {

        callback_popup.dialog('open');

        return false;
    });

    initTabs();
    
    initSelect2();

    all_dialog_close();
  
});

function initTabs() {


    $('.tabBlock').each(function (ind) {
        var tab = $(this);

        tab.tabs({
            active: 0,
            tabContext: tab.attr('data-tab-context'),
            activate: function (e, u) {

            }
        });
    });
}

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

function all_dialog_close() {
    body.on('click', '.ui-widget-overlay, .popupClose', all_dialog_close_gl);
}

function all_dialog_close_gl() {
    $(".ui-dialog-content").each(function () {
        var $this = $(this);
        if (!$this.parent().hasClass('always_open')) {
            $this.dialog("close");
        }
    });
}