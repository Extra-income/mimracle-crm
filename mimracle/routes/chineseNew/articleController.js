const express = require('express');
const router = express.Router();
const global = require('../../my_modules/global');
const mimracleHelper = require('../../my_modules/mimracleHelper');

router.get('/chineseNew/article/:article_id', function(req, res, next) {
    let id = req.params.article_id;

    let getArticle = new Promise((resolve, reject) => {
        var api = {
            getArticle: {
                url: '/api/article/detail',
                data: {
                    article_id: id
                }
            }
        };

        global.data(req, api, function(err, resource) {
            var data = {};
            global.formatData("获取文章详情", data, req, resource);
            console.log(data.data);
            resolve(data.data);
        });
    }).then(function (input) {
        return new Promise((resolve, reject) => {
            var api = {
                getArticle: {
                    url: '/api/article/list',
                    data: {
                        category_id: input.category.current.category_id,
                        row: 6,
                        page: 1
                    }
                }
            };
    
            global.data(req, api, function(err, resource) {
                var data = {};
                global.formatData("获取相关文章", data, req, resource);
                input.relatedArticals = data.data;
                resolve(input);
            });
        });
    });

    let getAdversts = new Promise((resolve, reject) => {
        var api = {
            getAdversts: {
                url: '/api/article/sepcial-list',
                data: {}
            }
        };

        global.data(req, api, function(err, resource) {
            var data = {};
            global.formatData("获取广告", data, req, resource);
            resolve(data.data);
        });
    });

    let getTopCategories = new Promise((resolve, reject) => {
        var api = {
            getTopCategories: {
                url: '/api/category/top-categories',
                data: {}
            }
        };
    
        global.data(req, api, function(err, resource) {
            var data = {};
            global.formatData("获取顶级导航栏", data, req, resource);
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

    let getCustomSetting = new Promise((resolve, reject) => {
        var api = {
          getCustomSetting: {
                url: '/api/custom/company-setting',
                data: {}
            }
        };
    
        global.data(req, api, function(err, resource) {
            var data = {};
            global.formatData("获取底部设置", data, req, resource);
            resolve(data.data);
        });
    });

    Promise.all([getArticle, getAdversts, getTopCategories, getSidebar, getCustomSetting]).then((result) => {
        let d = {
            articleDetail: result[0],
            adversts: result[1],
            memus: result[2],
            sidebar: result[3],
            customSetting: result[4]
        };
        console.log("result", d);
        res.render("chineseNew/article/index.html",d);
        

    }).catch((error) => {
        $.logger.error(error);
    });
});

module.exports = router;