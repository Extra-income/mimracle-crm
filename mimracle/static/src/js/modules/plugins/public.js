function isMobile() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return true; 
    } else {
        return false;
    }
}

// if(isMobile()){
//     var url = window.location.href;
//     var newurl = url.replace("www.linshimuye.cn", "wap.linshimuye.com");
//     window.location.href = newurl;
// }


$(document).ready(function(){
    $(window).on('load resize', function(event) {
        var winH = $(window).height();
        var winW = $(window).width();
        $(".index-banner").css({"height":winH,"width":winW});
        var float_btnH = $(".float-btn").height();
        $(".float-btn").css('marginTop', -float_btnH/2);

        var payment2_showH = $(".payment2-list").height();
        $(".payment2-show").css("height",payment2_showH);

        var s2_textH = $(".section2-contentl img").height();
        $(".section2-contentr").css("height",s2_textH);
        var s3_contentH =$(".section3 .about-title").height()+ parseInt($(".about-title").css("paddingTop"))+parseInt($(".s3-content").css("paddingTop"));
        $(".s3-content").css("height",winH-s3_contentH);
        var s3_body = parseInt($(".s3-focus .owl-stage-outer").height())-parseInt($(".s3-focus .owl-stage-outer h3").css("paddingBottom"))-$(".s3-focus .owl-stage-outer h3").height();
        $(".s3-body").css("height",s3_body);

        $(".s4-text").css("height",$(".s4-content").height());

        // 体验馆
        $(".three-block1l").css("height",$(".three-block1r").height());
        $(".three-block2r").css("height",$(".three-block2l").height());

    });
    var winH = $(window).height();
    var winW = $(window).width();
    // 导航菜单
    $(".menu").click(function(event) {
        $(".header .container").addClass('active');
    });
    $(window).scroll(function(event) {
        if($(window).scrollTop()>0){
            $(".header .container").removeClass('active');
        }else{
            $(".header .container").addClass('active');
        }
    });
    // 浮动窗口
    $(".float-btn").hover(function() {
        $(this).addClass('float-hover');
    }, function() {
        $(this).removeClass('float-hover');
    });

    $(".lstop").click(function(event) {
        $("html,body").animate({"scrollTop":0}, 500);
    });



    // 人力资源--薪酬福利
    $(".payment2-show .payment2-toggle").eq(0).css({
        opacity: '1',
        zIndex: '1'
    });
    var myIndex =10;
    $(".payment2-list").find('li').mouseenter(function(event) {
        $(this).addClass('list-on').siblings('li').removeClass('list-on');
        var index = $(this).index();
        myIndex++;
        $(".payment2-show .payment2-toggle").eq(index).animate({"zIndex":myIndex,"opacity":1}, 400);
        $(".payment2-show .payment2-toggle").eq(index).siblings('.payment2-toggle').animate({"opacity":0}, 400);
    });

    $(".inside-footerd .text").focus(function(event) {
        var user=$(this).val();
        if(user=="搜索"){
            $(this).val("");
        }
    }).blur(function(event) {
        if($(".inside-footerd .text").val()==""){
            $(".inside-footerd .text").val("搜索");
        }
    });
    // 人力资源-人才招聘
    $(".talent-screen-body li").mouseenter(function(event) {
        $(this).addClass('li-on').siblings('li').removeClass('li-on');
    });
    $(".talent-screen-head").click(function(event) {
        $(this).next().slideToggle("fast");
    });
    $(".talent-screen-body li").click(function(event) {
        $(this).addClass('li-on').siblings('li').removeClass('li-on');
        var liT = $(this).text(),
            liV = $(this).attr("value");
        $(this).parent("ul").parent().siblings('.talent-screen-head').text(liT);
        $(this).parent("ul").parent().siblings("input[type='hidden']").val(liV);
        $(this).parent("ul").parent().slideUp("fast");
    });
    if($(".talent-screen-body").length > 0){
        $(".talent-screen-body li").each(function(index, el) {
            var liV = $(this).attr("value");
            if($(this).hasClass("li-on")){
                $(this).parent("ul").parent().siblings('.talent-screen-head').text(liV);
            }
        });
    }

    $(".talent-post .talent-post-head").hover(function() {
        $(this).addClass('head-on');
    }, function() {
        $(this).removeClass('head-on');
    });
    $(".talent-post .talent-post-head").click(function(event) {
        $(this).next().slideToggle("fast");
        $(this).parent("li").siblings('li').children('.talent-post-body').slideUp("fast");
    });
    // 人力资源-团队合作------修改
    $(".team-content .team-pic").click(function(event) {
        var rel=$(this).find('img').attr('rel');
        $(".team-layout .team-layout-pic img").attr('src',rel);
        $(".team-layout").fadeIn(400);
    });
    $(".team-layout,.team-layout-pic .close").click(function(event) {
        $(".team-layout").fadeOut(200);
    });





    // 媒体中心-影视广告------
/*    $(".movie-toggle .movie-body").eq(0).show();
    $(".movie-title a").click(function(event) {
        $(this).addClass('title-on').siblings('a').removeClass('title-on');
        var index = $(this).index();
        $(".movie-toggle .movie-body").eq(index).fadeIn("slow").siblings('.movie-body').hide();
    });
    $(".news-title li").click(function(event) {
        $(this).addClass('title-on').siblings('li').removeClass('title-on');
    });*/
    // 会员中心
     setTimeout(function(){$(".menber-focus .focus-text1").animate({"top":0,"opacity":1}, 800)},500);
     setTimeout(function(){$(".menber-focus .focus-text2").animate({"top":0,"opacity":1}, 800)},1100);
     setTimeout(function(){$(".menber-focus .focus-text3").animate({"top":0,"opacity":1}, 800)},1600);
     setTimeout(function(){$(".menber-focus .focus-text4").animate({"top":0,"opacity":1}, 800)},2100);
     setTimeout(function(){$(".menber-focus .focus-text5").animate({"top":0,"opacity":1}, 800)},2600);
     
    $(".menber-title").find('a').click(function(event) {
        $(this).addClass('title-on').siblings('a').removeClass('title-on');
    });

    $('.menber-choose .liaojie label').click(function(){
        var radioId = $(this).attr('name');
        $('.menber-choose .liaojie label').removeAttr('class');
        $(this).attr('class', 'checked');
        $('input[type="radio"]').removeAttr('checked');
        $('#' + radioId).attr('checked', 'checked');
    });
    $('.menber-choose .xihuan label').click(function(){
        var radioId = $(this).attr('name');
        $('.menber-choose .xihuan label').removeAttr('class');
        $(this).attr('class', 'checked');
        $('input[type="radio"]').removeAttr('checked');
        $('#' + radioId).attr('checked', 'checked');
    });
    // 登录弹窗
    $("#login .login-close").click(function(event) {
        $("#login").fadeOut("slow");
    });
    $(".see-menber,.c-click").click(function(event) {
        $("#login").fadeIn("slow");
    });
    $(".reg-login").click(function(event) {
        $("#regist").hide();
        $("#login").fadeIn("slow");
    });
    // 注册弹窗
    $("#regist .login-close").click(function(event) {
        $("#regist").fadeOut("slow");
    });
    $(".c-regist").click(function(event) {
        $("#regist").fadeIn("slow");
    });
    // 找回密码弹窗
    $("#getpass .login-close").click(function(event) {
        $("#getpass").fadeOut("slow");
    });
    $(".c-getpass").click(function(event) {
        $("#getpass").fadeIn("slow");
    });
    $(".get-pass").click(function(event) {
        $("#login").hide();
        $("#getpass").fadeIn("slow");
    });

    // 关于林氏
    $(".s2-video").click(function(event) {
        $(".page5-layout").fadeIn("slow");
    });
    $(".page5-close").on('click',function(event) {
        $(".page5-layout").fadeOut("slow");
        if($('.huigu-video').length>0){
            // $("head style").remove();
            $(".page5-video video").remove();
            $(".page5-video div").remove();
            // $("script[name='videoscript']").remove();
            // $("link[name='videocss']").remove();

        }else{
            $(".page5-layout .video-js .vjs-tech").get(0).pause();
        }
    });

    // 公益助学
    $(".huigu-video").click(function(event) {
        var url = $(this).attr("rel"),
            id = $(this).data("id"),
            // css = "<link name='videocss' href='\/Public\/Lsmy\/style\/video-js.css' rel='stylesheet'>",
            // script = "<script name='videoscript' src='\/Public\/Lsmy\/js\/video.js'><\/script>",
            data = '<video id="example_video_'+id+'" class="video-js vjs-fluid vjs-controls-enabled vjs-mux preview-player-dimensions vjs-has-started vjs-paused vjs-user-inactive" controls preload="auto" width="640" data-setup="'+"{ techOrder: ['flash','html5']}"+'"><source src="'+url+'" type="video/mp4" /></video>';
        // $("head").append(css+script);
        $(".page5-close").before(data);
        $(".page5-layout").fadeIn("slow");
    });

    // 体验馆
    $(".exyouhui a").hover(function() {
        $(this).children('.exyouhui-text').stop().animate({"bottom":0,"opacity":1}, 800);
    }, function() {
        $(this).children('.exyouhui-text').stop().animate({"bottom":"-82px","opacity":0}, 800);
    });
    $(".exstyle-list li").mouseenter(function(event) {
        $(this).find('a').children('.exstyle-body').stop().animate({"opacity":1}, 800);
        $(this).siblings('li').find('a').children('.exstyle-body').stop().animate({"opacity":0}, 500);
    });
    $(".layout-map").fadeOut();
    $(".map-close").click(function(event) {
        $(".layout-map").fadeOut("fast");
    });
    $(".three-block1l-text .see-map").click(function(event) {
		$(".layout-map").css({'filter':'alpha(Opacity=100)','-moz-opacity':'1','opacity':'1'}).fadeIn("slow");
    });  

    //提交预约导购 数据
    $(".three-block2r-text").find('input[name="submit"]').click(function(){
        var title = $('.three-block2r-text select[name="store"] option:selected').val(),
            truename = $('.three-block2r-text input[name="truename"]').val(),
            telephone = $('.three-block2r-text input[name="telephone"]').val(),
            date = $('.three-block2r-text input[name="date"]').val(),
            time = $('.three-block2r-text select[name="time"] option:selected').val(),
            address = $('.three-block2r-text input[name="address"]').val();
        $.post("/index.php?m=Ajax&a=appointment",{title:title,truename:truename,telephone:telephone,date:date,time:time,address:address},function(data){
            if(data.r){
                $(".three-block2r-text").find('input[type="text"]').val('');
                $(".three-block2r-text").find('select').val('');
                alert(data.msg);
            }else{
                alert(data.msg);
            }
        },"json")
    })

    
    $('.three-block1l-text').find('input[name="yuyuebutton"]').click(function(){
        var telephone = $('.three-block1l-text input[name="telephone"]').val(),
            id = $('.three-block1l-text input[name="id"]').val();
        $.post("/index.php?m=Ajax&a=smsaddress",{id:id,telephone:telephone},function(data){
            if(data.r){
                $(".three-block1l-text").find('input[type="text"]').val('');
                alert(data.msg);
            }else{
                alert(data.msg);
            }
        },"json")
    })




    // 品牌活动-最新活动详情
    $(".brnews-tuijian").on({
        mouseenter:function(){
         $(this).siblings('li').fadeTo(300,.5);
         },
         mouseleave:function(){
         $(this).siblings('li').fadeTo(0,1);
         }
    },"ul li")

    if((".brnews-detail .brnews-zan").length>0){
        /*setTimeout(function(){
			 $.post("/Ajax/checklike.html",{id:$(".brnews-zan").data('id')},
				 function(data){
					if(data=='yes'){
                        $(".brnews-zan").css("border","1px solid #ddd");
                        $(".brnews-zan div").css("background-color","#ddd").addClass('in');
                    }
				 },"text");
        },1); */
        $(".brnews-zan").click(function(){   
            var like = $(this) 
				id = like.data('id');
			if(!like.find('div').hasClass('in')){
            $.ajax({
                type:"POST",   
                url:"/Ajax/dynamiclike.html",   
                data:{id:id},   
                cache:false, 
                success:function(data){
                    if(data=='in' || data=='yes'){
                        $(".brnews-zan").css("border","1px solid #ddd");
                        $(".brnews-zan div").css("background-color","#ddd").addClass('in');
                    }
                }   
            });
			}
            return false;   
        });
    }

    // 人才招聘
    $(".talent-way p").eq(0).show();
    $(".talent-way-center a").mouseenter(function(event) {
        var index = $(this).index();
        $(".talent-way p").eq(index).show().siblings('p').hide();
    });
    // 公益助学
    $(".huigu-video").click(function(event) {
        $("#huigu-layout").fadeIn("slow");
    });
    $("#huigu-close").click(function(event) {
        $("#huigu-layout").fadeOut("slow");
    });

    // 关于林氏
    

    var dateW = $("#dates li").length *135;
    $("#dates").css("width",dateW);
    var issuesL = $("#issues li").length;
    var num=0;
    var In = 0;
    var myIndex = 3;
    $("#dates li").eq(0).addClass('on');
    // var myIndex = 10
    $("#dates li").click(function(event) {
        myIndex++
        var index = $(this).index()
        $(this).addClass('on').siblings().removeClass("on");
        $("#issues li").eq(index).animate({"opacity":1,"zIndex":myIndex}, 200);
        $("#issues li").eq(index).siblings('li').css("opacity",0);
        if (index>5) {
            In++;
            if(In>issuesL-5){In==0}
            $("#dates").animate({"marginLeft":-(index-5)*135}, 200);
        }else{
            In=0;
            $("#dates").animate({"marginLeft":In*0}, 200);

        }

        num = index;
    });
    $("#next").click(function(event) {           
        num++
        myIndex++
        if(num>issuesL-1){num=0}
        $("#dates li").eq(num).addClass('on').siblings().removeClass("on");
        $("#issues li").eq(num).animate({"opacity":1,"zIndex":myIndex}, 200);
        $("#issues li").eq(num).siblings('li').css("opacity",0);
        if (num>6) {
            In++;
            if(In>issuesL-5){In==0}
            $("#dates").animate({"marginLeft":-(num-6)*135}, 200);
        }else{
            In=0;
            $("#dates").animate({"marginLeft":In*0}, 200);

        }

    });        
    $("#prev").click(function(event) {           
        num--
        myIndex++            
        if(num<0){num=issuesL-1}
        $("#dates li").eq(num).addClass('on').siblings().removeClass("on");
        $("#issues li").eq(num).animate({"opacity":1,"zIndex":myIndex}, 200);
        $("#issues li").eq(num).siblings('li').css("opacity",0);
        if (num>6) {
            In++;
            if(In>issuesL-5){In==0}
            $("#dates").animate({"marginLeft":-(num-6)*135}, 200);
        }else{
            In=0;
            $("#dates").animate({"marginLeft":In*0}, 200);

        }
    }); 


    
});

function select_city(){
    var id = $("#area option:selected").data("id");
    $("#city").html('<option value="">请选择城市</option>');  
    $.ajax({type: "post",url: "/index.php?m=Ajax&a=storearea",data: "id="+id,dataType: "json",
        success: function(msg){
            var tbody = "";
            $.each(msg.optionss,function(n,value){
                var trs = "";
                trs += "<option value='"+ value.name +"' data-id='"+value.typeid+"'>"+value.name+"</option>";
                tbody += trs;
            })
            $("#city").append(tbody);
        }
    });
}
function select_store(){
    var id = $("#city option:selected").data("id");
    $("#store").html('<option value="">请选择体验馆</option>');  
    $.ajax({type: "post",url: "/index.php?m=Ajax&a=storecity",data: "id="+id,dataType: "json",
        success: function(msg){
            var tbody = "";
            $.each(msg.optionss,function(n,value){
                var trs = "";
                trs += "<option value='"+ value.title +"'>"+value.title+"</option>";
                tbody += trs;
            })
            $("#store").append(tbody);
        }
    });
}
function resetVerifyCode(){
    var timenow = new Date().getTime();
    document.getElementById('verifyImage').src= '/index.php?g=Home&m=Index&a=verify#'+timenow;
}