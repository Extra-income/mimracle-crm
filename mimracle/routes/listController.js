const express = require('express');
const router = express.Router();
const global = require('../my_modules/global');

router.get('/list.html', function(req,res,next){
  // var api = {
  //     test: {
  //         url: '/os/ads/getPageInfo.do',
  //         data: {
  //           page_code: 'OSGongXiangMeiKe'
  //         }
  //     }
  // };

  // global.data(req,api,function(err,resource){
  //     var data = {
  //         jsEntry:"VM/yishibanke/yishibanke"
  //     };
  //     global.formatData("一时半刻 - 林氏木业官方网站 - 用精置，活出兴致",data,req,resource);

      
  // });
  res.render("list/index.html");
});


module.exports = router;