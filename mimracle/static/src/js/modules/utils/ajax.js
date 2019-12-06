module.exports = {
    ajax:function(opts){
        opts.complete = function(){
        };

        opts.error  = opts.error || function(){
        };
        $.ajax(opts);
    },
    get:function(url,data,success,error){
        if($.isFunction(data)){
            error = success;
            success = data;
            data = {};
        }
        error = error || function(){};
        var result = null;
        var opts = {
            url:url,
            async:false,
            type:"get",
            dataType:"json",
            
            timeout:3000,
            data:data,
            cache:false,//清IE8,9浏览器缓存
            success:function(r){
                result = r;
                success && success(r);
            },
            error:error
        };
        this.ajax(opts);
        return result;
    },
    getAsync:function(url,data,success,error){
        if($.isFunction(data)){
            error = success;
            success = data;
            data = {};
        }
        error = error || function(){};
        var opts = {
            url:url,
            type:"get",
            dataType:"json",
            data:data,
            cache:false,//清IE8,9浏览器缓存
            success:success,
            error:error
        };
        this.ajax(opts);
    },
    post:function(url,data,success,error){
        if($.isFunction(data)){
            error = success;
            success = data;
            data = {};
        }
        error = error || function(){};
        var result = null;
        var opts = {
            url:url,
            async:false,
            type:"post",
            timeout:3000,
            dataType:"json",
            cache:false,//清IE8,9浏览器缓存
            data:data,
            success:function(r){
                result = r;
                success && success(r);
            },
            error:error
        };
        this.ajax(opts);
        return result;
    },
    postAsync:function(url,data,success,error){
        if($.isFunction(data)){
            error = success;
            success = data;
            data = {};
        }
        error = error || function(){};
        var opts = {
            url:url,
            type:"post",
            dataType:"json",
            cache:false,//清IE8,9浏览器缓存
            data:data,
            success:function(result){
                if(!success){ return;}
                if(result.success){
                    success && success(result);
                }else{
                    var ret = false;
                    error && (ret = error(result));
                }
            },
            error:error
        };
        this.ajax(opts);
    },
    postStream:function(url,data,success,error){
        //以流的方式传递
        if($.isFunction(data)){
            error = success;
            success = data;
            data = {};
        }
        error = error || function(){};
        var opts = {
            url:url,
            type:"post",
            dataType:"json",
            cache:false,//清IE8,9浏览器缓存
            data:JSON.stringify(data),
            headers:{"Content-Type":'application/json;charset=utf-8'},
            success:function(result){
                if(!success){ return;}
                if(result.success){
                    success && success(result);
                }else{
                    var ret = false;
                    error && (ret = error(result));
                }
            },
            
            error:error
        };
        this.ajax(opts);
    },
    uploadFile:function(url,data,success,progress,faile){
        if(/^file/.test(window.location.origin)){
            url = config.domain+url;
        }
        var fd = new FormData();
        for(var key in data){
            if(key == "path"){
                url+="?path="+data[key];
            }else{
                fd.append(key,data[key]);
            }
        }
        var xhr = new XMLHttpRequest();
        if (success) {
            xhr.upload.addEventListener("progress", function (e) {
                progress && progress(e.loaded,e.total);
            }, false);
            xhr.addEventListener("load", function (e) {
                success(JSON.parse(xhr.responseText));
            }, false);
            xhr.addEventListener("error", function (e) {
                faile && faile();
            }, false);
            xhr.addEventListener("abort", function (e) {
                faile && faile();
            }, false);
        }
        xhr.open("POST", url);
        xhr.send(fd);
        xhr.onreadystatechange = function(){
            if(413===xhr.status){
                console.log(faile);
                faile&&faile();
                xhr.abort();
            }
        }
    }
};

