const express = require('express');
const router = express.Router();
const global = require('../../my_modules/global');
const mimracleHelper = require('../../my_modules/mimracleHelper');

router.get('/chineseNew/list', function(req, res, next) {

    res.render("chineseNew/list/index.html");

});

module.exports = router;