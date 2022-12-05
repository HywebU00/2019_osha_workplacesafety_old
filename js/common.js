$(document).ready(function() {

    $('html').removeClass('no-js'); /*程式一開始就把 class="no-js" 移除*/


    // 多層選單
    var menu = $('#Header .menu');
    //如果點在外面
    $(document).on('touchend click', function(e) {
        var target = e.target;
        if (!$(target).is('#Header .menu li a')) {
            $('#Header .menu ul ul').hide();
        }
    });

    $('.menu li:has(ul)').addClass('hasChild')

    menu.find('li.hasChild').hover(
        function() { $(this).children().stop().fadeIn(200); },
        function() { $(this).children('ul').stop().fadeOut(200); }
    );


    menu.find('li').keyup(
        function() {
            $(this).siblings().children('ul').hide();
        });

    menu.find('li.hasChild').keyup(
        function() {
            $(this).children().show();
        });

    menu.find('li:last>a').focusout(
        function() {
            menu.find('li ul').hide();
        });

});

$(window).on("load resize", function(e) {
    var WindowW = $(window).width();
    var MyHref = '#';

    // console.log(WindowW);
    if (WindowW < 768) {
        $('.menu>ul>li>a').attr('href', MyHref);
        $('.menu>ul>li>a').on('touchStart touchend', function(e) {
            $(this).parent('li').siblings().find('ul').hide();
            $(this).siblings('ul').stop(true, true).toggle();

            $(this).parent('li').siblings().children('a').removeClass('here');
            $(this).parent('li').siblings().children('a').unbind("mouseenter mouseleave"); //解除hover動作


            $(this).toggleClass('here');
            e.preventDefault();
        });
    } else {

    }

});
$(function() {
    var WindowW = $(window).width();

    if (WindowW < 768) {
        $('.menu>ul>li>a').each(function(index, el) {
            var SPAN_TAG = $(this).children('span');
            var MENUA = SPAN_TAG.text();
            SPAN_TAG.hide();
            $(this).html(MENUA);
            console.log(MENUA);
        });
    } else {
        var SPAN_TAG = $(this).children('span');
        var MENUA = SPAN_TAG.text();
        SPAN_TAG.show();
        SPAN_TAG.html(MENUA);
    }

});


//gotop
$(function() {
    $("#gotop").click(function() {
        //$("html,body").stop(true,false).animate({scrollTop:0},700); //設定回頁面頂端
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });



})








// tab
jQuery(document).ready(function() {

    var _window = $(window),
        ww = _window.width(),
        wh = _window.height(),
        _header = $('.header'),
        hh = _header.outerHeight(true),
        wwNormal = 1000,
        wwMedium = 800,
        wwSmall = 767,
        wwxs = 420;


    tabSet();

    var resizeTimer1;
    _window.resize(function() {
        clearTimeout(resizeTimer1);
        resizeTimer1 = setTimeout(function() {
            ww = _window.width();
            tabSet();
        }, 200);
    });

    function tabSet() { //頁籤

        $('.tabs').each(function() {

            var _tab = $(this),
                _tabItem = _tab.find('.tabItem'),
                _tabItemA = _tabItem.children('a'),
                _tabContent = _tab.find('.tabContent'),
                tabwidth = _tab.width(),
                tabItemHeight = _tabItem.outerHeight(),
                tabContentHeight = _tab.find('.active').next().innerHeight(),
                tiGap = 2,
                tabItemLength = _tabItem.length,
                tabItemWidth;

            _tab.find('.active').next('.tabContent').show();

            if (ww > wwSmall) {
                _tabContent.css('top', tabItemHeight);
                _tab.height(tabContentHeight + tabItemHeight);
                tabItemWidth = (tabwidth - (tabItemLength - 1) * tiGap) / tabItemLength;
                _tabItem.width(tabItemWidth).css('margin-left', tiGap);
                _tabItem.first().css('margin-left', 0);
                _tabItem.last().css({ 'position': 'absolute', 'top': 0, 'right': 0 }).width(tabItemWidth + 1);
            } else {
                _tab.css('height', 'auto');
                _tabItem.width(tabwidth);
                _tabItem.css('margin-left', 0).last().css('position', 'relative');
            }

            _tabItemA.focus(tabs);
            _tabItemA.click(tabs);

            function tabs(e) {
                var _tabItemNow = $(this).parent(),
                    tvp = _tab.offset().top,
                    tabIndex = _tabItemNow.index() / 2,
                    scollDistance = tvp + tabItemHeight * tabIndex - hh;

                _tabItem.removeClass('active');
                _tabItemNow.addClass('active');

                if (ww <= wwSmall) {
                    _tabItem.not('.active').next().slideUp();
                    _tabItemNow.next().slideDown();
                    $("html,body").stop(true, false).animate({ scrollTop: scollDistance });
                } else {
                    _tabItem.not('.active').next().hide();
                    _tabItemNow.next().show();
                    tabContentHeight = _tabItemNow.next().innerHeight();
                    // _tab.height(tabContentHeight + tabItemHeight);
                }
                e.preventDefault();
            }
        });
    }



});
// $(function() {
//     var ww = $(window).width();

