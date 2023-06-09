var PageTransitions = (function ($, options) {
    "use strict";
    var sectionsContainer = $(".animated-sections"),
        isAnimating = false,
        endCurrentPage = true,
        endNextPage = false,
        windowArea = $(window),
        animEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        },
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
        support = Modernizr.cssanimations;

    function init(options) {
        $('.animated-section').each(function () {
            var $page = $(this);
            $page.data('originalClassList', $page.attr('class'));
        });
        sectionsContainer.each(function () {
            if (location.hash === "") {
                $('section[data-id=' + pageStart + ']').addClass('section-active');
            }
        });
        $('.nav-anim').on("click", function (e) {
            e.preventDefault();
            if (isAnimating) {
                return false;
            }
            var pageTrigger = $(this);
            activeMenuItem(pageTrigger);
            Animate(pageTrigger);
            location.hash = $(this).attr('href');
        });
        window.onhashchange = function (event) {
            if (location.hash) {
                if (isAnimating) {
                    return false;
                }
                var menuLink = $(menu + ' a[href*="' + location.hash.split('/')[0] + '"]');
                activeMenuItem(menuLink);
                Animate(menuLink);
                ajaxLoader();
            }
        };
        var menu = options.menu,
            pageStart = getActiveSection();
        location.hash = pageStart;
        var menuLink = $(menu + ' a[href*="' + location.hash.split('/')[0] + '"]');
        activeMenuItem(menuLink);
        Animate(menuLink);
        $('body').append('<div id="page-ajax-loaded" class="page-ajax-loaded animated animated-section-moveFromLeft"></div>');
        ajaxLoader();
        $(".lmpixels-arrow-right").click(function () {
            var activeItem = $('.main-menu a.active').parent("li");
            activeItem.next("li").children("a").click();
            if (activeItem.is(':last-child')) {
                $('.main-menu li:first-child').children("a").click();
            }
        });
        $(".lmpixels-arrow-left").click(function () {
            var activeItem = $('.main-menu a.active').parent("li");
            activeItem.prev("li").children("a").click();
            if (activeItem.is(':first-child')) {
                $('.main-menu li:last-child').children("a").click();
            }
        });
    }

    function getActiveSection() {
        if (location.hash === "") {
            return location.hash = $('section.animated-section').first().attr('data-id');
        } else {
            return location.hash;
        }
    }

    function activeMenuItem(item) {
        if (!item) {
            return false;
        }
        var navLink = $(item);
        navLink = navLink['0'];
        navLink = $(navLink);
        if (navLink) {
            $('ul.main-menu a').removeClass('active');
            navLink.addClass('active');
        }
    }

    function ajaxLoader() {
        var ajaxLoadedContent = $('#page-ajax-loaded');

        function showContent() {
            ajaxLoadedContent.removeClass('animated-section-moveToRight closed');
            ajaxLoadedContent.show();
            $('body').addClass('ajax-page-visible');
        }

        function hideContent() {
            $('#page-ajax-loaded').addClass('animated-section-moveToRight closed');
            $('body').removeClass('ajax-page-visible');
            setTimeout(function () {
                $('#page-ajax-loaded.closed').html('');
                ajaxLoadedContent.hide();
            }, 500);
        }
        var href = $('.ajax-page-load').each(function () {
            href = $(this).attr('href');
            if (location.hash == location.hash.split('/')[0] + '/' + href.substr(0, href.length - 5)) {
                var toLoad = $(this).attr('href');
                showContent();
                ajaxLoadedContent.load(toLoad);
                return false;
            }
        });
        $(document).on("click", ".main-menu, #ajax-page-close-button", function (e) {
            e.preventDefault();
            hideContent();
            location.hash = location.hash.split('/')[0];
        }).on("click", ".ajax-page-load", function () {
            var hash = location.hash.split('/')[0] + '/' + $(this).attr('href').substr(0, $(this).attr('href').length - 5);
            location.hash = hash;
            showContent();
            return false;
        });
    }

    function Animate($pageTrigger, gotoPage) {
        if (!($pageTrigger.attr('data-animation'))) {
            var animNumber = parseInt(Math.floor(Math.random() * 22) + 1);
            $pageTrigger.data('animation', animNumber);
        }
        var animation = $pageTrigger.data('animation').toString(),
            gotoPage, inClass, outClass, selectedAnimNumber;
        if (animation.indexOf('-') != -1) {
            var randomAnimList = animation.split('-');
            selectedAnimNumber = parseInt(randomAnimList[(Math.floor(Math.random() * randomAnimList.length))]);
        } else {
            selectedAnimNumber = parseInt(animation);
        }
        if (selectedAnimNumber > 22) {
            alert("Transition.js : Invalid 'data-animation' attribute configuration. Animation number should not be greater than 67");
            return false;
        }
        // 3 4 11 12
        switch (selectedAnimNumber) {

            case 0:
                inClass = 'animated-section-moveFromBottom';
                outClass = 'animated-section-moveToTop';
                break;
            case 1:
                inClass = 'animated-section-moveFromTop';
                outClass = 'animated-section-moveToBottom';
                break;

            case 2:
                inClass = 'animated-section-moveFromBottomFade';
                outClass = 'animated-section-moveToTopFade';
                break;
            case 3:
                inClass = 'animated-section-moveFromTopFade';
                outClass = 'animated-section-moveToBottomFade';
                break;
            case 4:
                inClass = 'animated-section-moveFromBottom animated-section-ontop';
                outClass = 'animated-section-scaleDown';
                break;
            case 5:
                inClass = 'animated-section-moveFromTop animated-section-ontop';
                outClass = 'animated-section-scaleDown';
                break;
            case 6:
                inClass = 'animated-section-scaleUpDown animated-section-delay300';
                outClass = 'animated-section-scaleDown';
                break;
            case 7:
                inClass = 'animated-section-scaleUp animated-section-delay300';
                outClass = 'animated-section-scaleDownUp';
                break;

            case 8:
                inClass = 'animated-section-scaleUp';
                outClass = 'animated-section-moveToTop animated-section-ontop';
                break;
            case 9:
                inClass = 'animated-section-scaleUp';
                outClass = 'animated-section-moveToBottom animated-section-ontop';
                break;
            case 10:
                inClass = 'animated-section-flipInBottom animated-section-delay500';
                outClass = 'animated-section-flipOutTop';
                break;
            case 11:
                inClass = 'animated-section-flipInTop animated-section-delay500';
                outClass = 'animated-section-flipOutBottom';
                break;
            case 12:
                inClass = 'animated-section-scaleUp';
                outClass = 'animated-section-rotateFall animated-section-ontop';
                break;
            case 13:
                inClass = 'animated-section-moveFromTop';
                outClass = 'animated-section-rotatePushBottom';
                break;
            case 14:
                inClass = 'animated-section-rotatePullBottom animated-section-delay180';
                outClass = 'animated-section-rotatePushTop';
                break;
            case 15:
                inClass = 'animated-section-rotatePullTop animated-section-delay180';
                outClass = 'animated-section-rotatePushBottom';
                break;
            case 16:
                inClass = 'animated-section-moveFromRightFade';
                outClass = 'animated-section-rotateFoldLeft';
                break;
            case 17:
                inClass = 'animated-section-moveFromBottomFade';
                outClass = 'animated-section-rotateFoldTop';
                break;
            case 18:
                inClass = 'animated-section-moveFromTopFade';
                outClass = 'animated-section-rotateFoldBottom';
                break;
            case 19:
                inClass = 'animated-section-rotateCubeLeftIn';
                outClass = 'animated-section-rotateCubeLeftOut animated-section-ontop';
                break;
            case 20:
                inClass = 'animated-section-rotateCubeRightIn';
                outClass = 'animated-section-rotateCubeRightOut animated-section-ontop';
                break;

            case 21:
                inClass = 'animated-section-rotateCubeTopIn';
                outClass = 'animated-section-rotateCubeTopOut animated-section-ontop';
                break;
            case 22:
                inClass = 'animated-section-rotateCubeBottomIn';
                outClass = 'animated-section-rotateCubeBottomOut animated-section-ontop';
                break;
        }
        var $pageWrapper = sectionsContainer,
            currentPageId = $pageWrapper.data('current'),
            tempPageIndex, linkhref = $pageTrigger.attr('href').split("#"),
            gotoPage = linkhref[1];
        tempPageIndex = currentPageId;
        var $currentPage = $('section[data-id="' + currentPageId + '"]');
        currentPageId = gotoPage;
        if (tempPageIndex != currentPageId) {
            isAnimating = true;
            $pageWrapper.data('current', currentPageId);
            var $nextPage = $('section[data-id=' + currentPageId + ']').addClass('section-active');
            $nextPage.scrollTop(0);
            $currentPage.addClass(outClass).on(animEndEventName, function () {
                $currentPage.off(animEndEventName);
                endCurrentPage = true;
                if (endNextPage) {
                    onEndAnimation($pageWrapper, $nextPage, $currentPage);
                    endCurrentPage = false;
                }
            });
            $nextPage.addClass(inClass).on(animEndEventName, function () {
                $nextPage.off(animEndEventName);
                endNextPage = true;
                if (endCurrentPage) {
                    onEndAnimation($pageWrapper, $nextPage, $currentPage);
                    endNextPage = false;
                    isAnimating = false;
                }
            });
        } else {
            isAnimating = false;
        }
        if (!support) {
            onEndAnimation($currentPage, $nextPage);
        }
    }

    function onEndAnimation($pageWrapper, $nextPage, $currentPage) {
        resetPage($nextPage, $currentPage);
    }

    function resetPage($nextPage, $currentPage) {
        $currentPage.attr('class', $currentPage.data('originalClassList'));
        $nextPage.attr('class', $nextPage.data('originalClassList') + ' section-active');
    }
    return {
        init: init,
    };
})(jQuery);