let express = require('express');
let router = express.Router();
let global = require('../my_modules/global');
let logger = require("../my_modules/util").logger;
let request = require('request');
let mimracleHelper = require('../my_modules/mimracleHelper');

/**
 * 获取友情链接
 */
router.get("/api/custom/friend-link", function(req, res, next) {
    let opt = mimracleHelper.buildOpt("/api/Apilist/friend_link", {}, req);
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
                result.data.push({
                    friend_id: element.friendid,
                    title: element.title,
                    img: element.icon,
                    url: element.link,
                    type: element.type
                });
            });
        } else {
            result = mimracleHelper.getFailResult(apiResult.code, apiResult.msg);
        }

        res.json(result);
    });
});

/**
 * 获取公司底部信息
 */
router.get("/api/custom/company-setting", function(req, res, next) {
    let opt = mimracleHelper.buildOpt("/api/Apilist/one_page", {}, req);
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
                result.data.push({
                    page_id: element.pageid,
                    title: element.title,
                    content: element.content
                });
            });
        } else {
            result = mimracleHelper.getFailResult(apiResult.code, apiResult.msg);
        }

        res.json(result);
    });
});

module.exports = router;