//     $('.tabs').find('.active').next('.tabContent').show();

//     var tw = $('.tabSet').width(),
//         tabItemHeight = $('.tabs>h2>a').innerHeight();
//     wwSmall = 767; //視窗寬度小於等於這個數值，頁籤垂直排列。css需配合調整。

//     $('.tabs').find('.tabContent').css('top', tabItemHeight);

//     $('.tabSet').each(function() { //各別處理每個頁籤組
//         var tabContentHeight = $(this).find('.active').next('.tabContent').innerHeight(),
//             tabItemLength = $(this).find('h2').length,
//             tabItemWidth = tw / tabItemLength;

//         $(this).height(tabContentHeight + tabItemHeight);
//         $(this).find('h2>a').innerWidth(tabItemWidth);
//         if (ww > wwSmall) {
//             $(this).find('h2:last-of-type').css({ position: "absolute", top: "0", right: "0" });
//             $(this).find('h2:last-of-type>a').css({ width: tabItemWidth + 1 });
//         }
//     });

//     $('.tabs>h2>a').focus(tabs);
//     $('.tabs>h2>a').click(tabs);

//     function tabs() {
//         var _aParent = $(this).parent(),
//             tvp = _aParent.parents('.tabSet').offset(),
//             tabIndex = _aParent.index() / 2,
//             scollDistance = tvp.top + tabItemHeight * tabIndex;

//         if (ww <= wwSmall) {
//             _aParent.siblings('h2').removeClass('active').next('.tabContent').slideUp();
//             _aParent.addClass('active').next().slideDown();
//             $("html,body").stop(true, false).animate({ scrollTop: scollDistance });
//         } else {
//             _aParent.siblings('h2').removeClass('active').next('.tabContent').css("display", "none");
//             _aParent.addClass('active').next('.tabContent').css("display", "block");
//         }

//         tabContentHeight = _aParent.next('.tabContent').innerHeight();
//         _aParent.parents('.tabSet').height(tabContentHeight + tabItemHeight);

//         return false;
//     }
// })

//對內連結

$(function() {
    $(".linkbtn").click(function() {
        $("#link").slideToggle(300);
        return false;
    });

})

//search block
$(function() {
    var WindowW = $(window).width();
    var dd;
    if (WindowW > 490) {
        dd = 438;
        $(".searchblock").css({ left: 0 });
        $(".btn_close").click(
            function() {
                $(".searchblock").css({ left: -1 * dd });
                $(".btn_close").css('display', 'none');
                $(".btn_open").css('display', 'block');
            }
        )
        $(".btn_open").click(
            function() {
                $(".searchblock").css({ left: 0 });
                $(".btn_close").css('display', 'block');
                $(".btn_open").css('display', 'none');
            }
        )
    } else {
        dd = WindowW;
        $(".searchblock").css({ left: -1 * dd });
        $(".btn_close").click(
            function() {
                $(".searchblock").css({ left: -1 * dd });
                $(".btn_close").css('display', 'none');
                $(".btn_open").css('display', 'block');
            }
        )
        $(".btn_open").click(
            function() {
                $(".searchblock").css({ left: 0 });
                $(".btn_close").css('display', 'block');
                $(".btn_open").css('display', 'none');
            }
        )
    }



})
// 燈箱

$(function() {

    // 
    $(".lightBoxBtn").click(function(e) {
        e.preventDefault();
        var box = $($(this).data("rel"));
        box.fadeIn();
        $('body').addClass('fix');


        box.find(".boxclose, .overlay").one("click", function() {
            box.fadeOut();
            $('body').removeClass('fix');
        });



    });


})

// 圖標顏色說明
$(function() {
    

    $('.iconcolorexplain h2').click(function() {
        $('.iconcolorexplain').toggleClass('top');
        $(this).toggleClass('closed');
    })


})