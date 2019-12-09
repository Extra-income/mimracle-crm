let express = require('express');
let router = express.Router();
let global = require('../my_modules/global');
let logger = require("../my_modules/util").logger;
let request = require('request');

let config = require('../config.json');
let apiHost = config["api_host"];
let webKey = config["web_key"];

//按页获取指定栏目文章
router.get("/api/article/list", function(req, res, next) {

    console.info(req.query["article"]);
    let api = {
        url: apiHost + "/api/Apilist/cates_article",
        data: {
            web_key: webKey,
            cateid: req["category_id"]
        }
    };
    if (typeof req.query["page_size"] != "undefined") {
        opt.form.row = req.query["page_size"];
    }
    if (typeof req.query["page_no"] != "undefined") {
        opt.form.page = req.query["page_no"];
    }

    request.post(opt, (err, response, body) => {
        let apiResult = JSON.parse(body);
        let result = global.toMimracleResult(apiResult);

        if (apiResult.code == 200 && apiResult.data != null && apiResult.data.length > 0) {
            result.data = [];
            apiResult.data.forEach(element => {
                result.data.push({
                    article_id: element.articleid,
                    title: element.title,
                    keyword: element.keyword,
                    from: element.isfrom,
                    icon: element.icon,
                    edit_time: element.edit_time
                });
            });
        }

        res.json(result);
    });
});

// 顶级导航栏分类
router.get("/api/category/top-cagetories", function(req, res, next) {
    let opt = {
        url: apiHost + "/api/Apilist/top_cate",
        form: {
            web_key: webKey,
            catecon: req.query["category_id"]
        }
    };
    request.post(opt, (err, response, body) => {
        let apiResult = JSON.parse(body);
        let result = global.toMimracleResult(apiResult);

        if (apiResult.code == 200 && apiResult.data != null && apiResult.data.length > 0) {
            result.data = [];
            apiResult.data.forEach(element => {
                result.data.push({
                    category_id: element.cateid,
                    name: element.name,
                    icon: element.icon
                });
            });
        }

        res.json(result);
    });
});

// 子级导航栏分类
router.get("/api/category/sub-cagetories", function(req, res, next) {
    let opt = {
        url: apiHost + "/api/Apilist/cates",
        form: {
            web_key: webKey,
            catecon: req.query["category_id"]
        }
    };
    if (typeof req.query["page_size"] != "undefined") {
        opt.form.num = req.query["page_size"];
    }

    request.post(opt, (err, response, body) => {
        let apiResult = JSON.parse(body);
        let result = global.toMimracleResult(apiResult);

        if (apiResult.code == 200 && apiResult.data != null && apiResult.data.parent != null) {
            result.data = {
                parent: {
                    category_id: apiResult.data.parent.cateid,
                    name: apiResult.data.parent.name,
                    icon: apiResult.data.parent.icon,
                    parent_id: apiResult.data.parent.prid
                },
                list: []
            };
            apiResult.data.son.forEach(element => {
                result.data.list.push({
                    category_id: element.cateid,
                    name: element.name,
                    icon: element.icon,
                    parent_id: element.prid
                });
            });
        }

        res.json(result);
    });
});

module.exports = router;