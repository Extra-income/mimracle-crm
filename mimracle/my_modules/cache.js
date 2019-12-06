
var $ = require("./util"),
    logger = $.logger;
var undefined;
var cache = {
    _member:{},
    //通过req 获取缓存的key
    getKey:function(req,user_id){
        var query = $.deepClone(req.query);
        var keys = $.mapKey(query);
        keys.sort(function(a,b){
            return a>b;
        });
        var key = [];
        key.push("__html__="+encodeURIComponent(req.originalUrl.split("?")[0]));
        $.each(keys,function(){
            key.push(this+"="+(query[this]?encodeURIComponent(query[this]):""));
        });
        if(user_id){
            key.push("__user_id__="+(req.user_id?req.user_id:""));
        }
        return key.join("&");
    },
    set:function(key,value,expire){
        var self = this;
        var content = {
            value:value,
            expire:0
        };
        expire && (content.expire = new Date().getTime()+expire*1000);
        self._member[key] = content;
    },
    get:function(key){
        var self = this;
        var content = self._member[key];
        if(content){
            var expire = content.expire;
            if(expire != 0){
                if(new Date().getTime() <= expire){
                    content = content.value;
                }else{
                    content = undefined;
                    delete self._member[key];
                }
            }else{
                content = content.value;
            }
        }
        return content;
    },
    remove:function(key){
        delete self._member[key];
    },
    send:function(req,res){
        var key = this.getKey(req);
        var html = this.get(key);
        if(html){
            res.send(html);
            return true;
        }
        return false;
    }
};

setInterval(function(){
    //一个小时执行一次
    for(var key in cache._member){
        var content = cache._member[key];
        if(content && content.expire != 0 && new Date().getTime() > content.expire){
            //过期的键去掉
            delete cache._member[key];
        }
    }
},3600000);


module.exports = cache;