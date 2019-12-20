var template = require('./art-template');
var template_function = require('./template-function');
var request = require('./request');
var async = require('async');
var $ = require("./util");
var fs = require("fs");
var path = require("path");
var dataFactory = require("./dataFactory");
var view = require("./view");
var global = {
    template: template,
    request: request,
    _config: {
        // id: "dev",
        // pc_domain: "http://localhost:3000",
        // cssDomain: 'http://localhost:3000',
        // jsDomain: 'http://localhost:3000'
    },
    _exclude: [
        "/404.html",
        "/producttype/ID_1000.html"
    ],
    _accountUrl: [
        "^/my.*?/.*$"
    ],
    __isExclude: function(req) {
        var self = this;
        for (var i = 0; i < self._exclude.length; i++) {
            if (req.originalUrl == self._exclude[i]) {
                return true;
            }
        }
        return false;
    },
    __accountUrl: function(req) {
        var self = this;
        for (var i = 0; i < self._accountUrl.length; i++) {
            if (new RegExp(self._accountUrl[i]).test(req.originalUrl)) {
                return true;
            }
        }
        return false;
    },
    getUrlParam2: function(url, paramstart, endstart) { ///pano/2dpano-76.html 那76

        var urlParamStart = url.lastIndexOf(paramstart);
        var urlParamEnd;
        if (endstart) {
            urlParamEnd = url.indexOf(endstart);
        } else {
            urlParamEnd = url.length;
        }

        var string = url.substring(urlParamStart + 1, urlParamEnd);
        return string;
    },
    __initReq: function(req, res) {
        var self = this;
        //获取域名 供后续程序使用
        req.domain = req.protocol + "://" + req.headers.host;
        req.href = req.domain + req.url;

        var render = res.render.bind(res);
        //重写render
        res.render = function(name, options, callback) {
            name = (self.template.theme() ? self.template.theme() + "/" : "") + name;
            return render(name, options, function(err, str) {
                if (err) return req.next(err);
                var result;
                callback && (result = callback(err, str));
                if (typeof result != "undefined") str = result;
                try {
                    res.send(str);
                } catch (e) {
                    $.logger.error(e);
                }
            });
        }

    },
    __login: function(req, res) {
        var self = this;
        //跳转到微信登陆页面
        var redicect_url = "";
        //登陆
        res.redirect(redicect_url);
    },
    __init: function() {
        var self = this;
        template_function.extTemplate(template, self);
    },
    initAfterConfig: function() {
        var self = this;
        //开发环境 提示错误模板
        if (self.config().debug) {
            //定义错误模板
            template.config("errorTemplate",
                '<div class="g-template__error" onclick="location.reload()">\
                    <i></i>\
                    <span>轻触重试</span>\
                </div>'
            );
        }
    },
    //设置或获取全局变量  定义在./bin/www 或 ./bin/www-product 里面
    config: function(config) {
        var self = this;
        if (config) {
            self._config = config;
            template.config("debug", config.debug || false);
        } else {
            return self._config;
        }
    },
    //根据 不同的配置文件 加载不同的layout文件
    layout: function(layout) {
        var self = this;
        layout || (layout = "layout");
        if (self.config().id == "develop") {
            layout = self.config().id + "_" + layout;
        }
        self.template.layout(layout);
    },
    trycatch: function(fn) {
        var self = this;
        try {
            if (fn) {
                var args = [];
                for (var i = 1; i < arguments.length; i++) {
                    args.push(arguments[i]);
                }
                fn.apply(null, args);
            }
        } catch (e) {
            $.logger.error(e);
            try {
                self.res && self.res.end();
            } catch (e) {}
        }
    },
    loadRoutes: function(app) {
        let self = this;
        //加载 routes 目录下的所有router
        var routerPath = path.join(__dirname, "../routes/");
        var files = fs.readdirSync(routerPath);
        var dirs = [];
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (file.indexOf(".") < 1) {
                let subDirPath = path.join(__dirname, "../routes/" + file + "/");
                dirs.push(subDirPath);
                continue;
            }

            self.__loadRoute(app, routerPath + file);
        }
        dirs.forEach(dir => {
            let subFiles = fs.readdirSync(dir);
            subFiles.forEach(f => {
                if (f.indexOf(".") > 1) {
                    self.__loadRoute(app, dir + f);
                }
            });
        });
    },
    __loadRoute: function(app, path) {
        var router = require(path);
        $.logger.debug("加载路由:" + path);
        app.use("", router);
    },
    query: function(req, name, def) {
        return req.query[name] ? req.query[name] : def;
    },
    get: function(ops, dataType, callback) {
        var self = global;
        self.trycatch(self.request.get, ops, dataType, callback);
    },
    post: function(ops, dataType, callback) {
        var self = global;
        self.trycatch(self.request.post, ops, dataType, callback);
    },
    addResource: function(data, resource) {
        data.resource || (data.resource = []);
        if (typeof resource.path == "string") {
            data.resource.push(resource);
        } else {
            for (var i = 0; i < resource.path.length; i++) {
                data.resource.push({
                    type: resource.type,
                    path: resource.path[i]
                });
            }
        }
    },
    js: function(data, js) {
        return this.addResource(data, { type: 1, path: js });
    },
    css: function(data, css) {
        return this.addResource(data, { type: 2, path: css });
    },
    meta: function(data, name, content) {
        data.meta = data.meta || [];
        data.meta.push({
            name: name,
            content: content
        });
    },
    //对应的微信端的地址
    mobileUrl: function(data, url, param) {
        param = param || {};
        var paramStr = [];
        for (var key in param) {
            paramStr.push(key + "=" + param[key]);
        }
        if (paramStr.length > 0) {
            paramStr = paramStr.join("&");
            if (url.indexOf("?") > 0) {
                url += "&" + paramStr;
            } else {
                url += "?" + paramStr;
            }
        }
        if (url.indexOf("http") == -1) {
            url = this.config().mobile_domain + url;
        }
        this.meta(data, "mobile-agent", "format=xhtml;url=" + url);
    },
    //获取data
    data: function(req, api, callback) {
        //代码已经迁移到 dataFactory.js
        dataFactory.get(req, api, callback);
    },

    //基于seo优化，之前保存下来的url需进行重定向
    redirectUrl: function(url, req, res) {
        if (arguments.length < 2 || 'string' != typeof url) return;
        if (2 == arguments.length) {
            req.redirect(url); //重定向
        }
        /*var param = '';
        var reqQueryData = req.query;
        for(var key in reqQueryData){
            if(reqQueryData.hasOwnProperty(key)){
                param += key +'=' +reqQueryData[key] + '&';
            }
        }
        param = param?'?' + param.substring(0,param.length - 1): '';
        url += param;*/
        url += req._parsedUrl.search;
        res.redirect(301, url);
    },


    formatData: function(title, data, req, resource) {
        var self = this;

        data.title = "" + title;

        data.data = resource.data;
        // if(data.data.ads){
        //     view.formatAdsContent(data.data.ads,self);
        // }
        // console.log(resource)

        data.env = self.config().id;
        data.cssDomain = self.config().cssDomain;
        data.jsDomain = self.config().jsDomain;


        // data.redirecturi = "http://" + self.config().redirecturi + "/account/accountLoginSuccess.html";
        // //data.redirecturi="http://"+self.config().redirecturi;
        // data.urlDomain = "http://"+self.config().redirecturi;//当前所属的域名传过去

        // if(req.originalUrl.indexOf("accountLoginSuccess") > 0){
        //     data.callback = true;
        // }else{
        //     data.callback = false;
        // }
        // //如果有带Http-X-Pjax  是不输出layout的
        // data.data["Http-X-Pjax"] = req.header("Http-X-Pjax");
        //
        // data.query = req.query;

        // if(!data.css){
        //     data.css = req.originalUrl.split("/")[req.originalUrl.split("/").length-1].match(/(.*?)\.html/im)[1];
        // }

        //设置layout文件 每个请求过来都必须设置 因为每次设置都是临时设置的
        self.layout("layout");
    },
    wapFormatData: function(title, data, req, resource) {
        var self = this;

        data.title = "林氏木业-" + title;

        data.data = resource.data;
        // if(data.data.ads){
        //     view.formatAdsContent(data.data.ads,self);
        // }

        data.env = self.config().id;
        data.cssDomain = self.config().cssDomain;
        data.jsDomain = self.config().jsDomain;


        // data.redirecturi = "http://" + self.config().redirecturi + "/account/accountLoginSuccess.html";
        // //data.redirecturi="http://"+self.config().redirecturi;
        // data.urlDomain = "http://"+self.config().redirecturi;//当前所属的域名传过去

        // if(req.originalUrl.indexOf("accountLoginSuccess") > 0){
        //     data.callback = true;
        // }else{
        //     data.callback = false;
        // }
        // //如果有带Http-X-Pjax  是不输出layout的
        // data.data["Http-X-Pjax"] = req.header("Http-X-Pjax");
        //
        // data.query = req.query;

        // if(!data.css){
        //     data.css = req.originalUrl.split("/")[req.originalUrl.split("/").length-1].match(/(.*?)\.html/im)[1];
        // }

        //设置layout文件 每个请求过来都必须设置 因为每次设置都是临时设置的
        self.layout("waplayout");
    },
    _login: function(req, res) {
        var self = this;
        var redirectUrl = encodeURIComponent(req.href);
        return self.trycatch(res.redirect.bind(res), "/login?redirectUrl=" + redirectUrl);
    },
    //拦截器
    interceptor: function() {
        var self = this;
        return function interceptor(req, res) {
            self.__initReq(req, res);
            $.logger.debug("global.js interceptor 请求的url:" + req.href)

            //过滤那些不需要拦截的链接
            if (self.__isExclude(req)) {
                $.logger.debug("global.js interceptor " + req.href + " 这个链接不需要拦截");
                return req.next();

            }
            if (self.__accountUrl(req)) {
                //如果这个页面是需要登陆的 那就判断是否有cookie
                if (!req.cookies["LSMY_PC_USER_ID"]) {
                    return self._login(req, res);
                }
            }
            req.next();
        };
    },
    toMimracleResult: function(apiResult) {
        let result = {};
        result.code = apiResult.code;
        result.msg = apiResult.msg;
        result.succeed = apiResult.code == 200;
        return result;
    }
};
global.__init();
module.exports = global;