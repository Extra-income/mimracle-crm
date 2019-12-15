let express = require('express');
let router = express.Router();
let global = require('../my_modules/global');
let logger = require("../my_modules/util").logger;
let request = require('request');
let mimracleHelper = require('../my_modules/mimracleHelper');

/**
 * 按页获取指定栏目文章
 */
router.get("/api/article/list", function(req, res, next) {
    let postData = {
        cateid: req.query["category_id"]
    };
    if (typeof req.query["page_size"] != "undefined") {
        postData.row = req.query["page_size"];
    }
    if (typeof req.query["page_no"] != "undefined") {
        postData.page = req.query["page_no"];
    }

    let opt = mimracleHelper.buildOpt("/api/Apilist/cates_article", postData, req);
    if (opt == null) {
        res.json(mimracleHelper.notExistsApiKeyResult());
        return;
    }

    request.post(opt, (err, response, body) => {
        let apiResult = JSON.parse(body);
        let result = mimracleHelper.toMimracleResult(apiResult);

        if (apiResult.code == 200 && apiResult.data != null && apiResult.data.length > 0) {
            result.data = [];
            apiResult.data.forEach(element => {
                result.data.push(convertArticle(element));
            });
        } else {
            result = mimracleHelper.getFailResult(apiResult.code, apiResult.msg);
        }

        res.json(result);
    });
});

/**
 * 获取文章详情
 */
router.get("/api/article/detail", function(req, res, next) {
    let postData = {
        articleid: req.query["article_id"]
    };
    let opt = mimracleHelper.buildOpt("/api/Apilist/articles", postData, req);
    if (opt == null) {
        res.json(mimracleHelper.notExistsApiKeyResult());
        return;
    }

    request.post(opt, (err, response, body) => {
        let apiResult = JSON.parse(body);
        let result = mimracleHelper.toMimracleResult(apiResult);

        if (apiResult.code == 200 && apiResult.data != null) {
            result.data = {};

            let articleObj = convertArticle(apiResult.data.articles);
            articleObj.author = apiResult.data.articles.author;
            articleObj.content = apiResult.data.articles.content;
            articleObj.category_id = apiResult.data.articles.cateid;

            let pathObj = {};
            // pathObj.current = convertCategory(apiResult.data.mycate.cate.now_cate);
            // pathObj.parent = convertCategory(apiResult.data.mycate.cate.parent_cate);
            // pathObj.list = [];
            // if (apiResult.data.mycate.cate.list != null &&
            //     apiResult.data.mycate.cate.list.son != null &&
            //     apiResult.data.mycate.cate.list.son.length > 0) {
            //     apiResult.data.mycate.cate.list.son.forEach(element => {
            //         pathObj.list.push(convertCategory(element));
            //     });
            // }

            result.data = {
                article: articleObj,
                category: pathObj
            };
        } else {
            result = mimracleHelper.getFailResult(apiResult.code, apiResult.msg);
        }

        res.json(result);
    });
});

/**
 * 获取特别文章列表
 */
router.get("/api/article/sepcial-list", function(req, res, next) {
    let opt = mimracleHelper.buildOpt("/api/Apilist/special_article", {}, req);
    if (opt == null) {
        res.json(mimracleHelper.notExistsApiKeyResult());
        return;
    }

    request.post(opt, (err, response, body) => {
        let apiResult = JSON.parse(body);
        let result = mimracleHelper.toMimracleResult(apiResult);

        if (apiResult.code == 200 && apiResult.data != null) {
            //推荐
            let recommendTypes = [];
            apiResult.data.isrecommend.forEach(element => {
                recommendTypes.push(convertArticle(element));
            });
            //热点
            let hotTypes = [];
            apiResult.data.ishot.forEach(element => {
                hotTypes.push(convertArticle(element));
            });
            //头部
            let headTypes = [];
            apiResult.data.ishead.forEach(element => {
                headTypes.push(convertArticle(element));
            });
            //图文
            let imgTypes = [];
            apiResult.data.isimg.forEach(element => {
                imgTypes.push(convertArticle(element));
            });
            //专题
            let projectTypes = [];
            apiResult.data.isproject.forEach(element => {
                projectTypes.push(convertArticle(element));
            });

            result.data = {
                recomends: recommendTypes,
                hots: hotTypes,
                heads: headTypes,
                imgs: imgTypes,
                projects: projectTypes
            };
        } else {
            result = mimracleHelper.getFailResult(apiResult.code, apiResult.msg);
        }

        res.json(result);
    });
});

function convertArticle(dto) {
    let o = {
        article_id: dto.articleid,
        title: dto.title,
        keyword: dto.keyword,
        from: dto.isfrom,
        img: dto.icon,
        edit_time: new Date(dto.edit_time * 1000),
        url: "/article/" + dto.articleid
    };
    return o;
}

function convertCategory(dto) {
    let r = {
        category_id: dto.cateid,
        name: dto.name,
        icon: dto.icon,
        parent_id: dto.prid
    };
    return r;
}

module.exports = router;