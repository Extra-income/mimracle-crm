const express = require('express');
const router = express.Router();
const global = require('../my_modules/global');
const mimracleHelper = require('../my_modules/mimracleHelper');

router.get('/test.html', function(req, res, next) {

    let api_key = req.headers["micracle-crm"];

    let getTopCategories = new Promise((resolve, reject) => {
        var api = {
            getTopCategories: {
                url: '/api/category/top-categories',
                data: {
                    api_key: api_key
                }
            }
        };

        global.data(req, api, function(err, resource) {
            var data = {};
            global.formatData("获取顶级导航栏", data, req, resource);
            resolve(data.data);
        });
    });

    let getAdversts = new Promise((resolve, reject) => {
        var api = {
            getSepcialList: {
                url: '/api/article/sepcial-list',
                data: {
                    api_key: api_key
                }
            }
        };

        global.data(req, api, function(err, resource) {
            var data = {};
            global.formatData("获取广告", data, req, resource);
            resolve(data.data);
        });
    });

    let getCustomSetting = new Promise((resolve, reject) => {
        var api = {
            getCustomSetting: {
                url: "/api/custom/company-setting",
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

    let getHomeAdversts = new Promise((resolve, reject) => {
        var api = {
            getHomeAdversts: {
                url: '/api/advert/list',
                data: {
                    api_key: api_key
                }
            }
        };

        global.data(req, api, function(err, resource) {
            var data = {};
            global.formatData("获取首页广告", data, req, resource);
            let r = {
                top: data.data[0],
                second: data.data[1],
                third: data.data[2],
                fourth: data.data[3],
                fivth: data.data[4]
            }
            resolve(r);
        });
    });

    // 获取新闻(快讯)
    let getNewsForFast = getArticlesByCategory(req, api_key, "new", 9, 1);
    // 获取国内文章
    let getNewsForInland = getArticlesByCategory(req, api_key, "inland", 6, 1);
    // 获取社会文章
    let getNewForSocial = getArticlesByCategory(req, api_key, "social", 10, 1);
    // 获取国际文章
    let getNewForInternational = getArticlesByCategory(req, api_key, "international", 10, 1);
    // 获取科技文章
    let getNewForTechnology = getArticlesByCategory(req, api_key, "technology", 10, 1);
    // 获取财经文章
    let getNewForEconomics = getArticlesByCategory(req, api_key, "economics", 10, 1);
    // 获取时尚文章
    let getNewForFashion = getArticlesByCategory(req, api_key, "fashion", 10, 1);

    Promise.all([getTopCategories, getAdversts, getCustomSetting, getHomeAdversts, getNewsForFast, getNewsForInland, getNewForSocial,
        getNewForInternational, getNewForTechnology, getNewForEconomics, getNewForFashion
    ]).then((result) => {
        let d = {
            memus: result[0],
            adversts: result[1],
            customSetting: result[2],
            homeAdverst: result[3],
            fastNew: result[4], // 新闻(快讯)
            inland: result[5], //国内文章
            social: result[6], //社会
            international: result[7], //国际
            technology: result[8], //科技
            economics: result[9], //财经
            fashion: result[10] //时尚
        };
        console.log(d);
        res.render("test/index.html", d);
    }).catch((error) => {
        console.log(error)
    });
});

let getArticlesByCategory = function(req, api_key, category_code, page_size, page_no) {
    return new Promise((resolve, reject) => {
        let code = category_code;
        var api = {
            getHomeAdversts: {
                url: '/api/article/list',
                data: {
                    api_key: api_key,
                    category_key: mimracleHelper.getCatetoryKey(code),
                    page_size: page_size || 8,
                    page_no: page_no || 1
                }
            }
        };

        global.data(req, api, function(err, resource) {
            var data = {};
            global.formatData("获取" + category_code + "新闻", data, req, resource);
            resolve(data.data);
        });
    });
}

module.exports = router;