/* 
* @Author: Marte
* @Date:   2016-05-20 08:48:03
* @Last Modified by:   Vita
* @Last Modified time: 2016-11-03 09:11:59
*/

$(document).ready(function(){
    $(window).on('load resize', function(event) {
        $(".panel").css({"height":$(window).height()});
        // if($(window).width()>1024){
        //     $.scrollify({
        //         section:".panel"
        //     });
        //     $(".scroll").click(function(e) {
        //         e.preventDefault();
        //         $.scrollify("move",$(this).attr("href"));
        //     });
        // }
        // $(".panel").css({"height":$(window).height()});
        // $.scrollify({
        //     section:".panel"
        // });
        var page4_contentH = $(".page4-title").height() + parseInt($(".page4-title").css("paddingTop"))+$(".page4-content .page2-content-title").height()+10+30;
        var winH = $(window).height();
        $(".page4-content .page4-toggle").css("height",winH-page4_contentH);

        var winW = $(window).width();
        var page2T = $(".page2-top").height() + parseInt($(".page2-top").css("paddingTop")) + parseInt($(".page2-content").css("marginTop"))+50;
        var page2L = (winW - $(".page2-content").width()) /2;
        $(".page2-bg1").css({
            left: -page2L,
            top: -page2T,
            width:winW,
            height:winH
        });

        $(".page2-content .toggle-body ul").css("height",$(".page2-content .toggle-body li").height());


    });
    $(".page2-content .toggle-body ul").css("height",$(".page2-content .toggle-body li").height());
    $('.index-banner .bannerImg').cycle({
        fx:'fade',
        pager:'.index-banner .dian',
        timeout: 8000, // 幻灯片过渡间隔，单位是毫秒 (若值为0则不自动切换)
        pause:1 , // 过渡的速度
        prev:".index-banner .prev",
        next:".index-banner .next",
        after: set1,
        before: set2
    });
    // $('.bg').imgLiquid();
    
    // 一屏弹窗
    $(".click-head").click(function(event) {
        $(this).fadeOut('fast', function() {
            $(".click-body").slideDown("slow");
        });
        
    });
    $(".click-show").click(function(event) {
        $(".click-body").slideUp("slow",function(){
            $(".click-head").fadeIn("fast");
        });
    });
    // 二屏轮播
    $(".page2-bg .page2-bg1").eq(0).show();
    $('#bannerImg1 .bannerImg').cycle({
        fx:'fade',
        pager:'#bannerImg1 .dian',
        timeout: 0, // 幻灯片过渡间隔，单位是毫秒 (若值为0则不自动切换)
        pause:1 , // 过渡的速度
        prev:"#bannerImg1 .prev",
        next:"#bannerImg1 .next",
        after: p2a,
        before: p2b
        
    });

   // var page2s = ["现代馆","北欧馆","欧式馆","韩式馆","美式馆","乡村馆","中式馆","儿童馆"];
    // $("#bannerImg1 li").each(function(i) {
    //     page2s[i] = $(this).find("img").attr("title");
    // });
    // for (var i = 0; i < page2s.length; i++) {
    //     $("#bannerImg1 .dian").find('a').html(page2s[i]);
    // };
    // $("#bannerImg1 .dian a").each(function(i) {
    //     $(this).html(page2s[i]+"<i></i>");
    // });
    // $("#bannerImg1 .dian a").eq(0).addClass('page2-on');
     $("#bannerImg1 .dian a").each(function(i) {
        if($(this).attr('href')=='#'){
            $(this).remove();
        }       
     });

    // 第四屏
    $(".page4-content .toggle-body").eq(0).show();
    $(".page4-content li").click(function(event) {
        var index = $(this).index();
        $(this).addClass('page2-on').siblings('li').removeClass('page2-on');
        $(".page4-content .toggle-body").eq(index).stop().fadeIn("slow");
        $(".page4-content .toggle-body").eq(index).siblings('.toggle-body').stop().fadeOut("slow");
    });
    // 第五屏
    var myIndex = 10;
    $(".page5-toggle .page5-body").eq(0).css('opacity', '1');
    $(".page5-content .page2-content-title").find('li').click(function(event) {
        var index = $(this).index();
        myIndex++;
        $(this).addClass('page2-on').siblings('li').removeClass('page2-on');
        $(".page5-toggle .page5-body").eq(index).animate({zIndex:myIndex,opacity:1}, 400);
        $(".page5-toggle .page5-body").eq(index).siblings('.page5-body').animate({opacity:0}, 400);
    });
    $('.page5-yingshi .bannerImg').cycle({
        fx:'fade',
        // pager:'.index-banner .dian',
        timeout:0, // 幻灯片过渡间隔，单位是毫秒 (若值为0则不自动切换)
        pause:1 , // 过渡的速度
        prev:".page5-yingshi .prev",
        next:".page5-yingshi .next"
    });
    $('.page5-xinwen .bannerImg').cycle({
        fx:'fade',
        // pager:'.index-banner .dian',
        timeout:0, // 幻灯片过渡间隔，单位是毫秒 (若值为0则不自动切换)
        pause:1 , // 过渡的速度
        prev:".page5-xinwen .prev",
        next:".page5-xinwen .next"
    });
    // 弹窗视频
     $(".page5-toggle .page5-yingshi").find('.page5-block').click(function(event) {
        $(".page5-layout").fadeIn("500", function() {
            // onWidthChange();
        });
     });
    $(".page5-close").click(function(event) {
         $(".page5-layout").fadeOut("slow");
         $(".page5-layout .video-js .vjs-tech").get(0).pause();
    });

});
function set1(c,a,b){
  $(this).find(".banner-text").delay(100).fadeIn(1000);
  $(this).find(".banner-text").delay(100).animate({
    top:"50%"},1000)
};
function set2(){
  $(this).find(".banner-text").css({
    display:"none",top:"60%"})
};

 function onWidthChange(){
    if( $(window).width() > 320 ) {
        var h = $('.page5-layout .page5-video').height();
        var mt = h/2+50;
        $('.page5-layout .page5-video').height(h);
        $(".page5-layout .page5-video").css("marginTop",-mt);
    }
    setTimeout(onWidthChange,500);
}
function p2a(){
    $(this).fadeIn();
}
function p2b(){
    $(this).fadeOut();
}


