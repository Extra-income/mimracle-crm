let express = require('express');
let router = express.Router();
let global = require('../../my_modules/global');
let logger = require("../../my_modules/util").logger;
let request = require('request');
let mimracleHelper = require('../../my_modules/mimracleHelper');

// 获取广告
router.get("/api/advert/list", function(req, res, next) {
    let postData = {};
    if (typeof req.query["type"] != "undefined") {
        // res.json(mimracleHelper.getFailResult(200, "广告类型是必填项"));
        // return;
        let advertTypes = mimracleHelper.getAdvertTypes();
        let type = advertTypes[req.query["type"]];
        post.type = type;
    }

    //let postData = { type: type };

    let opt = mimracleHelper.buildOpt("/api/Apilist/advert", postData, req);
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
                    advert_id: element.advertid,
                    title: element.title,
                    url: element.url,
                    type: req.query["type"],
                    img: "http://admin.gl5888.top" + element.img
                });
            });
        } else {
            result = mimracleHelper.getFailResult(apiResult.code, apiResult.msg);
        }

        res.json(result);
    });
});

module.exports = router;