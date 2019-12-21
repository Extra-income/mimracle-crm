const express = require('express');
const router = express.Router();
const global = require('../../my_modules/global');
const mimracleHelper = require('../../my_modules/mimracleHelper');
const util = require('../../my_modules/util');

let _logger = util.logger;

router.get('/chineseNew/', function(req, res, next) {

    //let api_key = req.headers["micracle-crm"];

    let getMenus = new Promise((resolve, reject) => {
        var api = {
            getMenus: {
                url: '/api/category/top-categories',
                data: {}
            }
        };

        global.data(req, api, function(err, resource) {
            var data = {};
            global.formatData("获取顶级导航栏", data, req, resource);
            _logger.debug("getMenus", data.data);
            resolve(data.data);
        });
    });

    let getAdversts = new Promise((resolve, reject) => {
        var api = {
            getSepcialList: {
                url: '/api/article/sepcial-list',
                data: {
                    //api_key: api_key
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
                    //api_key: api_key
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
                    //api_key: api_key
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

    // 获取科技文章
    let getNewForTechnology = getArticlesByCategory(req, "technology", 10, 1);

    Promise.all([getMenus, getAdversts, getCustomSetting, getHomeAdversts, getNewForTechnology
    ]).then((result) => {
        let d = {
            memus: result[0],
            adversts: result[1],
            customSetting: result[2],
            homeAdverst: result[3],
            technology: result[4] //科技
        };
        console.log("index result", d);
        res.render("chineseNew/home/index.html", d);
    }).catch((error) => {
        console.log(error)
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
            global.formatData("获取" + category_code + "新闻", data, req, resource);
            resolve(data.data);
        });
    });
}

module.exports = router;