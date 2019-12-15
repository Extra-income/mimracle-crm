const express = require('express');
const router = express.Router();
const global = require('../my_modules/global');

router.get('/test.html', function(req, res, next) {

    let getTopCategories = new Promise((resolve, reject) => {
        var api = {
            getTopCategories: {
                url: '/api/category/top-cagetories',
                data: {
                    api_key: 'guangdongqiji',
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

    let getAdversts = new Promise((resolve, reject) => {
        var api = {
            getTopCategories: {
                url: '/api/article/sepcial-list',
                data: {
                    api_key: 'guangdongqiji'
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
            getTopCategories: {
                url: '/api/custom/company-setting',
                data: {
                    api_key: 'guangdongqiji'
                }
            }
        };

        global.data(req, api, function(err, resource) {
            var data = {};
            global.formatData("获取底部设置", data, req, resource);
            resolve(data.data);
        });
    });

    Promise.all([getTopCategories, getAdversts, getCustomSetting]).then((result) => {
        let d = {
            memus: result[0],
            adversts: result[1],
            customSetting: result[2]
        };
        console.log(d);
        res.render("test/index.html", d);
    }).catch((error) => {
        console.log(error)
    });
});


module.exports = router;