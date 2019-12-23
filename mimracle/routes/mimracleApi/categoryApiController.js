let express = require('express');
let router = express.Router();
let global = require('../../my_modules/global');
let logger = require("../../my_modules/util").logger;
let request = require('request');
let mimracleHelper = require('../../my_modules/mimracleHelper');

// 顶级导航栏分类
router.get("/api/category/top-categories", function(req, res, next) {

    let opt = mimracleHelper.buildOpt("/api/Apilist/top_cate", {}, req);
    if (opt == null) {
        res.json(mimracleHelper.notExistsApiKeyResult());
        return;
    }

    request.post(opt, (err, response, body) => {
        let apiResult = JSON.parse(body);
        let result = mimracleHelper.toMimracleResult(apiResult);

        if (apiResult.code == 200 && apiResult.data != null && apiResult.data.length > 0) {
            result.data = [];
            apiResult.data.forEach(element => {
                result.data.push({
                    category_id: element.cateid,
                    name: element.name,
                    icon: element.icon
                });
            });
        } else {
            result = mimracleHelper.getFailResult(apiResult.code, apiResult.msg);
        }

        res.json(result);
    });
});

// 子级导航栏分类
router.get("/api/category/sub-categories", function(req, res, next) {

    let postData = {
        catecon: req.query["category_id"]
    };
    if (typeof req.query["page_size"] != "undefined") {
        postData.num = req.query["page_size"];
    }

    let opt = mimracleHelper.buildOpt("/api/Apilist/cates", postData, req);
    if (opt == null) {
        res.json(mimracleHelper.notExistsApiKeyResult());
        return;
    }

    request.post(opt, (err, response, body) => {
        let apiResult = JSON.parse(body);
        let result = mimracleHelper.toMimracleResult(apiResult);

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
        } else {
            result = mimracleHelper.getFailResult(apiResult.code, apiResult.msg);
        }

        res.json(result);
    });
});

// 获取菜单栏
router.get("/api/category/menu", function(req, res, next) {
    let opt = mimracleHelper.buildOpt("/api/Apilist/nav", {}, req);
    if (opt == null) {
        res.json(mimracleHelper.notExistsApiKeyResult());
        return;
    }

    request.post(opt, (err, response, body) => {
        let apiResult = JSON.parse(body);
        let result = mimracleHelper.toMimracleResult(apiResult);

        if (apiResult.code == 200 && apiResult.data != null) {
            result.data = [];
            apiResult.data.forEach(element => {
                let item = {
                    category_id: element.cateid,
                    name: element.name,
                    children: []
                };
                element.son.forEach(s => {
                    item.children.push({
                        category_id: s.cateid,
                        name: s.name
                    });
                });
                result.data.push(item);
            });
        } else {
            result = mimracleHelper.getFailResult(apiResult.code, apiResult.msg);
        }

        res.json(result);
    });
});

router.get("/api/category/detail/:category_id", function(req, res, next) {
    let opt = mimracleHelper.buildOpt("/api/Apilist/get_cate_info", {cateid: req.param.category_id}, req);
    if (opt == null) {
        res.json(mimracleHelper.notExistsApiKeyResult());
        return;
    }

    request.post(opt, (err, response, body) => {
        let apiResult = JSON.parse(body);
        let result = mimracleHelper.toMimracleResult(apiResult);
        if (apiResult.code == 200 && apiResult.data != null) {
            result.data = {
                current: {
                    category_id: apiResult.data.now_cate.cateid,
                    name: apiResult.data.now_cate.name,
                    icon: apiResult.data.now_cate.icon
                }
            };
        } else {
            result = mimracleHelper.getFailResult(apiResult.code, apiResult.msg);
        }
        res.json(result);
    });
});

module.exports = router;