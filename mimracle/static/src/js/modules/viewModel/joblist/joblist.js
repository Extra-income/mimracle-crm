require("P/jquery.pagination.js");
var joblist = {
    _bindEvent:function(){
        var self = this;


        var total = $(".news-page").data("talpage");
        var totalPages = Math.ceil(total/15);

        var totalOn;
        if(location.pathname.indexOf("joblist_") > 0){
            var ids = location.pathname.match(/joblist_(\d+).html/)[1];
            totalOn = ids;
        }else{
            totalOn = 1;
        }
        $('.M-box2').pagination({
            pageCount: totalPages,
            coping:true,
            current: totalOn,
            count: 2,
            homePage:'首页',
            endPage:'末页',
            prevContent:'上页',
            nextContent:'下页',
            callback:function(api){
            // console.log(getCurrent());
            }
        });



        if(location.pathname.indexOf("joblist_") > 0) {
            var ids = parseInt(location.pathname.match(/joblist_(\d+).html/)[1]);
            $(".prev").attr("data-page", ids - 1);
            $(".next").attr("data-page", ids + 1);
        }else{
            $(".prev").attr("data-page", 1);
            $(".next").attr("data-page", 2);
        }

        $(document).on("click",".M-box2 span", function () {
            if(!$(this).hasClass("active")){
            var getpageId = $(this).data("page");
            window.location.href="/hr/joblist_"+getpageId+".html"
            }
        })

    },
    //初始化
    _init:function(){
        var self = this;
        self._bindEvent();


    }
};

joblist._init();