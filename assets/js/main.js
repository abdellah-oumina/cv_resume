/*  "use strict";

function portfolio_init() {
    var portfolio_grid = $('.portfolio-grid'), portfolio_filter = $('.portfolio-filters');
    if (portfolio_grid) {
        portfolio_grid.shuffle({ speed: 450, itemSelector: 'figure' });
        portfolio_filter.on("click", ".filter", function (e) {
            portfolio_grid.shuffle('update');
            e.preventDefault();
            $('.portfolio-filters .filter').parent().removeClass('active');
            $(this).parent().addClass('active');
            portfolio_grid.shuffle('shuffle', $(this).attr('data-group'));
        });
    }
}

function mobileMenuHide() {
    var windowWidth = $(window).width(), siteHeader = $('#site_header');
    if (windowWidth < 1025) {
        siteHeader.addClass('mobile-menu-hide');
        $('.menu-toggle').removeClass('open');
        setTimeout(function () {
            siteHeader.addClass('animate');
        }, 500);
    } else {
        siteHeader.removeClass('animate');
    }
}


$(function () {
    $('#widgets').validator();
    $('#widgets').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "widgets/widgets.php";
            $.ajax({
                type: "POST", url: url, data: $(this).serialize(), success: function (data) {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#widgets').find('.messages').html(alertBox);
                        $('#widgets')[0].reset();
                    }
                }
            });
            return false;
        }
    });
});

$(document).on('ready', function () {
    var movementStrength = 23;
    var height = movementStrength / $(document).height();
    var width = movementStrength / $(document).width();
    $("body").on('mousemove', function (e) {
        var pageX = e.pageX - ($(document).width() / 2), pageY = e.pageY - ($(document).height() / 2),
            newvalueX = width * pageX * -1, newvalueY = height * pageY * -1, elements = $('.lm-animated-bg');
        elements.addClass('transition');
        elements.css({ "background-position": "calc( 50% + " + newvalueX + "px ) calc( 50% + " + newvalueY + "px )", });
        setTimeout(function () {
            elements.removeClass('transition');
        }, 300);
    })
    $('.menu-toggle').on("click", function () {
        $('#site_header').addClass('animate');
        $('#site_header').toggleClass('mobile-menu-hide');
        $('.menu-toggle').toggleClass('open');
    });
    $('.main-menu').on("click", "a", function (e) {
        mobileMenuHide();
    });
    $('.sidebar-toggle').on("click", function () {
        $('#blog-sidebar').toggleClass('open');
    });
    var $portfolio_container = $(".portfolio-grid");
    $portfolio_container.imagesLoaded(function () {
        portfolio_init(this);
    });
    var $container = $(".blog-masonry");
    $container.imagesLoaded(function () {
        $container.masonry();
    });
    customScroll();

    $(".testimonials.owl-carousel").owlCarousel({
        nav: true,
        items: 3,
        loop: false,
        navText: false,
        autoHeight: true,
        margin: 25,
        responsive: { 0: { items: 1, }, 480: { items: 1, }, 768: { items: 2, }, 1200: { items: 2, } }
    });
    $(".clients.owl-carousel").imagesLoaded().owlCarousel({
        nav: true,
        items: 2,
        loop: false,
        navText: false,
        margin: 10,
        autoHeight: true,
        responsive: { 0: { items: 2, }, 768: { items: 4, }, 1200: { items: 5, } }
    });
    $('.form-control').val('').on("focusin", function () {
        $(this).parent('.form-group').addClass('form-group-focus');
    }).on("focusout", function () {
        if ($(this).val().length === 0) {
            $(this).parent('.form-group').removeClass('form-group-focus');
        }
    });
    $('body').magnificPopup({
        delegate: 'a.lightbox',
        type: 'image',
        removalDelay: 300,
        mainClass: 'mfp-fade',
        image: { titleSrc: 'title', gallery: { enabled: true }, },
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '<div class="mfp-title mfp-bottom-iframe-title"></div>' +
                '</div>',
            patterns: {
                youtube: { index: 'youtube.com/', id: null, src: '%id%?autoplay=1' },
                vimeo: { index: 'vimeo.com/', id: '/', src: '//player.vimeo.com/video/%id%?autoplay=1' },

            },
            srcAction: 'iframe_src',
        },
        callbacks: {
            markupParse: function (template, values, item) {
                values.title = item.el.attr('title');
            }
        },
    });
});

 */

