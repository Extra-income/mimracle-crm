var  ajax = require("U/ajax");

var wapjoblist = {
    _bindEvent:function(){
        var self = this;
        var pagenum = 1;
        $('.join-post').on("click",'.brand-more', function () {
            pagenum = pagenum+1;
            $(".brand-more").attr("data-num", pagenum);
            ajax.getAsync('/os/recruitment/list.do',{page_num:pagenum, page_size:10 },function(result){
                if(result.success){
                    $.each(result.object.recruitments, function (index,element) {
                        var html = '<li><div class="join-post-head clearfix">\
                            <p>'+element.title+'</p>\
                            <p>'+element.number+'</p>\
                            <p>'+element.education+'</p>\
                            <p>'+element.experience+'</p></div>\
                            <div class="join-post-body talent-post-body">\
                                <div class="post-block clearfix">\
                                    <br/>\
                                    <h3 class="post-blockl fl"> 工作职责：</h3>\
                                    <div class="post-blockr fl">\
                                        <p>'+element.responsibility+'</p>\
                                    </div>\
                                </div>\
                                <div class="post-block clearfix">\
                                    <br/>\
                                    <h3 class="post-blockl fl"> 任职资格：</h3>\
                                    <div class="post-blockr fl">\
                                        <p>'+element.requirements+'</p>\
                                    </div>\
                                </div>\
                                <div class="post-block clearfix daiyu">\
                                    <br/>\
                                    <h3 class="post-blockl fl"> 福利待遇：</h3>\
                                    <div class="post-blockr fl">\
                                        <p>1、核心岗位、管理岗股权激励</br>\
                                        2、绩效制工资，绝对有竞争力的岗位薪酬</br>\
                                    3、3周年、5周年含logo纪念戒指</br>\
                                4、提供公寓式住宿、餐补、优质样品内购 </br>\
                            5、每月200元团建基金，常年下午茶，惊喜生日会 </br>\
                        6、团队年度带薪国内、国外旅游，优厚节日福利 </br>\
                        7、母婴课堂、小孩学位帮助</br>\
                        </p>\
                        </div>\
                        </div>\
                        </div>\
                        </li>';
                        $(".join-post-content").append(html);

                    })

                }else{
                    $('.brand-more').hide();
                    alert("已经是最后一页");
                    // alert(result.message);
                }

            },function(a,b,c){

            });
        })

        // // 加入我们
        $('.join-post-content').on('click','.join-post-head', function(event) {
            event.preventDefault();
            $(this).parent("li").siblings('li').children('.join-post-head').removeClass('on');
            $(this).toggleClass('on');
            $(this).parent("li").siblings('li').children('.join-post-body').slideUp("slow");
            $(this).siblings('.join-post-body').slideToggle("slow",function(){
                var this_top = $(this).parent("li").offset().top;
                $("html,body").animate({scrollTop:this_top}, 500);
            });
        });

        $(document).on('click','.submit-search-btn', function(event) {
            $("#formt").submit();
        });


    },
    //初始化
    _init:function(){
        var self = this;
        self._bindEvent();

        if(global.getUrlParam('moban') == '1'){
            $(".join-seach").addClass("dis");
            $(".join-post").removeClass("dis");
        }



    }
};

wapjoblist._init();