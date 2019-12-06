/** Power By Soham 2016/11/5 16:39 **/

var ajax = require("U/ajax");
module.exports = {
    //图库广告位
    panoAds : function(param,callback){
        ajax.getAsync("/pc/ads/getPageInfo.do",{page_code:"PCTuKu"},function (result) {
            if (result.success) {
                callback && callback({
                    type: result.code,
                    panoAds: result.object
                });
            }
        });
    },
    //2d套图风格-菜单列表
    specialStyleList : function(param,callback){
        ajax.getAsync("/pc/Special/queryStyleList.do",{},function (result) {
            if (result.success) {
                callback && callback({
                    type: result.code,
                    styleList: result.object
                });
            }
        });
    },
    //2d套图空间-菜单列表
    specialSpaceList : function(param,callback){
        ajax.getAsync("/pc/Special/querySpaceList.do",{},function (result) {
            if (result.success) {
                callback && callback({
                    type: result.code,
                    spaceList: result.object
                });
            }
        });
    },
    //http://pc.mmshop-dev.my0404.com/pc/Special/querySpecialSrcList.do?styName=%E4%B8%AD%E5%BC%8F&spcName=%E5%AE%A2%E5%8E%85&pageNum=1&pageSize=10
    //
    //2d,3d列表
    panoNewList : function(param,callback){
        ajax.getAsync("/pc/Special/querySpecialSrcList.do",param,function (result) {
            if (result.success) {
                callback && callback({
                    type: result.code,
                    panoList: result.object
                });
            }
        });
    },
    //3d列表/pc/pano/queryFilterFittingList.do?style=中式&type=二居&area=0-6000&relChannel=b2c&pageNum=1&pageSize=10
    pano3DNewList : function(param,callback){
        ajax.getAsync("/pc/pano/queryFilterFittingList.do",param,function (result) {
            if (result.success) {
                callback && callback({
                    type: result.code,
                    panoList: result.object
                });
            }
        });
    }
};  
