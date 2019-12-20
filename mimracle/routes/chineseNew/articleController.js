const express = require('express');
const router = express.Router();
const global = require('../../my_modules/global');
const mimracleHelper = require('../../my_modules/mimracleHelper');

router.get('/chineseNew/article/:article_id', function(req, res, next) {

    res.render("chineseNew/article/index.html");

});

module.exports = router;