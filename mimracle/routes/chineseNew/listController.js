const express = require('express');
const router = express.Router();
const global = require('../../my_modules/global');
const mimracleHelper = require('../../my_modules/mimracleHelper');

router.get('/chineseNew/list', function(req, res, next) {

    res.render("chineseNew/list/index.html");

});

router.get('/chineseNew/category/:category_code', function(req, res, next) {

    console.log("category_code", req.params.category_code);
    res.render("chineseNew/list/index.html");

});

module.exports = router;