var  ajax = require("U/ajax");

var wapGzDealer = {
    _bindEvent:function(){
        var self = this;
        $("#form_submit").click(function() {
        // var pic = [];
        // $(".dh-signUp__updateimg").each(function(index,element){
        //    var picval = $(".dh-signUp__updateimg").eq(index).find('img').attr("src");
        //     pic.push(picval);
        // })

            var name=$(" input[ name='name' ] ").val();//姓名
            var sex=$(" input[ name='sex' ] ").val();//性别
            var tel=$(" input[ name='tel' ] ").val();//联系电话
            var brand=$(" input[ name='brand' ] ").val();//经验品牌
            var intent_order=$(" input[ name='intent_order' ] ").val();//意向合作
            var pick_up=$(" input[ name='pick_up' ] ").val();//对接人
            var accompany=$(" input[ name='accompany' ] ").val();//随行人
            var accompany_name=$(" input[ name='accompany_name' ] ").val();//随行人姓名


            if(!name.length){
               alert("姓名不能为空");
                return;
            }
            if(!sex.length){
                alert("性别不能为空");
                return;
            }

            if(!tel.length){
                alert("联系电话不能为空");
                return;
            }
            if(!(/^1[3|4|5|7|8][0-9]{9}$/.test(tel))){
                alert("手机号码输入有误");
                return;
            }

            if(!brand.length){
                alert("经验品牌");
                return;
            }
            if(!intent_order.length){
                alert("意向合作区域不能为空");
                return;
            }
            if(!pick_up.length){
                alert("林氏木业对接人不能为空");
                return;
            }

            if(!accompany.length){
                alert("是否有随行人不能为空");
                return;
            }

            if(!accompany_name.length){
                alert("随行人姓名不能为空");
                return;
            }




            var param = {
                name: name,  //姓名
                sex: sex, //性别
                tel: tel,  //联系电话
                exper_brand: brand, //经验品牌
                intent_area: intent_order, //意向合作区域
                abutment: pick_up, //林氏对接人
                if_accompany: accompany, //是否有随行人
                accompany_name: accompany_name //随行人姓名

            }

            ajax.postStream("/os/dealer/add.do", param, function (result) {
                    if (result.success) {
                        alert("提交成功！");
                    }
                }, function (result) {
                    alert(result.message);
                }
            );
        });

    },
    // _AddPORImg : function(){
    //     var uploader = new plupload.Uploader({
    //         runtimes : 'html5,flash,silverlight,html4',
    //         browse_button : 'J-file_upload',
    //         //multi_selection: false,
    //         filters: {
    //             mime_types : [ //只允许上传图片
    //                 { title : "图片", extensions : "jpg,gif,png" }
    //             ],
    //             max_file_size : '5mb', //最大只能上传5mb的文件
    //             prevent_duplicates : false //不允许选取重复文件
    //         },
    //         flash_swf_url : 'P/Moxie.swf',
    //         silverlight_xap_url : 'P/Moxie.xap',
    //         url : "/cs/api/file/upload.do",
    //
    //         init: {
    //             FilesAdded: function(up, files) {
    //                 console.log("what");
    //                 console.log(files);
    //                 up.start(); //up就是uploader，这里指文件添加时就上传文件。
    //             },
    //             FileUploaded: function(up, file, info) {
    //                 if (info.status == 200)
    //                 {
    //                     var url =JSON.parse(info.response).object.imgUrl;
    //
    //                     $(".J-MoreInfo-box").append("<div class='dh-signUp__updateimg'><img style='width: 0.8rem; float: left; padding: 0.1rem;' class='updateimg' src='"+url+"'/><div class='dh-signUp__closebox'></div></div>");
    //                 }
    //                 else if(info.status == 4){
    //                     alert("上传失败，请重新上传！");
    //                 }
    //             },
    //             Error:function(up,error){
    //                 // 判断图片大小是否符合设定的上传图片的大小，错误代码为-600
    //                 if(error.code==-600){
    //                     alert("图片太大，请重新上传不大于5m的图片！");
    //                 }
    //                 // http网络错误
    //                 else if(error.code==-200){
    //                     alert("啊哦~网络出现了小故障，请稍后再试！");
    //                 }
    //             }
    //         }
    //     });
    //     uploader.init();
    // },
    //初始化
    _init:function(){
        var self = this;
        // self._AddPORImg();
        self._bindEvent();
    }
};

wapGzDealer._init();