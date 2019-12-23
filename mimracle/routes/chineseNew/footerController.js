const express = require('express');
const router = express.Router();
const global = require('../../my_modules/global');
const $ = require("../../my_modules/util");

router.get('/chineseNew/footer/detail/:page_id', function(req, res, next) {
    let api_key = req.headers["micracle-crm"];

    let pageId = req.params.page_id;
    let getFooterDetail = new Promise((resolve, reject) => {
        var api = {
            getFooterDetail: {
                url: '/api/footer/pages/detail',
                data: {
                    api_key: api_key,
                    page_id: pageId,
                }
            }
        };
        global.data(req, api, function(err, resource) {
            var data = {};
            global.formatData("获取底部详情页", data, req, resource);
            resolve(data.data);
        });
    });

    let getTopCategories = new Promise((resolve, reject) => {
        var api = {
            getTopCategories: {
                url: '/api/category/top-categories',
                data: {
                    api_key: api_key,
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

    Promise.all([getFooterDetail, getTopCategories, getCustomSetting]).then((reslove) => {
        res.render("chineseNew/footer/detail.html", { pagedetail: reslove[0], memus: reslove[1], customSetting: reslove[2], });
    }).catch((error) => {
        $.logger.error(error);
    })
});

module.exports = router;