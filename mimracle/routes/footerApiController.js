let express = require('express');
let router = express.Router();
let request = require('request');
let mimracleHelper = require('../my_modules/mimracleHelper');

router.get("/api/footer/pages/detail", function (req, res, next) {
    let postData = {
        pageid: req.query["page_id"],
    };

    let opt = mimracleHelper.buildOpt("/api/Apilist/pages", postData, req);
    if (opt === null) {
        res.json(mimracleHelper.notExistsApiKeyResult());
        return;
    }
    request.post(opt, (err, response, body) => {
        let apiResult = JSON.parse(body);
        let result = mimracleHelper.toMimracleResult(apiResult);

        if (apiResult.code == 200 && apiResult.data != null) {
            result.data = apiResult.data;
        } else {
            result = mimracleHelper.getFailResult(apiResult.code, apiResult.msg);
        }
        res.json(result);
    });
});

module.exports = router;