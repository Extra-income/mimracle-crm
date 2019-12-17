
const request = require('./request');
const async = require('async');
const $ = require("./util");
const M = require("../model/m");
const fs = require("fs");
const path = require("path");
require('../model');
const logger = $.logger;


//加载 model 目录下的所有Model
// var modelPath = path.join(__dirname,"../model/");
// var files = fs.readdirSync(modelPath);
// $.each(files,function(){
//     if(this.indexOf(".") == 0 || this == "m.js"){
//         return true;
//     }
//     logger.debug("加载Model:"+modelPath+this);
//     require(modelPath+this)(M);

// });

//数据工厂

var dataFactory = {
    trycatch:function(fn){
        var self = this;
        try{
            if(fn){
                var args = [];
                for(var i=1;i<arguments.length;i++){
                    args.push(arguments[i]);
                }
                fn.apply(null,args);
            }
        }catch(e){
            $.logger.error(e);
            try{
                self.res && self.res.end();
            }catch(e){}
        }
    },
    get:function(req,api,callback){
        if(!callback) {
            callback = api;
            api = {};
        }
        var self = this;
        req.data || (req.data = {});
        //在trycatch中要用到
        self.res = req.res;

        var dealArrs = [];
        var tempObj = {};
        var data = {};
        var fun;
        var s = new Date().getTime();

        for(var key in api){
            data[key] = {};
            if(!api[key].url){
                continue;
            }

            api[key].type || (api[key].type = "get");
            api[key].data || (api[key].data = {});
            var api_request = null;
            if(api[key].type.toLowerCase() == "get"){
                api_request = self.get;
                fun = request.get;
            }else{
                api_request = self.post;
                fun = request.post;
            }
            tempObj = {'key': key, 'opt': {url:api[key].url,req:req,data:api[key].data,headers:api[key].headers}, 'fun': fun, 'dataType': api[key].dataType};
            dealArrs.push(tempObj);
            tempObj = {};
        }
        if(dealArrs.length == 0){
            return self.trycatch(callback,null,{data:{}});
        }
        async.map(dealArrs, function(deal, towards) {
            deal.dataType = deal.dataType || "json";
            var modelKey = deal.opt.url;
            deal.opt.url = M.url(modelKey);
            var mock = M.mock(modelKey);
            if(!mock){
                deal.fun(deal.opt, deal.dataType, function(err, result) {
                    towards(null, {modelKey:modelKey,key: deal.key,dataType:deal.dataType, result: result});
                });
            }else{
                towards(null, {modelKey:modelKey,key: deal.key,dataType:deal.dataType, result: mock});
            }
        }, function(err, result) {

            for(var ii = 0; ii < result.length; ii++) {
                if(result[ii].dataType.toLowerCase() == "json"){
                    if(!result[ii].result.success){
                        result[ii].result.message && $.logger.debug('dataFactory.js get message:' + result[ii].result.message);
                    }
                    var object = result[ii].result && result[ii].result.object;
                    if($.type(result[ii].result.code) == "undefined" && !object){
                        object = result[ii].result && result[ii].result;
                    }

                    data[result[ii].key] = M.translate(result[ii].modelKey,object) || object;
                }else{
                    data[result[ii].key] = result[ii].result;
                }
            }
            var e = new Date().getTime();
            $.logger.debug(req.href +' api接口获取数据总共花费时间: ' + (e-s)+"ms");

            ////////////////////////////////////////
            // 图片的改成https、http自适应
            var tmp = JSON.stringify(data);
            tmp = tmp.replace(/http:\/\/ossfile.linshimuye.com/g, '//ossfile.linshimuye.com');
            data = JSON.parse(tmp.replace(/http:\/\/pic.linshimuye.com/g, '//pic.linshimuye.com'));
            ////////////////////////////////////////

            self.trycatch(callback,null,{data:data});
            delete data;
        });
    }
};

module.exports = dataFactory;