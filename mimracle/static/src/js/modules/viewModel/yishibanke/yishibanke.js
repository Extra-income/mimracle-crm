

var yishibanke = {
    _bindEvent:function(){
        var self = this;


        // if ($('#inner-content')) {
        //     iScroll.init({
        //         el: document.getElementById('inner-content'),
        //         scrollBar: document.getElementById('tool-bar')
        //     })
        // }
        var pcgt = $('#Jsidebar');
        var Jshare = $('#Jshare');
        var Jbdshare = $('#Jbdshare');
        var Jli = $('#Jsidebar li');
        window.onscroll = function () {
            var pt = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
            if (pt > 470) {
                pcgt.show();
            } else {
                pcgt.hide();
            }
            for (var i = 0; i < Jli.length; i++) {
                if (pt > 530 && pt < 1500) {
                    Jli.eq(i).find("a").css("background","#32374A");
                    Jli.eq(0).find("a").css("background","#00AF8D");
                }
                if (pt > 1500 && pt < 2200) {
                    Jli.eq(i).find("a").css("background","#32374A");
                    Jli.eq(1).find("a").css("background","#00AF8D");
                }
                if (pt > 2200 && pt < 2450) {
                    Jli.eq(i).find("a").css("background","#32374A");
                    Jli.eq(2).find("a").css("background","#00AF8D");
                }
                if (pt > 2450 && pt < 3050) {
                    Jli.eq(i).find("a").css("background","#32374A");
                    Jli.eq(3).find("a").css("background","#00AF8D");
                }
                if (pt > 3050 && pt < 3950) {
                    Jli.eq(i).find("a").css("background","#32374A");
                    Jli.eq(4).find("a").css("background","#00AF8D");
                }
                if (pt > 3950 && pt < 4150) {
                    Jli.eq(5).find("a").css("background","#32374A");
            }
            }
        }
        window._bd_share_config = {
            share: [{
                "bdSize": 16
            }]
        }


        // $(document).on("click",".Jshare", function () {
        //     Jbdshare.style.display = Jbdshare.style.display == "none" ? "block" : "none";
        // });


        $(document).on("click",".showWin", function () {
            var openShow = $(this).data("show");
            var openId = $(this).data("id");
            // var postered = $(this).find("img").attr("src");
            if(openShow){
                $('.full-overlay').show();
                // $("#videoSou").attr('src', videoSrc);
                $('.'+openId+' ').show();
                // $("#player").attr("poster",postered);
                // $("#videoShow").attr("src",openShow);

            }
        });

        $(document).on("click",".icoClose", function () {
            $('.full-overlay').hide();
            $(this).parent().hide();
            // console.log( $(this).parent().find('video').attr("id"));
            // var myVideo = document.getElementsByTagName('video');
            // myVideo.pause();
            document.getElementById("player").pause();
            // $('#player').pause();
        });


    },
    //初始化
    _init:function(){
        var self = this;

        self._bindEvent();
    }
};

yishibanke._init();