const express = require('express');
const router = express.Router();
const global = require('../../my_modules/global');
const mimracleHelper = require('../../my_modules/mimracleHelper');
const $ = require("../../my_modules/util");

router.get('/chineseNew/list/:category_code', function (req, res, next) {

    let api_key = req.headers["micracle-crm"];
    let category_key = mimracleHelper.getCatetoryKey(req.params.category_code);
    let page_size = req.query["page_size"] || 20;
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

        global.data(req, api, function (err, resource) {
            var data = {};
            global.formatData("获取专栏文章", data, req, resource);
            resolve(data.data);
        });
    });

    let getSidebar = new Promise((resolve, reject) => {
        var api = {
            getTopCategories: {
                url: '/common/get-sidebar',
                data: {}
            }
        };
    
        global.data(req, api, function(err, resource) {
            var data = {};
            global.formatData("获取侧边栏内容", data, req, resource);
            resolve(data.data);
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
    
        global.data(req, api, function(err, resource) {
            var data = {};
            global.formatData("获取顶级导航栏", data, req, resource);
            resolve(data.data);
        });
    });

    Promise.all([getArticleList, getSidebar, getTopCategories]).then((resolve) => {
        res.render("chineseNew/list/index.html", { articleList: resolve[0], sidebar: resolve[1],  memus: resolve[2]});
    }).catch((error) => {
        $.logger.error(error);
    });
});

module.exports = router;