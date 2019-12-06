require("P/jquery.pagination.js");
var news = {
    _bindEvent: function() {
        var self = this;


        var total = $(".news-page").data("talpage");
        var totalPages = Math.ceil(total / 15);

        var totalOn;
        if (location.pathname.indexOf("newlist") > 0) {
            var ids = location.pathname.match(/newlist_(\d+).html/)[1];
            totalOn = ids;
        } else {
            totalOn = 1;
        }
        $('.M-box2').pagination({
            pageCount: totalPages,
            coping: true,
            current: totalOn,
            count: 2,
            homePage: '首页',
            endPage: '末页',
            prevContent: '上页',
            nextContent: '下页',
            callback: function(api) {
                // console.log(getCurrent());
            }
        });



        if (location.pathname.indexOf("newlist") > 0) {
            var ids = parseInt(location.pathname.match(/newlist_(\d+).html/)[1]);
            $(".prev").attr("data-page", ids - 1);
            $(".next").attr("data-page", ids + 1);
        } else {
            $(".prev").attr("data-page", 1);
            $(".next").attr("data-page", 2);
        }

        $(document).on("click", ".M-box2 span", function() {
            if (!$(this).hasClass("active")) {
                var getpageId = $(this).data("page");
                window.location.href = "/news/newlist_" + getpageId + ".html"
            }
        })

        // if($(".newss-page")){
        //     var id = location.pathname.match(/(\d+).html/)[1];
        //     console.log(id);
        //     if(id){
        //         $(".M-box2 span").removeClass("active");
        //         $(".M-box2 span").eq(id-1).addClass("active");
        //     }
        // }

        // var total = $(".newss-page").data("talpage");
        // var totalPages = Math.ceil(total/10);
        // var setTotalCount = total;
        // $('#box').paging({
        //     initPageNo: 1, // 初始页码
        //     totalPages: totalPages, //总页数
        //     totalCount: '合计' + setTotalCount + '条数据', // 条目总数
        //     slideSpeed: 600, // 缓动速度。单位毫秒
        //     jump: true, //是否支持跳转
        //     callback: function(page) { // 回调函数
        //         // window.location.href = "/news/"+page+".html"
        //     }
        // })
    },
    //初始化
    _init: function() {
        var self = this;
        self._bindEvent();


    }
};

news._init();