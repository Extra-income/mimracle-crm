var template = require("U/template");
module.exports = {
    _cache:{},
    _getHtml:function(file,callback,async=false){
        var self = this;
        !/\.html$/g.test(file) && (file += ".html");
        if(self._cache[file]){
            return callback && callback(self._cache[file]);
        }
        $.ajax({
            url: "/views/template/" + file,
            type: "get",
            dataType: "html",
            async: async,
            timeout: 10000,
            success: function (html) {
                self._cache[file] = html;
                callback && callback(html);
            },
            error: function () {
                callback && callback("");
            }
        });
    },
    preload:function(files){
        //暂时去掉
        return;
        var self = this;
        $.each(files,function(){
            self.templateAsync(this);
        });
    },
    render:function(file,data){
        return template.compile(this.template(file))(data);
    },
    renderAsync:function(file,data,callback){
        if(callback == undefined){
            callback = data;
            data = {};
        }
        this.templateAsync(file,function(html){
            // DH.lazyload()执行后会重写template.compile函数，支持图片懒加载
            callback && callback(template.compile(html, {
                filename: file//缓存成为renderFunc
            })(data));
        });
    },
    templateAsync:function(file,callback){
        this._getHtml(file,function(html){
            callback && callback(html);
        },true);
    },
    template:function(file){
        var content = "";
        this._getHtml(file,function(html){
            content = html;
        });
        return content;
    }
}; 