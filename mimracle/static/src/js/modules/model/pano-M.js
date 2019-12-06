/** Power By Soham 2016/11/5 16:39 **/

var ajax = require("U/ajax");
module.exports = {
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
    //3D套图列表
	panoList : function(param,callback){
		ajax.getAsync("/pc/pano/queryShowFittingList.do",param,function (result) {
            if (result.success) {

                callback && callback({
                    type: result.code,
                    panoList: result.object,
                    count:result.message
                });
            }
        });
	},
    //2D套图列表 --
    specialList : function(param,callback){
        ajax.getAsync("/pc/Special/querySpaceList.do",{},function (result) {
            if (result.success) {
                
                callback && callback({
                    type: result.code,
                    specialList: result.object
                });
            }
        });
    },
    //2D套图列表-按风格过滤 --
    specialListFilterByStyle : function(param,callback){
        ajax.getAsync("/pc/Special/queryStyleList.do",{},function (result) {
            if (result.success) {

                callback && callback({
                    type: result.code,
                    specialList: result.object
                });
            }
        });
    },
    //2d套图列表 & 按风格过滤列表 & 翻页列表
    specialListFilterByStyleMore : function(param,callback){
        ajax.getAsync("/pc/Special/querySpecialListShow.do",param,function (result) {
            if (result.success) {
                callback && callback({
                    type: result.code,
                    specialList: result.object,
                    count:result.message
                });
            }
        });
    },
    //2d套图按场景过滤列表 & 翻页列表
    specialListFilterBySpaceMore : function(param,callback){
        ajax.getAsync("/pc/Special/querySpecialMainImgList.do",param,function (result) {
            if (result.success) {
                // console.log("==888888888=====");
                console.log(result);
                callback && callback({
                    type: result.code,
                    specialList: result.object,
                    count:result.message
                });
            }
        });
    }
};