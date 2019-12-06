/** Power By Soham 2016/11/5 16:39 **/

var ajax = require("U/ajax");
module.exports = {
    //2D套图详情
    specialDetail : function(param,callback){
        ajax.getAsync("/pc/Special/querySpecialSrcInfo.do",param,function (result) {
            if (result.success) {
                callback && callback({
                    type: result.code,
                    specialDetail: result.object
                });
            }
        });
    },
    //2D套图-用户套图的点赞&收藏&分享数据///pc/auth/cmt/getViewLikesList.do
    specialDataStatus : function(param,callback){
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
    },
    disLikesPic:function(data,success,err){//取消点赞登记
        ajax.postAsync('/pc/auth/cmt/disLikesPic.do',data,success,err);
    },
    picCollection:function(data,success,err){//套图收藏
        ajax.postAsync('/pc/auth/cmt/picCollection.do',data,success,err);
    },
    delPicCollection:function(data,success,err){//取消套图收藏
        ajax.postAsync('/pc/auth/cmt/delPicCollection.do',data,success,err);
    },
    //initViewLikesData:function(data,success,err){//阅览&点赞历史数据查询
    //    ajax.postAsync('/app/auth/cmt/getViewLikesList.do',data,success,err);
    //},
    //initPicCollectionData:function(data,success,err){//套图收藏历史数据查询
    //    ajax.postAsync('/app/auth/cmt/isPicCollection.do',data,success,err);
    //},
    viewPic:function(data,success,err){//阅览登记
        ajax.postAsync('/pc/auth/cmt/viewPic.do',data,success,err);
    },
    sharePic:function(data,success,err){//分享登记
        ajax.postAsync('/pc/share/shareFinish.do',data,success,err);
    }



};