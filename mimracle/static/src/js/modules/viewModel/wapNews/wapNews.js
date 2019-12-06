var  ajax = require("U/ajax");

var wapNews = {
    _bindEvent:function(){
        var self = this;
        var pagenum = 1;
        $('.brand-more').on("click", function () {
            pagenum = pagenum+1;
            $(".brand-more").attr("data-num", pagenum);
            ajax.getAsync('/os/article/listArticles.do',{page_num:pagenum, page_size:10 },function(result){
                if(result.success){
                    $.each(result.object.articles, function (index,element) {
                        var dateJsonTime = element.create_time;
                        var nows=new Date(dateJsonTime);
                        var year=nows.getFullYear();
                        var month=nows.getMonth()+1;
                        var date=nows.getDate();
                        var dateNows =  year+"-"+month+"-"+date;

                        var html = '<li>\
                    <a href="/wapNewsDetails/'+element.id+'.html">\
                        <div class="pic">\
                        <img src="'+element.thumb_pic+'" alt="" />\
                        </div>\
                        <div class="text">\
                        <h1>'+element.title+'</h1>\
                    <p>'+dateNows+'</p>\
                    </div>\
                    <span class="brand-tips">品牌动态</span>\
                        </a>\
                     </li>';
                        $(".brand-list").append(html);

                    })

                }else{
                    $('.brand-more').hide();
                    alert("已经是最后一页");
                    // alert(result.message);
                }

            },function(a,b,c){

            });
        })
    },
    //初始化
    _init:function(){
        var self = this;
        self._bindEvent();
    }
};

wapNews._init();