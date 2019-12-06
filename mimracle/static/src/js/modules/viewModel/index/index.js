
var viewV = require("V/view");

require("P/layer.js");


var index = {
    //绑定事件
    _bindEvent:function(){
        var self = this;


        $(document).on('click','.j-2d-btn',function(){
            $(this).addClass('bnt-active');
            $('.j-3d-btn').removeClass('bnt-active');
            $('.j-case-main-2d').show();
            $('.j-case-main-3d').hide();
        });
        $(document).on('click','.j-3d-btn',function(){
            $(this).addClass('bnt-active');
            $('.j-2d-btn').removeClass('bnt-active');
            $('.j-case-main-3d').show();
            $('.j-case-main-2d').hide();
        });
        //self._scrollChange();
        $(document).on('click',".dh-index__content-nav a",function(){
            // console.log($(this).attr('offset'));
            if($(this).attr('offset')==5){
                 $(".dh-index__content-nav a").removeClass("active");
                 $('.nav-active').addClass("active");
            }else{
                $(".dh-index__content-nav a").removeClass("active");
                $(this).addClass("active");
            }
        });
        //轮播图
        $(function(){
            var $li=$('.audit_list li');
            var a=0;
            var timer;
            function  imgChange(){
                $('.audit_pic a').eq(a).stop(true).show().siblings().hide();
                $li.eq(a).addClass('audit_hov').siblings().removeClass('audit_hov');
            }
            $li.on('click',function(e){
                a =$(this).index();
                imgChange();
                e.stopPropagation();
                clearInterval(timer);
            });
            function auto(){
               timer = setInterval(function(){
               (a<3)?a++:a=0;
               imgChange();
            },3000)
            };
            auto();

            $('.audit_pic  a').on('mouseover',function(){
             clearInterval(timer);
            });

            $('.audit_pic  a').on('mouseout',function(){
            auto();
            });







        })
    },
    //点击导航，滚到相应的位置
    _scrollChange:function(){
        var self = this;
        $(document).scroll(function(){
            var scrollTop = parseInt($(document).scrollTop());
            var offsetTop0 = 0;
            var offsetTop1 = parseInt($("#special").position().top);
            var offsetTop2 = parseInt($("#series").position().top);
            var offsetTop3 = parseInt($("#case").position().top);
            var offsetTop4 = parseInt($("#original").position().top);
            var offsetTops = [offsetTop0,offsetTop1,offsetTop2,offsetTop3,offsetTop4];
            for(var i = 0;i<offsetTops.length;i++){
                (function(){
                    if (scrollTop >= offsetTops[i]) {
                        for(var j=0;j<offsetTops.length;j++){
                            $("a[offset="+j+"]").removeClass("active");
                        }
                        $("a[offset="+i+"]").addClass("active");
                    }
                })(i);
            }

        });

    },

    // 获取cookie
    _getCookie:function(name){
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if(arr != null){
            return(arr[2]);
        }else{
            return null;
        }
    },
    //初始化
    _init:function(){
        var self = this;

        self._bindEvent();

        $(function(){
            self._ready();
        });
    },

    //document ready
    _ready:function(){
        var self = this;

    },


};
index._init();