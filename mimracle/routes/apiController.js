var express = require('express');
var router = express.Router();
var global = require('../my_modules/global');
var logger = require("../my_modules/util").logger;

var config = require('../config.json');
var apiHost = config["api_host"];
var webKey = config["web_key"];

//文章详情内容接口
// /api/Apilist/articles, post

router.get("/article", function (req, res, next) {

    var api = {
        url: apiHost + "/api/Apilist/articles",
        data: {
            web_key: webKey,
            articleid: req["id"]
        }
    };

    global.data(req, api, function (err, resourse) {
        var data = {};
        global.formatData("", data, req, resource);
        res.send(data);
    });
});
