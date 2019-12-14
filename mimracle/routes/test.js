const express = require('express');
const router = express.Router();
const global = require('../my_modules/global');

router.get('/test.html', function(req,res,next){
  var api = {
      test: {
          url: '/api/category/top-cagetories',
          data: {
            api_key: 'guangdongqiji',
            category_id:'47',
            page_size:'1'
          }
      }
  };

  global.data(req,api,function(err,resource){
      var data = {
          // jsEntry:"VM/yishibanke/yishibanke"
      };
      global.formatData("祁际网络",data,req,resource);
      console.log('data--',data)

    res.render("test/index.html",data);
      
  });
});


module.exports = router;