!function (t) {

    var s = function (s, e) {
        this.el = t(s), this.options = t.extend({}, t.fn.typed.defaults, e), this.isInput = this.el.is("input"), this.attr = this.options.attr, this.showCursor = this.isInput ? !1 : this.options.showCursor, this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text(), this.contentType = this.options.contentType, this.typeSpeed = this.options.typeSpeed, this.startDelay = this.options.startDelay, this.backSpeed = this.options.backSpeed, this.backDelay = this.options.backDelay, this.strings = this.options.strings, this.strPos = 0, this.arrayPos = 0, this.stopNum = 0, this.loop = this.options.loop, this.loopCount = this.options.loopCount, this.curLoop = 0, this.stop = !1, this.cursorChar = this.options.cursorChar, this.shuffle = this.options.shuffle, this.sequence = [], this.build()
    };
    s.prototype = {
        constructor: s, init: function () {
            var t = this;
            t.timeout = setTimeout(function () {
                for (var s = 0; s < t.strings.length; ++s) t.sequence[s] = s;
                t.shuffle && (t.sequence = t.shuffleArray(t.sequence)), t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos)
            }, t.startDelay)
        }, build: function () {
            this.showCursor === !0 && (this.cursor = t('<span class="typed-cursor">' + this.cursorChar + "</span>"), this.el.after(this.cursor)), this.init()
        }, typewrite: function (t, s) {
            if (this.stop !== !0) {
                var e = Math.round(70 * Math.random()) + this.typeSpeed, o = this;
                o.timeout = setTimeout(function () {
                    var e = 0, r = t.substr(s);
                    if ("^" === r.charAt(0)) {
                        var i = 1;
                        /^\^\d+/.test(r) && (r = /\d+/.exec(r)[0], i += r.length, e = parseInt(r)), t = t.substring(0, s) + t.substring(s + i)
                    }
                    if ("html" === o.contentType) {
                        var n = t.substr(s).charAt(0);
                        if ("<" === n || "&" === n) {
                            var a = "", h = "";
                            for (h = "<" === n ? ">" : ";"; t.substr(s).charAt(0) !== h;) a += t.substr(s).charAt(0), s++;
                            s++, a += h
                        }
                    }
                    o.timeout = setTimeout(function () {
                        if (s === t.length) {
                            if (o.options.onStringTyped(o.arrayPos), o.arrayPos === o.strings.length - 1 && (o.options.callback(), o.curLoop++, o.loop === !1 || o.curLoop === o.loopCount)) return;
                            o.timeout = setTimeout(function () {
                                o.backspace(t, s)
                            }, o.backDelay)
                        } else {
                            0 === s && o.options.preStringTyped(o.arrayPos);
                            var e = t.substr(0, s + 1);
                            o.attr ? o.el.attr(o.attr, e) : o.isInput ? o.el.val(e) : "html" === o.contentType ? o.el.html(e) : o.el.text(e), s++, o.typewrite(t, s)
                        }
                    }, e)
                }, e)
            }
        }, backspace: function (t, s) {
            if (this.stop !== !0) {
                var e = Math.round(70 * Math.random()) + this.backSpeed, o = this;
                o.timeout = setTimeout(function () {
                    if ("html" === o.contentType && ">" === t.substr(s).charAt(0)) {
                        for (var e = ""; "<" !== t.substr(s).charAt(0);) e -= t.substr(s).charAt(0), s--;
                        s--, e += "<"
                    }
                    var r = t.substr(0, s);
                    o.attr ? o.el.attr(o.attr, r) : o.isInput ? o.el.val(r) : "html" === o.contentType ? o.el.html(r) : o.el.text(r), s > o.stopNum ? (s--, o.backspace(t, s)) : s <= o.stopNum && (o.arrayPos++, o.arrayPos === o.strings.length ? (o.arrayPos = 0, o.shuffle && (o.sequence = o.shuffleArray(o.sequence)), o.init()) : o.typewrite(o.strings[o.sequence[o.arrayPos]], s))
                }, e)
            }
        }, shuffleArray: function (t) {
            var s, e, o = t.length;
            if (o) for (; --o;) e = Math.floor(Math.random() * (o + 1)), s = t[e], t[e] = t[o], t[o] = s;
            return t
        }, reset: function () {
            var t = this;
            clearInterval(t.timeout);
            var s = this.el.attr("id");
            this.el.after('<span id="' + s + '"/>'), this.el.remove(), "undefined" != typeof this.cursor && this.cursor.remove(), t.options.resetCallback()
        }
    }, t.fn.typed = function (e) {
        return this.each(function () {
            var o = t(this), r = o.data("typed"), i = "object" == typeof e && e;
            r || o.data("typed", r = new s(this, i)), "string" == typeof e && r[e]()
        })
    }, t.fn.typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        typeSpeed: 0,
        startDelay: 0,
        backSpeed: 0,
        shuffle: !1,
        backDelay: 500,
        loop: !1,
        loopCount: !1,
        showCursor: !0,
        cursorChar: "|",
        attr: null,
        contentType: "html",
        callback: function () {
        },
        preStringTyped: function () {
        },
        onStringTyped: function () {
        },
        resetCallback: function () {
        }
    }
}(window.jQuery);

