const express = require('express');
const router = express.Router();
const global = require('../../my_modules/global');
const mimracleHelper = require('../../my_modules/mimracleHelper');
const util = require('../../my_modules/util');

let _logger = util.logger;

router.get('/chineseNew/', function(req, res, next) {

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
            resolve(data.data);
        });
    });

    let getSepcialList = new Promise((resolve, reject) => {
        var api = {
            getSepcialList: {
                url: '/api/article/sepcial-list',
                data: {
                    hot_count: 18
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
                data: {}
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
                data: {}
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
            };
            resolve(r);
        });
    });

    let getFirstSectionArticles = new Promise((resolve, reject) => {
        let d = [];
        resolve(d);
    }).then(function(input) {
        // 获取新闻文章
        return getArticlesByCategory(req, "news", 13, 1, input);
    }).then(function(input) {
        // 获取科技文章
        return getArticlesByCategory(req, "technology", 6, 1, input);
    }).then(function(input) {
        // 获取社会文章
        return getArticlesByCategory(req, "social", 13, 1, input);
    }).then(function(input) {
        // 获取教育文章
        return getArticlesByCategory(req, "education", 8, 1, input);
    }).then(function(input) {
        // 获取汽车文章
        return getArticlesByCategory(req, "car", 6, 1, input);
    }).then(function(input) {
        // 获取娱乐文章
        return getArticlesByCategory(req, "entertainment", 6, 1, input);
    }).then(function(input) {
        // 获取影视文章
        return getArticlesByCategory(req, "film", 7, 1, input);
    }).then(function(input) {
        // 获取明星文章
        return getArticlesByCategory(req, "star", 5, 1, input);
    }).then(function(input) {
        // 获取财经文章
        return getArticlesByCategory(req, "economics", 10, 1, input);
    }).then(function(input) {
        return refactorObjProp(input);
    });

    let getSecondSectionArticles = new Promise((resolve, reject) => {
        let d = [];
        resolve(d);
    }).then(function(input) {
        // 获取旅游文章
        return getArticlesByCategory(req, "travel", 17, 1, input);
    }).then(function(input) {
        // 获取文化文章
        return getArticlesByCategory(req, "culture", 10, 1, input);
    }).then(function(input) {
        // 获取国际文章
        return getArticlesByCategory(req, "international", 17, 1, input);
    }).then(function(input) {
        // 获取商业文章
        return getArticlesByCategory(req, "commerce", 5, 1, input);
    }).then(function(input) {
        // 获取生活文章
        return getArticlesByCategory(req, "life", 5, 1, input);
    }).then(function(input) {
        // 获取公益文章
        return getArticlesByCategory(req, "publicWelfare", 5, 1, input);
    }).then(function(input) {
        return refactorObjProp(input);
    });

    let getThirdSectionArticles = new Promise((resolve, reject) => {
        let d = [];
        resolve(d);
    }).then(function(input) {
        // 获取体育文章
        return getArticlesByCategory(req, "sports", 17, 1, input);
    }).then(function(input) {
        // 获取房产文章
        return getArticlesByCategory(req, "houseProperty", 5, 1, input);
    }).then(function(input) {
        // 获取金融文章
        return getArticlesByCategory(req, "financial", 7, 1, input);
    }).then(function(input) {
        return refactorObjProp(input);
    });

    Promise.all([getMenus, getSepcialList, getCustomSetting, getHomeAdversts,
        getFirstSectionArticles, getSecondSectionArticles, getThirdSectionArticles
    ]).then((result) => {
        let d = {
            memus: result[0],
            specialList: result[1],
            customSetting: result[2],
            homeAdverst: result[3],
            news: result[4].news,
            technology: result[4].technology,
            social: result[4].social,
            education: result[4].education,
            car: result[4].car,
            entertainment: result[4].entertainment,
            film: result[4].film,
            star: result[4].star,
            economic: result[4].economics,
            travel: result[5].travel,
            culture: result[5].culture,
            international: result[5].international,
            commerce: result[5].commerce,
            life: result[5].life,
            sports: result[6].sports,
            houseProperty: result[6].houseProperty,
            publicWelfare: result[5].publicWelfare,
            financial: result[6].financial
        };
        res.render("chineseNew/home/index.html", d);
    }).catch((error) => {
        console.log(error)
    });
});

let getArticlesByCategory = function(req, category_code, page_size, page_no, r) {
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
            r.push({ key: category_code, list: data.data });
            resolve(r);
        });
    });
}

let refactorObjProp = function(input) {
    return new Promise((resolve, reject) => {
        let articles = {};
        for (let i = 0, len = input.length; i < len; i++) {
            articles[input[i].key] = input[i].list || [{
                article_id: 306,
                title: '今晚8点暂停发稿阿萨法发生放散阀暗室逢灯发生发达啊',
                keyword: '查收 一份 冬季 燃气热水器 保养 指南',
                from: '互联网',
                img: 'https://himg2.huanqiucdn.cn/attachment2010/2019/1202/20191202050535595.jpg?w=240',
                edit_time: '2019-12-11T03:14:00.000Z',
                url: '/article/306'
              }, {
                article_id: 306,
                title: '今晚8点暂停发稿阿萨法发生放散阀暗室逢灯发生发达啊',
                keyword: '查收 一份 冬季 燃气热水器 保养 指南',
                from: '互联网',
                img: 'https://himg2.huanqiucdn.cn/attachment2010/2019/1202/20191202050535595.jpg?w=240',
                edit_time: '2019-12-11T03:14:00.000Z',
                url: '/article/306'
              }, {
                article_id: 306,
                title: '今晚8点暂停发稿阿萨法发生放散阀暗室逢灯发生发达啊',
                keyword: '查收 一份 冬季 燃气热水器 保养 指南',
                from: '互联网',
                img: 'https://himg2.huanqiucdn.cn/attachment2010/2019/1202/20191202050535595.jpg?w=240',
                edit_time: '2019-12-11T03:14:00.000Z',
                url: '/article/306'
              }];
        }
        resolve(articles);
    });
}

module.exports = router;