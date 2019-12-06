var express = require('express');
var router = express.Router();
var global = require('../my_modules/global');
var logger = require("../my_modules/util").logger;
var cache = require("../my_modules/cache");

// var indexService = require("../service/indexService");

/** 404 Not Found*/
router["404"] = function(req,res,next){
    var api = {

    };

    global.data(req,api,function(err,resource){
        var data = {
            css:"404"
        };
        global.formatData("Not Found",data,req,resource);
        data.jsEntry = "VM/index/404";
        res.status(404);
        res.render("index/404.html",data);
    });
};



/**
 * @page 首页
 * @param ?
 * @auth zwz
 * */

router.get('/index.html', function(req, res, next) {
    res.redirect('/');
})

router.get('/index/index.html', function(req, res, next) {
    res.redirect('/');
})


router.get('/', function(req, res, next) {

    var api = {
        index:{
            url:"/os/ads/getPageInfo.do",
            data:{
                page_code:"OSShouYe"
            }
        }
    };

    global.data(req,api,function(err,resource){
        var data = {
        };
        global.formatData("林氏木业官方网站 - 用精置，活出兴致",data,req,resource);

        res.render("index/index.html",data);
    });

});


module.exports = router;