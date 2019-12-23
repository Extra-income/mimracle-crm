let express = require('express');
let router = express.Router();
let global = require('../../my_modules/global');
let logger = require("../../my_modules/util").logger;
let request = require('request');
let mimracleHelper = require('../../my_modules/mimracleHelper');

router.get("/api/search", function (req, res, next) {
  let postData = {
    keyword: req.query["keyword"],
    row: req.query["page_size"] || 10,
    page: req.query["page_no"] || 1

  };

  let opt = mimracleHelper.buildOpt("/api/Apilist/search", postData, req);
  if (opt == null) {
    res.json(mimracleHelper.notExistsApiKeyResult());
    return;
  }

  request.post(opt, (err, response, body) => {
    let apiResult = JSON.parse(body);
    let result = mimracleHelper.toMimracleResult(apiResult);
    if (apiResult.code == 200 && apiResult.data != null) {
      result.data = { article_list: []};

      let pager = {
        total: apiResult.data.total,
        page_size: apiResult.data.per_page,
        page_index: apiResult.data.current_page,
        max_page_no: apiResult.data.last_page
      };
      let serachUrl = `/chineseNew/search/${postData.keyword}`;
      pager.list = mimracleHelper.initPagerDetail(pager, serachUrl);
      
      result.data.pager = pager;
      console.log(result);
        
      apiResult.data.data.forEach(element => {
        result.data.article_list.push({
          article_id: element.articleid,
          title: element.title,
          keyword: element.keyword,
          from: element.isfrom,
          img: element.icon,
          url: `/article/${element.articleid}`,
          edit_time: new Date(element.edit_time * 1000),
        });
      });
    } else {
      result = mimracleHelper.getFailResult(apiResult.code, apiResult.msg);
    }

    res.json(result);
  });
});

module.exports = router;