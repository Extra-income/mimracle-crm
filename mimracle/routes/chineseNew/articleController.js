const express = require('express');
const router = express.Router();
const global = require('../../my_modules/global');
const mimracleHelper = require('../../my_modules/mimracleHelper');

router.get('/chineseNew/article/:article_id', function(req, res, next) {

    // res.render("chineseNew/article/index.html");
    let api_key = req.headers["micracle-crm"];
    let id = req.params.article_id;

    let getArticle = new Promise((resolve, reject) => {
        var api = {
            getArticle: {
                url: '/api/article/detail',
                data: {
                    api_key: api_key,
                    article_id: id
                }
            }
        };

        global.data(req, api, function(err, resource) {
            var data = {};
            global.formatData("获取文章详情", data, req, resource);
            resolve(data.data);
        });
    });

    let getAdversts = new Promise((resolve, reject) => {
        var api = {
            getAdversts: {
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

    Promise.all([getArticle, getAdversts, getTopCategories]).then((result) => {
        let d = {
            articleDetail: result[0],
            adversts: result[1],
            memus: result[2]
        };
        // res.render("chinaDecWeb/article/index.html", d);
        res.render("chineseNew/article/index.html",d);
        

    }).catch((error) => {
        $.logger.error(error);
    });
});

module.exports = router;