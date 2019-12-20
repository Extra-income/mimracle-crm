const express = require('express');
const router = express.Router();
const global = require('../my_modules/global');
let mimracleHelper = require('../my_modules/mimracleHelper');
const $ = require("../my_modules/util");

router.get('/list/:category_code', function (req, res, next) {
  let api_key = req.headers["micracle-crm"];
  let category_key = mimracleHelper.getCatetoryKey(req.params.category_code);
  let page_size = req.query["page_size"] || 10;
  let page_no = req.query["page_no"] || 1;

  // 获取栏目下文章
  let getArticleList = new Promise((resolve, reject) => {
    var api = {
      getArticleList: {
        url: '/api/article/list',
        data: {
          api_key: api_key,
          category_key: category_key,
          page_size: page_size,
          page_no: page_no
        }
      }
    };

    global.data(req, api, function(err, resource) {
      var data = {};
      global.formatData("获取专栏文章", data, req, resource);
      resolve(data.data);
    });
  });

  let getHotArticleList = new Promise((resolve, reject) => {
    var api = {
      getHotArticleList: {
        url: '/api/article/sepcial-list',
        data: {
          api_key: api_key,
        }
      }
    };

    global.data(req, api, function(err, resource) {
      var data = {};
      global.formatData("获取特别文章列表", data, req, resource);
      resolve(data.data);
    });
  });

  let getTopCategories = new Promise((resolve, reject) => {
    var api = {
        getTopCategories: {
            url: '/api/category/top-cagetories',
            data: {
                api_key: api_key,
                category_id: '47',
                page_size: '1'
            }
        }
    };

    global.data(req, api, function(err, resource) {
        var data = {};
        global.formatData("获取顶级导航栏", data, req, resource);
        resolve(data.data);
    });
});

  let getCustomSetting = new Promise((resolve, reject) => {
    var api = {
        getTopCategories: {
            url: '/api/custom/company-setting',
            data: {
                api_key: api_key
            }
        }
    };

    global.data(req, api, function(err, resource) {
        var data = {};
        global.formatData("获取底部设置", data, req, resource);
        resolve(data.data);
    });
});

  Promise.all([getArticleList, getHotArticleList, getCustomSetting, getTopCategories]).then((reslove) => {
    res.render("list/index.html", { articleList: reslove[0], adverstsList: reslove[1], customSetting: reslove[2], memus: reslove[3],});
  }).catch((error) => {
    $.logger.error(error);
  });
});


module.exports = router;