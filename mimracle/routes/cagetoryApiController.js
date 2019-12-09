let express = require('express');
let router = express.Router();
let global = require('../my_modules/global');
let logger = require("../my_modules/util").logger;
let request = require('request');

let config = require('../config.json');
let apiHost = config["api_host"];
let webKey = config["web_key"];

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