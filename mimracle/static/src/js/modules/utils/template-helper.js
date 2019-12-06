module.exports = (template)=>
{
    // 压缩多余空白、换行与注释
    template.config('compress', true)

    template.helper('dateTrans', function (val, format) {
        var d = new Date(val),
            format = format || 'yyyy-MM-dd';
        var o = {
            "M+": d.getMonth() + 1, //month
            "d+": d.getDate(), //day
            "h+": d.getHours(), //hour
            "m+": d.getMinutes(), //minute
            "s+": d.getSeconds(), //second
            "q+": Math.floor((d.getMonth() + 3) / 3), //quarter
            "S": d.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    });
    template.helper("e", function (func) {
        var result = "";
        if (func.indexOf("(") < 0 || func.indexOf(")") < 0) {
            func += "()";
        }

        eval("result = " + func + ";");

        return result;
    });
    template.helper("jsontostr", function (json) {
        try {
            if (!json) {
                return "null";
            }
            return JSON.stringify(json);
        } catch (e) {
            console.log(e);
        }
    });
    template.helper('strtoobj', function (str) {
        try {
            if (!str) {
                return null;
            }
            return JSON.parse(str);
        } catch (e) {
            console.log(e);
        }
    });

    /** 格式化用户名星号*/
    template.helper("hidename", function (str) {
        var reg = /^(.).+(.)$/g;
        return str.replace(reg, "$1***$2");
    });


    /** 格式化价格*/
    template.helper("fp0", function (price) {
        if (!price) {
            return "0";
        }
        return (price / 100);
    });
    template.helper("fp", function (price) {
        if (!price) {
            return "0.00";
        }
        return (price / 100).toFixed(2);
    });
    /** 格式化时间 具体到时分秒*/
    template.helper("ft", function (time) {

        if (!time) {
            return "未知";
        }
        var d = new Date(parseInt(time) * 1000);

        function to2(number) {
            return (("" + number).length == 1 ? "0" + number : number);
        }

        return to2(d.getFullYear()) + "-" + to2(d.getMonth() + 1) + "-" + to2(d.getDate()) +
            " " + to2(d.getHours()) + ":" + to2(d.getMinutes()) + ":" + to2(d.getSeconds());

    });
    /*格式化时间 具体到年月日*/
    template.helper("ft2", function (time) {

        if (!time) {
            return "未知";
        }
        var d = new Date(parseInt(time) * 1000);

        function to2(number) {
            return (("" + number).length == 1 ? "0" + number : number);
        }

        return to2(d.getFullYear()) + "-" + to2(d.getMonth() + 1) + "-" + to2(d.getDate());
    });

    template.helper("ft3", function () {
        var d = new Date(new Date().getTime());

        function to2(number) {
            return (("" + number).length == 1 ? "0" + number : number);
        }

        return to2(d.getFullYear()) + "-" + to2(d.getMonth() + 1) + "-" + to2(d.getDate());
    });

    template.helper("ft4", function (strtime) {
        return strtime.slice(0, 10);
    });


    template.helper('getData1',function(data1, time){
        var val;
        switch (time) {
            case 0:
                val = data1.substring(0,data1.lastIndexOf(' '));
                break;
            case 1:
                val = data1.substring(data1.lastIndexOf(' '), data1.length);
                break;
            case 2:
                var show_day = new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');

                var times = new Date(data1.replace(/-/g,"/"));
                var day = times.getDay();
                val = show_day[day];
                break;
        }
        return val;
    });

    template.helper('getVal', function (id, obj) {
        var val = '';
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].id == id) {
                val = obj[i].region_name;
            }
        }
        return val;
    });
    // 格式化价格
    template.helper('fp', function (price) {
        price = parseFloat(price) || 0;
        var fprice = (price / 100).toFixed(2).split('.');
        return fprice[0] + '.' + fprice[1];
    });

    template.helper('fp2', function (price) {
        price = price || 0;
        var fprice = (price / 100).toFixed(2).split('.');
        return fprice[0] + '.<small>' + fprice[1] + '</small>';
    });

    template.helper('fp3', function (price) {
        //格式化一口价
        price = price || '0';
        var priceArr = price.split('—');
        var price0 = (priceArr[0] / 100).toFixed(2).split('.');
        if (!priceArr[1]) {
            return price0[0] + '.<small>' + price0[1] + '</small>';
        }
        var price1 = (priceArr[1] / 100).toFixed(2).split('.');
        return price0[0] + '.<small>' + price0[1] + '</small>' + '-' + price1[0] + '.<small>' + price1[1] + '</small>';
    });
    template.helper('fp5', function (price) {
        // 格式化-价格区间
        price = price || '0';
        var priceArr = price.split('-');
        var price0 = (priceArr[0] / 100).toFixed(2).split('.');
        if (!priceArr[1]) {
            return price0[0] + '.<small>' + price0[1] + '</small>';
        }
        var price1 = (priceArr[1] / 100).toFixed(2).split('.');
        return price0[0] + '.<small>' + price0[1] + '</small>' + '-' + price1[0] + '.<small>' + price1[1] + '</small>';
    });
    // 格式化价格，保留整数
    template.helper('fp4', function (price) {
        price = price || 0;
        return (price / 100);
    });
    //格式化价格
    template.helper('fp6', function (price) {
        price = price || 0;
        price = price.split(".")[0];
        return price;
    });
    template.helper('fp7', function (price) {
        //格式化一口价,针对于产品详情页面
        price = price || '0';
        var priceArr = price.split('—');
        var price0 = (priceArr[0] / 100).toFixed(2).split('.');
        if (!priceArr[1]) {
            return price0[0] + '.' + price0[1] + '';
        }
        var price1 = (priceArr[1] / 100).toFixed(2).split('.');
        return price0[0] + '.' + price0[1] + '' + '-' + price1[0] + '.' + price1[1];
    });

    template.helper('fI', function (url, h, w) {
        //格式化图片裁剪链接
        if (!url) {
            return "";
        }
        var map = [
            {
                key: "http://lsmy-img-test-0001.img-cn-shenzhen.aliyuncs.com",
                value: "//file.mmshop.my0404.com"
            },
            {
                key: "http://lsmy-image.oss-cn-shenzhen.aliyuncs.com",
                value: "//pic.linshimuye.com"
            }
        ];
        if (url.indexOf(".img-") > 0) {
            for (var i = 0; i < map.length; i++) {
                url = url.replace(map[i].key, map[i].value);
            }
        }
        h = h || 150;
        w = w || 150;
        url = url.replace(".oss-", '.img-');
        url = url + '@' + h + "h_" + w + "w_1e_1c_0l_1wh";
        if (url.indexOf("@") > 0) {
            url += "_90Q";
        } else {
            url += "@90Q";
        }
        return url;
    });
    template.helper('fImg', function (url, h, w) {
        //格式化图片裁剪链接(自己上传图片的转换)
        if (!url) {
            return "";
        }
        h = h || 150;
        w = w || 150;
        var r = /\..+?\-/;
        url = url.replace(r, '.img-');
        return url + '@' + h + "h_" + w + "w_1e_1c_0l_1wh";
    });
    template.helper('PI', function (url, w) {
        //3D/2D图片等比压缩
        if (url.indexOf("http:") == -1 || url.indexOf(".jpg") == -1) {
            return url;
        }
        var reg = /^(https?:\/\/.*?)(\/.*?)$/im;
        var m = url.match(reg);
        url = m[1].replace("oss", "img") + m[2];
        return url + '@' + w + "w";
    });
    template.helper("checked", function (value, value2) {
        if (value == value2) {
            return ' checked="checked" ';
        }
        return "";
    });
    //追评格式化天数
    template.helper("fDay", function (time) {
        var currentTime = new Date().getTime();
        var days;
        if (time) {
            days = (currentTime - time) / (1000 * 60 * 60 * 24);
        }
        return Number.parseInt(days);
    });
    // 格式化省市区
    // 格式化手机号码
    template.helper("fphone", function (str) {
        var r = /[0-9]{4}(?=[0-9]{4}$)/;
        return str.replace(r, "****");
    });
    //格式化分割时间
    template.helper("fptime", function (str) {
        return str.split(" ")[0];
    });
    template.helper("getArrayValue", function (arr, field, value, retField) {
        if (!arr || arr.length == 0) {
            return "";
        }
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][field] == value) {
                return arr[i][retField];
            }
        }
        return "";
    });

    template.helper("substr", function (str, len, suffix) {
        suffix = suffix || "";
        if (!str) return suffix;
        return str.substring(0, len) + suffix;
    });

    template.helper("trim", function (str, char) {
        char = char || " ";
        var reg1 = new RegExp("^" + char + "*?([^" + char + "]|$)");
        var reg2 = new RegExp("([" + char + "]*?)" + char + "*$");
        return str.replace(reg1, "$1").replace(reg2, "$1");
    });

    template.helper('str2array', function (str) {
        str = str || '';
        if (!str) return [];
        return str.split(',');
    });

    template.helper('transformUrl', function (url) {
        return url.replace('oss', 'img');
    });
    template.helper('fileType', function (val) {
        // 根据文件名获取文件类型
        var fileType = val ? val.substring(val.lastIndexOf('.') + 1) : '';
        if ('jpg' === fileType || 'png' === fileType || 'gif' === fileType) {
            return 'f_img';
        } else if ('doc' === fileType || 'docx' === fileType) {
            return 'f_word'
        } else if ('xlsx' === fileType) {
            return 'f_excel'
        } else if ('rar' === fileType) {
            return ''
        } else {
            return 'f_other'
        }
    });
    template.helper('sizeChange', function (val) {
        if (val > 1024) {
            val = val / 1024;
            if (val > 1024) {
                val = val / 1024;
                return val.toFixed(2) + 'MB';
            } else {
                return val.toFixed(2) + 'KB';
            }
        } else {
            return val.toFixed(2) + 'B';
        }
    });
    // 截取字段，省略号
    template.helper('strDot', function (str, length) {
        if (str.length > length) {
            str = str.substring(0, length) + "...";
        }
        return str;
    });

    template.helper('enCodeTo', function (str) {
        return encodeURIComponent(str);
    });


    //用于协商详情，替换占位符
    template.helper('matchSymbol', function (str) {
        str = str || '';
        var match = new RegExp("\\$OP\\$");
        return match.test(str);
    });
    template.helper('removeSymbol', function (str) {
        str = str || '';
        return str.replace('$OP$', '');
    });
    template.helper('addTag', function (str) {
        str = str || '';
        var index = str.indexOf("：");
        var str1 = "<p class='dh-service__textL fl'>" + str.substring(0, index + 1) + "</p><p class='dh-service__textR fl'>" + str.substring(index + 1) + "</p>";
        return str1;
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////
    template.helper('audioTrans', function (src) {
        var ret;
        if (navigator.appName.indexOf("Microsoft Internet Explorer") != -1 && document.all) {
            // 如果是IE(6,7,8): 
            ret = '<object classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95" width="120" height="25">'
                + '<param name="AutoStart" value="0" />'
                + '<param name="StopButton" value="0" />'
                + '<param name="VolumeSlider" value="0" />'
                + '<param name="ShowAudioControls" value="0">'
                + '<param name="WindowlessVideo" value="0">'
                + '<param name="ShowPositionControls" value="0">'
                + '<param name="ShowTracker" value="0">'
                + '<param name="AutoSize" value="1">'
                + '<param name="Src" value="' + src + '" /></object>'
        } else {
            ret = '<audio src="' + src + '" type="audio/mp3" autoplay="autoplay" hidden="true"></audio>' +
                '<i class="im_icon msg_record"></i>';
        }
        return ret;
    })

    // 只压缩图片
    template.helper('pImg', function (url, q) {
        if (!url || !/aliyuncs.com/.test(url) || /(.gif$|@)/.test(url)) return url

        url = url.replace('.oss-', '.img-')
        q = q || 90

        return url + '@' + q + 'q'
    })

    //合并文章地址
    template.helper('article', function (id) {
        var url = /*window.location.host + */"/article/"+ id +".html";
        return url;
    });
    //合并商品地址
    template.helper('getGoodsUrl', function(url){
        var urls = "/goods/"+url+".html?goodsId=" + url;
        return urls;
    });



    //大家都在说
    template.helper('coventTag', function(str){
        str = str || '';
        if(!str || typeof str !== 'string') return [];
        var tags = str.split(",");
        return tags;
    });

    // 物流状态
    template.helper('getstatuscn', function (status) {
        var statusCN = "";
        switch (status) {
            case "sign":
                statusCN = "已签收";
                break;
            case "install":
                statusCN = "已安装";
                break;
            case "appoint":
                statusCN = "已预约";
                break;
            case "get":
                statusCN = "已提货";
                break;
            case "arrive":
                statusCN = "已到货";
                break;
            case "sended":
                statusCN = "已发出";
                break;
            default:
                statusCN = "已揽货";
                break;

        }
        return statusCN;
    })

};
