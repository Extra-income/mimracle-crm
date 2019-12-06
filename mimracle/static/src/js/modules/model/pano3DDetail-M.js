/** Power By Soham 2016/11/5 16:39 **/

var ajax = require("U/ajax");
module.exports = {
    //3D套图详情
   
    //2D套图-用户套图的点赞&收藏&分享数据///pc/auth/cmt/getViewLikesList.do
   /* specialDataStatus : function(param,callback){
        ajax.getAsync("/pc/cmt/getPicStatInfo.do",param,function (result) {
            if (result.success) {
                callback && callback({
                    type: result.code,
                    specialDataStatus: result.object
                });
            }
        });
    },
    likesPic:function(data,success,err){//点赞登记
        ajax.postAsync('/pc/auth/cmt/likesPic.do',data,success,err);
    }
*/
    picCollection: function picCollection(data, success, err) {
        //套图收藏/pc/auth/cmt/picCollectionExt.do?id=230&type=2D
        ajax.postAsync('/pc/auth/cmt/picCollectionExt.do', data, success, err);
    },
    delPicCollection: function delPicCollection(data, success, err) {
        //取消套图收藏 /pc/auth/cmt/delPicCollectionExt.do?id=230&type=2D
        ajax.postAsync('/pc/auth/cmt/delPicCollectionExt.do', data, success, err);
    },
    viewPic: function viewPic(data, success, err) {
        //阅览登记 /pc/auth/cmt/viewPicRecord.do?id=230&type=3D
        ajax.postAsync('/pc/auth/cmt/viewPicRecord.do', data, success, err);
    },
    sharePic: function(data, success, err) { //分享登记
        ajax.postAsync('/pc/share/shareFinish.do', data, success, err);
    },
    specialDataStatus: function(param, callback) {
        // /pc/cmt/getPicStatInfoExt.do?ids=230&type=3D
        ajax.getAsync("/pc/cmt/getPicStatInfoExt.do", param, function(result) {
            if (result.success) {
                callback && callback({
                    type: result.code,
                    specialDataStatus: result.object
                });
            }
        });
    }

};