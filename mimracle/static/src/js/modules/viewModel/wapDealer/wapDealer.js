var  ajax = require("U/ajax");

var wapDealer = {
    _bindEvent:function(){
        var self = this;
        $("#form_submit").click(function() {
        var pic = [];
        $(".dh-signUp__updateimg").each(function(index,element){
           var picval = $(".dh-signUp__updateimg").eq(index).find('img').attr("src");
            pic.push(picval);
        })

            var name=$(" input[ name='name' ] ").val();//姓名
            var sex=$(" input[ name='sex' ] ").val();//性别
            var tel=$(" input[ name='tel' ] ").val();//联系电话
            var province=$(" input[ name='province' ] ").val();//加盟所在省
            var city=$(" input[ name='city' ] ").val();//加盟所在市
            var district=$(" input[ name='district' ] ").val(); //加盟所在区
            var add_details=$(" input[ name='add_details' ] ").val(); //详细地址
            var ambience=$(" input[ name='ambience' ] ").val();//气氛
            var ambience_pic=pic.join(","); //气氛图片
            var store_area=$(" input[ name='store_area' ] ").val(); //店铺面积
            var age_limit=$(" input[ name='age_limit' ] ").val(); //经销年限
            var work=$(" input[ name='work' ] ").val(); //从业经历
            var problem=$(" input[ name='problem' ] ").val();//问题


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

            if(!province.length){
                alert("省不能为空");
                return;
            }
            if(!city.length){
                alert("市不能为空");
                return;
            }
            if(!district.length){
                alert("区不能为空");
                return;
            }

            if(!ambience.length){
                alert("气氛不能为空");
                return;
            }

            if(!age_limit.length){
                alert("经销年限不能为空");
                return;
            }

            if(!work.length){
                alert("从业经历不能为空");
                return;
            }




            var param = {
                name: name,//姓名
                sex: sex,//性别
                tel: tel,//联系电话
                province: province,//加盟所在省
                city: city,//加盟所在市
                district: district, //加盟所在区
                add_details: add_details, //详细地址
                ambience: ambience,//气氛
                ambience_pic: ambience_pic, //气氛图片
                store_area: store_area, //店铺面积
                age_limit: age_limit, //经销年限
                work: work, //从业经历
                problem: problem //问题

            }

            ajax.postStream("/os/distributor/insert.do", param, function (result) {
                    if (result.success) {
                        alert("提交成功！");
                    }
                }, function (result) {
                    alert(result.message);
                }
            );
        });

    },
    _AddPORImg : function(){
        var uploader = new plupload.Uploader({
            runtimes : 'html5,flash,silverlight,html4',
            browse_button : 'J-file_upload',
            //multi_selection: false,
            filters: {
                mime_types : [ //只允许上传图片
                    { title : "图片", extensions : "jpg,gif,png" }
                ],
                max_file_size : '5mb', //最大只能上传5mb的文件
                prevent_duplicates : false //不允许选取重复文件
            },
            flash_swf_url : 'P/Moxie.swf',
            silverlight_xap_url : 'P/Moxie.xap',
            url : "/common/file/upload.do",

            init: {
                FilesAdded: function(up, files) {
                    console.log("what");
                    console.log(files);
                    up.start(); //up就是uploader，这里指文件添加时就上传文件。
                },
                FileUploaded: function(up, file, info) {
                    if (info.status == 200)
                    {
                        var url =JSON.parse(info.response).object.imgUrl;

                        $(".J-MoreInfo-box").append("<div class='dh-signUp__updateimg'><img style='width: 0.8rem; float: left; padding: 0.1rem;' class='updateimg' src='"+url+"'/><div class='dh-signUp__closebox'></div></div>");
                    }
                    else if(info.status == 4){
                        alert("上传失败，请重新上传！");
                    }
                },
                Error:function(up,error){
                    // 判断图片大小是否符合设定的上传图片的大小，错误代码为-600
                    if(error.code==-600){
                        alert("图片太大，请重新上传不大于5m的图片！");
                    }
                    // http网络错误
                    else if(error.code==-200){
                        alert("啊哦~网络出现了小故障，请稍后再试！");
                    }
                }
            }
        });
        uploader.init();
    },
    //初始化
    _init:function(){
        var self = this;
        self._AddPORImg();
        self._bindEvent();
    }
};

wapDealer._init();