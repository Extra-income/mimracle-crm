const express = require('express');
const router = express.Router();
const global = require('../my_modules/global');
const $ = require("../my_modules/util");

router.get('/article/:article_id', function(req, res, next) {
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

    Promise.all([getArticle, getAdversts]).then((result) => {
        let d = {
            articleDetail: result[0],
            adversts: result[1]
        };
        res.render("article/index.html", d);
    }).catch((error) => {
        $.logger.error(error);
    });
});


module.exports = router;