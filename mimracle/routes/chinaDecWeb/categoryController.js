const express = require('express');
const router = express.Router();
const global = require('../../my_modules/global');
let mimracleHelper = require('../../my_modules/mimracleHelper');
const $ = require("../../my_modules/util");

router.get('/category/:category_code', function (req, res, next) {
    let api_key = req.headers["micracle-crm"];
    let category_key = mimracleHelper.getCatetoryKey(req.params.category_code);
    let page_size = req.query["page_size"] || 10;
    let page_no = req.query["page_no"] || 1;

    // 获取栏目下文章
    let getHomeAdversts = new Promise((resolve, reject) => {
        var api = {
            getHomeAdversts: {
                url: '/api/article/list',
                data: {
                    api_key: api_key,
                    category_key: category_key,
                    page_size: page_size,
                    page_no: page_no
                }
            }
        };

        global.data(req, api, function (err, resource) {
            var data = {};
            global.formatData("获取栏目下文章", data, req, resource);
            let d = data.data;
            res.render("category/index.html", d);
        });
    });

    let getTopCategories = new Promise((resolve, reject) => {
        var api = {
            getTopCategories: {
                url: '/api/category/top-categories',
                data: {
                    api_key: api_key
                }
            }
        };

        global.data(req, api, function (err, resource) {
            var data = {};
            global.formatData("获取顶级导航栏", data, req, resource);
            resolve(data.data);
        });
    });

    Promise.all([getHomeAdversts, getTopCategories]).then((result) => {
        let d = {
            homeAdversts: result[0],
            memus: result[1]
        };
        res.render("chinaDecWeb/category/index.html", d);
    }).catch((error) => {
        $.logger.error(error);
    });
});

module.exports = router;