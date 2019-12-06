var ajax = require("U/ajax");
var classData = "";//存储商品分类信息
var firstG = {
    "-1":{
        gd_classify_id:-1,
        gd_classify_name:"所有分类",
        ifChild:0,
        children:[]
    }
};
var secondG = {};
var thirdG = {};
module.exports = {
    //中奖揭晓
    winnerInfo:function (param, success) {
        ajax.getAsync('/pc/subOrder/getLottoRes.do',param , function (result) {
            if(result.success) {
                //商城木木君中奖

                success && success(result.object);
            }
        })
    },

    //认购记录
    userSubscriptionList:function (param,success) {
        ajax.getAsync('/pc/subOrder/listCode.do',param, function (result) {
            if(result.success) {
                if(result.object.pagerResult.totalRows) {
                    result.object.count = result.object.pagerResult.totalRows;
                }
                success &&　success(result.object);
            } else {}
        })
    },

    //累计评论
	commentList:function(param,callback){
		//评论
		param = param || {};
        param.goodsId = param.goodsId;
        param.page = param.page;
        param.pageSize = param.displayRecord;
        param.queryType = param.queryType;
		ajax.getAsync("/pc/cmt/listGoodsComments.do",param,function (result) {
            // console.log('ansdfgnadofing');console.log(result);
            if (result.success) {
            	callback && callback({
                    type : result.code,
                    commentList : result.object,
                    conmmentType : param.queryType,
                    // count:result.count;//需要
                });
            }
        });
	},

    //得到收藏数
    getCollectionsCount:function (param , success) {
        var param = param || {};
        param.goodsId = param.goodsId;
        ajax.getAsync('/pc/goods/getCollectionInfo.do' , param , function (result) {
            // console.log('我是为了得到收藏数的情况');console.log(result);
            if(result.success) {
                success && success(result.object);
            }
        });
    },

    //删除自己的评论
    delMyselfComment:function (param , success) {
        param = param || {};
        param.ticketId = param.ticketId;
        ajax.getAsync('/pc/auth/cmt/delGoodsComment.do' , param , function (result) {
            // console.log('result=:');console.log(result);
            if(result.success) {
                success && success(result);
            }
        })
    },

    //删除自己的追评
    delMyselfAdditionalComment:function (param , success) {
        param = param || {};
        param.ticketId = param.ticketId;
        ajax.getAsync('/pc/cmt/delAdditionalCmt.do' , param , function (result) {
            // console.log('我是删除自己追评返回来的结果：');console.log(result);
            if(result.success) {
                success && success(result);
            }
        })
    },

    //点赞
    clickLike:function (param , success) {
        param = param || {};
        ajax.getAsync('/pc/auth/cmt/likes.do' ,  param , function (result) {
            // console.log('result');console.log(result);
            if(result.success) {
                success && success(result.object);
            }
        })
    },

    //取消点赞
    cancelLike:function (param, success){
        param = param || {};
        ajax.getAsync('/pc/auth/cmt/disLikes.do' , param , function (result) {
            if(result.success){
                success && success(result);
            }
        })
    },

    //问题分页列表接口
	questionList:function(param,success){
		//问答
        param = param || {};
        param.goodsId = param.goodsId;
        param.page = param.page || 1;
        param.pageSize = param.displayRecord || 5;
        ajax.getAsync('/pc/cmt/listQuestion.do' , param , function (result) {
            if(result.success) {
                //问题的总数
                result.object.count = result.object.questionCount;
                success && success(result.object);
            } else {

            }
        });
		// success && success({
		// 	questionList:[{}]
		// });
	},

    //答案分类页
    answerList:function (param , success) {
        param = param || {};
        param.answerTicketId = param.answerTicketId;
        param.goodsId = param.goodsId;
        param.page = param.page || 1;
        param.pageSize = param.pageSize || 10;
        param.questionTicketId = param.questionTicketId;
        ajax.getAsync('/pc/cmt/getAnswer.do',param,function (result) {
            if(result.success) {
                success && success(result.object)
            } else {

            }
        })
    },

	cardList:function(param,callback){
		//获取卡券列表,产品详情页面
        param = param || {};
		ajax.getAsync("/pc/coupon/listCouponAndCash.do",param,function (result) {
            if (result.success) {
            	callback && callback({
                    type : result.code,
                    listCouponAndCash : result.object
                });
            }
        });
	},
	addressList : function(param,callback){
		 param = param || {};
		ajax.getAsync("/pc/sysRegionInfo/listAllRegion.do",param,function (result) {
            if (result.success) {
            	callback && callback({
                    type : result.code,
                    addressList : result.object
                });
            }
        });
	},
	subAddressList : function(param,callback){
		ajax.getAsync("/pc/sysRegionInfo/listRegion.do",param,function (result) {
            if (result.success) {
            	callback && callback({
                    type : result.code,
                    subAddressList : result.object
                });
            }
        });
	},




    //商品列表-商品
    goodsLists:function(param,success){
        var args = param || {};
        args.channel = "PC";
        args.filter = param.filter || "";
        args.sort = param.sort || "";
        args.word = param.word || "";
        args.page = param.page || 1;
        args.size = param.size || 88;
        ajax.getAsync("/search/goods/query_nr.do", args, function (result) {
            if (result.success && result.object.resultList.length > 0) {
                result.object.resultList[0].if_recommend == "YES" ? result.if_recommend = 0 : result.if_recommend = 1;
                result.count = result.object.totalSize;
                success && success(result);
            } else if (result.success && result.object.resultList.length == 0) {
                result.noResult = 0; //正常搜索结果没有，返回推荐结果也没有。
                success && success(result);
            }
        });
    },
    /*goodsListsOfAdjust:function(param,success){
        var args = param || {};
        args.channel = "PC";
        //args.filter = param.filter || "";
         args.sort = param.sort || "";
         args.word = param.word || "";
         args.page = param.page || 1;
         args.size = param.size || 88;
         ajax.getAsync("/search/goods/queryClassify.do",args,function(result){
            if(result.success){
                success && success(result.object || {});
            }

        });
    },*/


    //专项活动列表
    specialList:function(param,success){
        var args = {};
        args.act_type = param.act_type;
        args.size = param.size || 2;
        args.page = param.page || 1;
        //console.log("提交的参数");
        //console.log(args);
        ajax.getAsync("/pc/pms/act/special/list/goods.do",args,function(result){
            if(result.success){
                success && success(result.object);
            }
        });
    },

    receiveCartList:function(param,success){
        ajax.getAsync("/pc/coupon/listCouponAndCash.do",{},function(result){
            if(result.success){
                success && success(result.object);
            }
        });
    }
    
};