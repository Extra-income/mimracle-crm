const express = require('express');
const router = express.Router();
const global = require('../my_modules/global');

router.get('/article/:article_id', function(req, res, next) {
  let id = req.params.article_id;

  let getArticle = new Promise((resolve, reject) => {
    var api = {
      getArticle: {
          url: '/api/article/detail',
          data: {
              api_key: 'guangdongqiji',
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

  Promise.all([getArticle, getAdversts]).then((result) => {
    let d = {
      articleDetail: result[0],
      adversts: result[1]
    };
    console.log(d);
    res.render("article/index.html", d);
  }).catch((error) => {
    console.log(error);
  });

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
  //res.render("article/index.html");
});


module.exports = router;