require("VM/base/baseHeaderTop.js");
require("P/layer.js");
// require("P/share1.js");
// require("P/share2.js");

var ajax = require("U/ajax");
var shareQRCode = require('P/qrcode.js');

var indexInviteF = {
    _bindEvent:function(){
        //邀请好友
        var self = this;
        var qrcode;
        $(document).on('click', '.j-invite-now', function () {
        	//从cookie中判断登录
        	var name = "LSMY_PC_USER_ID";
        	if(document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"))!=null){
        		 var index = layer.open({
	                title:'邀请好友',
	                type:1,
	                content:$('.bshare-lists'),
	                skin:"pop-class-bshare",
	            });
        	}else{
        		layer.open({
	                title:"提示",
	                type:1,
	                content:$('.dh-header__right-account-login'),
	                skin:'pop-class pop-class3'
                });
                return;
        	}
		
           
        });

        //分享到空间
        $(document).on('click' , '.j-share-qzone' , function () {
            var shareData = {
                'busId':'',
                'busType':'',
                'share_link':'/register',
                'share_pic':'',
                'share_tittle':'推荐您注册林氏木业成为会员，更多优惠等着您呢！',
                'share_type':'QQKJ'
            };

            var newWindow = window.open();
            $.ajax({
                type: 'POST',
                url: '/pc/share/getLink.do',
                dataType: 'json',
                data:shareData,
                error: function (result) {
                    newWindow.close();
                },
                success: function (result) {
                    var shareUrl = result.object.share_url;
                    var locationHost = window.location.host;
                    var jumpUrl = encodeURIComponent("http://" + locationHost + shareUrl);
                    var title = '推荐您注册林氏木业成为会员，更多优惠等着您呢！';
                    var picUrl = 'http://aliyun.mmshop.my0404.com/image/2016-12-06-313ae10cf0444e51a54fe3a0018f406b.png';
                    var sharesinastring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+jumpUrl+'&title='+encodeURIComponent(title)+'&summary='+encodeURIComponent(title)+'&pics='+picUrl;
                    newWindow.location = sharesinastring;
                }
            });

            // ajax.postAsync('/pc/share/getLink.do' , shareData , function (result) {
            //     var shareUrl = result.object.share_url;
            //     var locationHost = window.location.host;
            //     var jumpUrl = encodeURIComponent("http://" + locationHost + shareUrl);
            //     if(result.success) {
            //         self._shareToThirdParty('推荐您注册林氏木业成为会员，更多优惠等着您呢！', jumpUrl, 'http://aliyun.mmshop.my0404.com/image/2016-12-06-313ae10cf0444e51a54fe3a0018f406b.png','qqzone');
            //     }
            // }, function (result) {
            //     alert(result.message);
            // });

        });

        //分享到qq好友
        $(document).on('click' , '.j-share-qqim' , function () {
            var shareData = {
                'busId':'',
                'busType':'',
                'share_link':'/register',
                'share_pic':'',
                'share_tittle':'推荐您注册林氏木业成为会员，更多优惠等着您呢！',
                'share_type':'QQHY'
            };

            var newWindow = window.open();
            $.ajax({
                type: 'POST',
                url: '/pc/share/getLink.do',
                dataType: 'json',
                data:shareData,
                error: function (result) {
                    newWindow.close();
                },
                success: function (result) {
                    var shareUrl = result.object.share_url;
                    var locationHost = window.location.host;
                    var jumpUrl = encodeURIComponent("http://" + locationHost + shareUrl);
                    var title = '推荐您注册林氏木业成为会员，更多优惠等着您呢！';
                    var summary = '立即注册';
                    var picUrl = 'http://aliyun.mmshop.my0404.com/image/2016-12-06-313ae10cf0444e51a54fe3a0018f406b.png';
                    var shareqqzstring = 'http://connect.qq.com/widget/shareqq/index.html?title='+title+'&summary='+summary+'&url='+jumpUrl+'&pics='+picUrl;
                    newWindow.location.href = shareqqzstring;
                }
            });

            // ajax.postAsync('/pc/share/getLink.do' , shareData , function (result) {
            //     var shareUrl = result.object.share_url;
            //     var locationHost = window.location.host;
            //     var jumpUrl = encodeURIComponent("http://" + locationHost + shareUrl);
            //     if(result.success) {
            //         self._shareToThirdParty('推荐您注册林氏木业成为会员，更多优惠等着您呢！', jumpUrl, 'http://aliyun.mmshop.my0404.com/image/2016-12-06-313ae10cf0444e51a54fe3a0018f406b.png','qq');
            //         // bShare.addEntry({//     title: "林氏木业",//     url: jumpUrl,//     pic:'http://aliyun.mmshop.my0404.com/image/2016-12-06-313ae10cf0444e51a54fe3a0018f406b.png',//     summary: "推荐您注册林氏木业成为会员，更多优惠等着您呢！"// });// bShare.share(event,'qqim',0);return false;
            //     }
            // }, function (result) {
            //     alert(result.message);
            // });

        });

        //分享到微信
        $(document).on('click' , '.j-share-weixin' , function () {
            var shareData = {
                'busId':'',
                'busType':'',
                'share_link':'/register',
                'share_pic':'',
                'share_tittle':'推荐您注册林氏木业成为会员，更多优惠等着您呢！',
                'share_type':'WX'
            };
            ajax.postAsync('/pc/share/getLink.do' , shareData , function (result) {
                var shareUrl = result.object.share_url;
                var locationHost = window.location.host;
                var jumpUrl = "http://" + locationHost + shareUrl;
                if(result.success) {
                    $('.my-layui-layer-shade2').show();
                    $('.share-weixin-qrcode').show();
                    if(qrcode) {qrcode.clear();}
                    qrcode = new QRCode(
                        document.getElementById('qrcode'),
                        {width:200,height:200}
                    );
                    qrcode.makeCode(jumpUrl);
                }
            }, function (result) {
                alert(result.message);
            });
        });

        $(document).on('click' , '.j-close-qrcode' , function () {
            $('.share-weixin-qrcode').hide();
            $('.my-layui-layer-shade2').hide();
        });

        //分享到微博
        $(document).on('click' , '.j-share-sinaminiblog' , function () {
            var shareData = {
                'busId':'',
                'busType':'',
                'share_link':'/register',
                'share_pic':'',
                'share_tittle':'推荐您注册林氏木业成为会员，更多优惠等着您呢！',
                'share_type':'WB'
            };

            var newWindow = window.open();
            $.ajax({
                type: 'POST',
                url: '/pc/share/getLink.do',
                dataType: 'json',
                data:shareData,
                error: function (result) {
                    newWindow.close();
                },
                success: function (result) {
                    var shareUrl = result.object.share_url;
                    var locationHost = window.location.host;
                    var jumpUrl = encodeURIComponent("http://" + locationHost + shareUrl);
                    var title = '推荐您注册林氏木业成为会员，更多优惠等着您呢！';
                    var picUrl = 'http://aliyun.mmshop.my0404.com/image/2016-12-06-313ae10cf0444e51a54fe3a0018f406b.png';
                    var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+jumpUrl+'&content=utf-8&sourceUrl='+jumpUrl+'&pic='+picUrl;
                    newWindow.location = sharesinastring;
                }
            });
            /*
             ajax.postAsync('/pc/share/getLink.do' , shareData , function (result) {
             var shareUrl = result.object.share_url;
             var locationHost = window.location.host;
             var jumpUrl = encodeURIComponent("http://" + locationHost + shareUrl);
             var title = '推荐您注册林氏木业成为会员，更多优惠等着您呢！';
             var picUrl = 'http://aliyun.mmshop.my0404.com/image/2016-12-06-313ae10cf0444e51a54fe3a0018f406b.png';
             if(result.success) {
             self._shareToThirdParty(title, jumpUrl, picUrl,'sina');
             }
             }, function (result) {
             alert(result.message);
             });
             */
        });
    },

    _init:function(){
        var self = this;
        self._bindEvent();
        $(function(){
            self._ready();
        });
    },

    _ready:function(){},

    /*
    _shareToThirdParty : function(title,url,picUrl,type) {
        if(type == 'sina') {
            //微博
            var sharesinastring='http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+url+'&content=utf-8&sourceUrl='+url+'&pic='+picUrl;
            window.open(sharesinastring,'newwindow','height=500,width=600,top=100,left=100');
        } else if (type == 'qq') {
            //qq
            var shareqqzonestring='http://connect.qq.com/widget/shareqq/index.html?desc='+title+'&url='+url+'&pics='+picUrl;
            window.open(shareqqzonestring,'newwindow','height=500,width=800,top=100,left=100');
        } else if (type == 'qqzone') {
            //空间
            var shareqqzonestring='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+url+'&title='+encodeURIComponent(title)+'&summary='+encodeURIComponent(title)+'&pics='+picUrl;
            window.open(shareqqzonestring,'newwindow','height=500,width=600,top=100,left=100');
        }
    },
    */
};
indexInviteF._init();