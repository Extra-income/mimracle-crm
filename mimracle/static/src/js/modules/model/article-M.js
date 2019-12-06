var ajax = require("U/ajax");
var cache = require("U/cache");

function _fetch (url, param, success){
    var _loadingLayer
    ,   _clearTimeout = window.setTimeout(function (){
        _loadingLayer = layer.msg('加载中', {
            icon: 17,
            shade: 0.01,
            time: 10000,
        })
    }, 1000)

    ajax.getAsync(url, param, function (result){
        window.clearTimeout(_clearTimeout)
        layer.close(_loadingLayer)

        result.success && success(result)
    }, function (){
        layer.msg('请求失败', { icon: 2 })
    })
}

module.exports = {
	// 文章首页
	getArticleList: function (param, success){
        _fetch('/pc/cms/getListArticleData.do', param, success)
    },
    // 文章首页栏目分类
    getIndexThemes: function (success){
        _fetch('/pc/cms/getCategoryList.do', '', success)
    },
    // 文章评论
    getComments: function (param, success){
        _fetch('/pc/cms/listArticleComment.do', param, success)
	},
}