var $typed = $("#typed");
if ($typed.length > 0) {
    $typed.typed({
        strings: ["Embedded Systems Engineering", "Computer Vision Engineering", "Mobile Apps Development"],
        stringsElement: null,
        typeSpeed: 50,
        startDelay: 100,
        backSpeed: 50,
        backDelay: 300,
        loop: true,
        loopCount: 550,
        showCursor: true,
        cursorChar: "|",
        attr: null,
        contentType: "html",
    });
};



$(window).on('load', function () {
    $(".preloader").fadeOut(800, "linear");
    var ptPage = $('.animated-sections');
    if (ptPage[0]) {
        PageTransitions.init({ menu: 'ul.main-menu', });
    }
}).on('resize', function () {
    mobileMenuHide();
    $('.animated-section').each(function () {
        $(this).perfectScrollbar('update');
    });
    customScroll();
});

$('.text-rotation').owlCarousel({
    loop: true,
    dots: false,
    nav: false,
    margin: 0,
    items: 1,
    autoplay: true,
    autoplayHoverPause: false,
    autoplayTimeout: 5,
    animateOut: 'animated-section-scaleDown',
    animateIn: 'animated-section-scaleUp'
});


function customScroll() {
    var windowWidth = $(window).width();
    if (windowWidth > 1024) {
        $('.animated-section, .single-page-content').each(function () {
            $(this).perfectScrollbar();
        });
    } else {
        $('.animated-section, .single-page-content').each(function () {
            $(this).perfectScrollbar('destroy');
        });
    }
};

$('body').magnificPopup({
    delegate: 'a.lightbox',
    type: 'image',
    removalDelay: 5,
    mainClass: 'mfp-fade',
    image: { titleSrc: 'title', gallery: { enabled: true }, },
    iframe: {
        markup: '<div class="mfp-iframe-scaler">' +
            '<div class="mfp-close"></div>' +
            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
            '<div class="mfp-title mfp-bottom-iframe-title"></div>' +
            '</div>',
        patterns: {
            youtube: { index: 'youtube.com/', id: null, src: '%id%?autoplay=1' },
            vimeo: { index: 'vimeo.com/', id: '/', src: '//player.vimeo.com/video/%id%?autoplay=1' },

        },
        srcAction: 'iframe_src',
    },
    callbacks: {
        markupParse: function (template, values, item) {
            values.title = item.el.attr('title');
        }
    },
});



function mobileMenuHide() {
    var windowWidth = $(window).width(), siteHeader = $('#site_header');
    if (windowWidth < 1025) {
        siteHeader.addClass('mobile-menu-hide');
        $('.menu-toggle').removeClass('open');
        setTimeout(function () {
            siteHeader.addClass('animate');
        }, 500);
    } else {
        siteHeader.removeClass('animate');
    }
};
$('.menu-toggle').on("click", function () {
    $('#site_header').addClass('animate');
    $('#site_header').toggleClass('mobile-menu-hide');
    $('.menu-toggle').toggleClass('open');
});

$('.main-menu').on("click", "a", function (e) {
    mobileMenuHide();
});
$('.sidebar-toggle').on("click", function () {
    $('#blog-sidebar').toggleClass('open');
});



localStorage.setItem("switchState", "blue");


$('.slider').on("click", function () {

    var mode = localStorage.getItem("switchState")
    if (mode == "light") {

        console.log("light ON")

        document.getElementById('theme-style').href = 'assets/css/main.css'

        document.getElementById('udemySrc').src = 'assets/img/udemy-light.png'
        document.getElementById('udemySrc1').src = 'assets/img/udemy-light.png'
        document.getElementById('udemySrc2').src = 'assets/img/udemy-light.png'

        localStorage.setItem("switchState", "blue");
    }

    else {
        console.log("DARK ON")
        document.getElementById('theme-style').href = 'assets/css/blue.css'
        document.getElementById('udemySrc').src = 'assets/img/udemy-dark.png'
        document.getElementById('udemySrc1').src = 'assets/img/udemy-dark.png'
        document.getElementById('udemySrc2').src = 'assets/img/udemy-dark.png'
        localStorage.setItem("switchState", "light");
    }




});

/* window.onload = function () {
    var myMenu = document.getElementsByClassName("main-menu");
    myMenu.addEventListener("click", selectIemMenu);
}


function selectIemMenu(n) {
    var itemMenu = document.querySelector("main-menu nav-anim");

    if (n.target.nodeName == "LI") {
        for (i = 0; i < itemMenu.length; i++) {
            itemMenu[i].classList.add("defaultheme")
        }
        n.target.classList.add("selectedtheme")
    } 
};
*/

