const express = require('express');
const router = express.Router();
const global = require('../../my_modules/global');
const mimracleHelper = require('../../my_modules/mimracleHelper');

router.get('/chineseNew/common/get-sidebar', function(req, res, next) {

    let getHotList = new Promise((resolve, reject) => {
        var api = {
            getTopCategories: {
                url: '/api/article/sepcial-list',
                data: {
                    hot_count: 20
                }
            }
        };
    
        global.data(req, api, function(err, resource) {
            var data = {};
            global.formatData("获取特别列表文章->热点内容", data, req, resource);
            resolve(data.data.hots);
        });
    });

    let getTechnologyList = getArticlesByCategory(req, "technology", 7, 1);
    let getSocialList = getArticlesByCategory(req, "social", 7, 1);
    let getCarList = getArticlesByCategory(req, "car", 7, 1);
    let getInternationalList = getArticlesByCategory(req, "international", 7, 1);

    Promise.all([getHotList, getTechnologyList, getSocialList, getCarList, getInternationalList
    ]).then((result) => {
        let d = {
            hots: result[0],
            technology: result[1],
            social: result[2],
            car: result[3],
            international: result[4]
        };
        res.json(d);
    });

});

let getArticlesByCategory = function(req, category_code, page_size, page_no) {
    return new Promise((resolve, reject) => {
        let code = category_code;
        var api = {
            getHomeAdversts: {
                url: '/api/article/list',
                data: {
                    category_key: mimracleHelper.getCatetoryKey(code),
                    page_size: page_size || 8,
                    page_no: page_no || 1
                }
            }
        };

        global.data(req, api, function(err, resource) {
            var data = {};
            global.formatData("获取" + category_code + "文章列表", data, req, resource);
            resolve(data.data);
        });
    });
}

module.exports = router;