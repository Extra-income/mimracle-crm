var http_request = require('request');
var log4js = require('log4js');
var logger = log4js.getLogger();
var $ = require('./util');
var request = {
    /**
     * @param ops 必填
     * {
     *     url:"地址"  可出传 相对地址 和 绝对地址
     * }
     * @param dataType 返回数据类型 可选参数 默认json
     * @param callback 可选参数
     * */
    get:function(ops,dataType,callback){
        if(!callback){
            callback = dataType;
            dataType = "json";
        }
        dataType || (dataType = "json");
        dataType = dataType.toLowerCase();
        if(typeof ops == "string") {
            ops = {url: ops};
        }
        if(ops.url.indexOf("http") != 0){
            if(ops.req){
                ops.url = ops.req.protocol+"://"+ops.req.headers.host+ops.url;
            }
        }
        var params = [];
        //组装参数 get方法是把参数转换为 param1=value1&param2=value2格式
        if(ops.data){
            for(var key in ops.data){
                if($.isArray(ops.data[key])) {
                    $.each(ops.data[key],function(){
                        params.push(key+"="+encodeURIComponent(this));
                    });
                }else if(typeof ops.data[key] != "undefined" && ops.data[key] != null){
                    params.push(key+"="+encodeURIComponent(ops.data[key]));
                }
            }
            if(ops.url.indexOf("?")>0){
                ops.url+="&";
            }else{
                ops.url+="?";
            }
            ops.url+=params.join("&");
            delete params;
        }
        var headers = {
            Referer:ops.req.headers.referer
        };
        if(ops.headers){
            for(var key in ops.headers){
                headers[key] = ops.headers[key];
            }
        }
        //如果有带 req 把cookie带上
        if(ops.req && ops.req.headers.cookie) {
            headers.Cookie = ops.req.headers.cookie;
        }

        // logger.debug("cookie"+ops.req.headers.cookie);
        logger.level = 'normal';
        ops.url = ops.url.replace(/%25/g, '%');
        logger.debug("request.js.data 访问接口:"+ops.url + " dataType:"+dataType);
        ops.dataType = dataType;

        http_request.get({url:ops.url,headers:headers},function(error, response, body){
            var err = "";
            if(!response){
                logger.error("request.js.data "+ops.url+" 找不到该链接。。。");
                err = ops.url+" 找不到该链接。。。";
            }else if(response.statusCode != 200){
                logger.error(response.body);
                logger.error("request.js.data "+ops.url+" statusCode:"+response.statusCode);
                if(dataType == "json"){
                    body = {};
                }
            }else{
                if(dataType == "json" && !(ops.headers && ops.headers["Http-X-Pjax"]) && body){
                    try{
                        body = JSON.parse(body);
                    }catch(e){
                        logger.error("request.js.data ",e);
                        err = e;
                    }
                }
            }
            callback && callback(err,body);
        });

    },
    post:function(ops,dataType,callback){
        if(!callback){
            callback = dataType;
            dataType = "json";
        }
        dataType || (dataType = "json");
        dataType = dataType.toLowerCase();
        if(typeof ops == "string") {
            ops = {url: ops};
        }
        if(ops.url.indexOf("http") != 0) {
            if (ops.req) {
                ops.url = ops.req.protocol + "://" + ops.req.headers.host + ops.url;
            }
        }
        if(ops.data) {
            for (var key in ops.data) {
                if(typeof ops.data[key] == "undefined" || ops.data[key] == null){
                    delete ops.data[key];
                }
            }
        }
        var headers = {
            Cookie: ops.req.headers.cookie,
            Referer:ops.req.headers.referer
        };
        if(ops.headers){
            for(var key in ops.headers){
                headers[key] = ops.headers[key];
            }
        }
        var body;
        var form;
        if(headers['Content-Type'] == "application/json"){
            body = JSON.stringify(ops.data);
            headers['Content-Length'] = ops.data.length;
        }else{
            form = ops.data;
        }

        //post 方式的参数 用 form 参数去传
        http_request.post({url:ops.url,headers: headers,body:body,form:form},function(error, response, body){
            var err = "";
            if(!response || typeof response == "undefined"){
                logger.error(ops.url+" 找不到该链接。。。");
                err = ops.url+" 找不到该链接。。。";
            }else if(response.statusCode != 200){
                logger.error(response.body);
                logger.error(ops.url+" statusCode:"+response.statusCode);
                if(dataType == "json"){
                    body = {};
                }
            }else{
                if(dataType == "json" && body){
                    try{
                        body = JSON.parse(body);
                    }catch(e){
                        logger.error(e);
                        err = e;
                    }
                }
            }
            callback && callback(err,body);
        });
    }
};


module.exports = request;