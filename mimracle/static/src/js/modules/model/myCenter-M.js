/**
 * Created by chanwefun on 2016/11/5.
 */
var ajax = require("U/ajax");
var cache = require("U/cache");
module.exports = {
    //首页
    personalInfo:function (param , success) {
        var key = "personalInfo_key";
        var data = cache.get(key);
        if(data){
            success && success(data);
        }
        param = param || {};

        ajax.getAsync('/pc/auth/userInfo/getIndex.do' , param , function (result) {
            if(result.success) {
                data = result.object;
                cache.set(key,data);
                success && success(data);
            } else {
            }
        })
    },
    //我的收藏 (已过时)
    //收藏文章列表
    // articleCollections: function articleCollections(param, success) {
    //     //参数默认值设置 (这个一般是接口来做的)
    //     param = param || {};
    //     param.page = param.page || 1;
    //     param.pageSize = param.displayRecord || 1;
    //     param.columnCode = param.columnCode || 1;
    //     /////////////////////////////////////////////////////////////////////
    //     ajax.getAsync("/pc/auth/cms/getCollectionArticleList.do", param, function (result) {
    //         if (result.success) {
    //             //TODO 在这里做数据的预处理
    //             if (result.object) {
    //                 result.object.count = result.object.pager.totalRows;
    //             }
    //             success && success(result.object);
    //         } else {
    //             //TODO 在这里做错误的提示
    //         }
    //     });
    // },

    // //文章评论列表 (已过时)
    // articleComments: function articleComments(param, success) {
    //     param = param || {};
    //     param.page = param.page || 1;
    //     param.pageSize = param.displayRecord || 4;
    //     param.columnCode = param.columnCode || 1; //1:专题，2：活动，3：装修日志，4：导购/居家指南
    //     ajax.getAsync("/pc/auth/cms/listUserCommentArticle.do", param, function (result) {
    //         // console.log(result);
    //         if (result.success) {
    //             result.object.count = result.object.pager.totalRows;
    //             success && success(result.object);
    //         } else {}
    //     });
    // },

    // // 文章收藏
    articleCollections: function (pageNum, success){
        ajax.getAsync('/pc/auth/cms/getArticleContent.do', {
            page: pageNum,
            pageSize: 10,
        }, function (res){
            success(res.object || {})
        }, function (){
            success({})
        })
    },
    // 文章评论
    articleComments: function (pageNum, success){
        ajax.getAsync('/pc/auth/cms/listMyCommentArticleList.do', {
            page: pageNum,
            pageSize: 10,
        }, function (res){
            success(res.object || {})
        }, function (){
            success({})
        })
    },

    //商品收藏列表
    goodCollections:function(param,success){
        param = param || {};
        param.pageNum = param.page;
        param.pageSize = param.displayRecord;
        ajax.getAsync("/pc/auth/goods/listFromFavorite.do",param,function(result){
            if(result.success){
                success && success(result.object);
            }else{

            }
        });
    },
    //图片收藏
    //获取收藏图片id
    getPictureId:function (param , success) {
        param = param || {};
        param.page = param.page;
        param.pageSize = param.displayRecord;
        ajax.getAsync('/pc/auth/cmt/listPicCollectionId.do', param , function (result) {
            if(result.success) {
                result.object.count = result.object.pager.totalRows;
                success && success(result.object);
            } else {

            };
        })
    },
   //图片列表
    pictureCollections:function (param , success){
        param = param || {};
        param.pageNum = param.page;
        param.pageSize = param.displayRecord;
        param.srcId = param.srcId;
        // console.log(123);console.log(param);
        ajax.getAsync('/pc/Special/queryCollectionSpecialList.do' , param , function (result) {
            // console.log(456);console.log(result);
            if(result.success) {
                success && success(result.object);
            }
        })

    },
    //获取图片点赞收藏数等
    getLikeCollect:function (param, success) {
        param = param || {};
        param.ids = param.ids;
        ajax.get('/pc/cmt/getPicStatInfo.do',param,function (result) {
            if(result.success) {
                success && success(result.object);
            } else {
            };
        })
    },
    //我的足迹
    commodityEdits:function (param , success) {
        param = param || {};
        param.limitStart = param.page;
        param.limitEnd = param.displayRecord;
        param.pageNum = param.page;
        param.pageSize = param.displayRecord;
        // console.log(121221121211111111111111111);console.log(param);
        ajax.getAsync("/pc/goods/listGoodsView.do",param,function(result){
            if(result.success) {
                success && success(result.object);
            }
        });
    },
    //获取签到记录
    getSignRecor:function (param, success) {
        param = param || {};
        param.startTime = param.startTime;
        param.endTime = param.endTime;
        param.rows = param.rows;
        ajax.getAsync('/pc/auth/sign/getList.do', param , function (result) {
            if(result.success) {
                success && success(result.object);
            } else {

            }
        })
    },

    //统计代金券优惠券等数量
    couponStatistic:function(param,success){
        ajax.getAsync("/pc/auth/user/statistic/get.do",param,function(result){
            if(result.success){
                success && success(result.object);
            } else{
            }
        });
    },

    couponList:function(param,success){
        param = param||{};
        param.page_no = param.page||1;
        param.page_size = param.displayRecord||10;
        param.status = param.status||"";
        ajax.getAsync("/pc/auth/coupon/listByMmh.do",param,function(result){
            if(result.success){

                success && success(result.object);
            }else{

            }
        });
    },
    //代金券
    cashCouponList:function(param,success){
        param= param||{};
        param.page_no = param.page||1;
        param.page_size = param.displayRecord||10;
        param.status = param.status||"";
        ajax.getAsync("/pc/auth/cashCoupon/listByMmh.do",param,function(result){
            if(result.success){
                success && success(result.object);
            }else{

            }
        });
    },
    //提货券
    goodsCouponList:function(param,success){
        param= param||{};
        param.page_no = param.page||1;
        param.page_size = param.displayRecord||10;
        param.status = param.status||"";
        ajax.getAsync("/pc/auth/goodsCoupon/listByMmh.do",param,function(result){
            if(result.success){
                success && success(result.object);
            }else{

            }
        });
    },
//我的积分
    //积分sum
    integralSum:function(param,success){
        param = {};
        param.page = 1;
        param.rows = 10;
        ajax.getAsync("/pc/auth/userScore/getScore.do",param,function(result){
            if(result.success){
                var data = {
                    account_amount:result.object.account_amount,   //用户累计积分
                    account_balance:result.object.account_balance  //用户可用积分
                }
                success && success(data);
            }else{

            }
        });
    },
    //积分列表
    integralList:function(param,success){
        param = param || {};
        param.page = param.page||1;
        param.rows = param.displayRecord||10;
        param.incomeOrConsume = param.incomeOrConsume||0; //0:全部，1：收入，2：消费
        ajax.getAsync("/pc/auth/userScore/list.do",param,function(result){
            var data = {};
            if(result.success&&result.object!=null){
                console.log("结果");
                console.log(result);
                data.count = result.object.count;
                data.lists = result.object.lists; 
            }else{
                data.count = 0;
                data.lists = [];
            }
            success && success(data);
        });
    },


//商品问答
    
    //积分夺宝认购单列表
    orderIntegral:function(param,success){
        param = param||{};
        param.pages = param.pages || 1;
        param.size = param.displayRecord || 5;
        param.sub_order_status = param.sub_order_status || "WAIT_LOTTO";
        console.log(param);
        ajax.getAsync("/pc/auth/subOrder/list.do",param,function(result){
            if(result.success){
                success && success(result.object);
            }else{

            }
        });
    },

    //积分夺宝状态统计
    subOrderStatistic:function(param,success){
        ajax.getAsync("/pc/auth/user/statistic/get.do",param,function(result){
            if(result.success){
                //TODO 在这里做数据的预处理
                result.object = result.object.subOrderStatistic;
                success && success(result.object);
            } else{
                //TODO 在这里做错误的提示
            }
        });
    },

    //积分夺宝认购单详情
    orderIntegralDetail: function(param, success) {
        param = param || {};
        param.sub_order_no = param.sub_order_no;

        ajax.getAsync("/pc/auth/subOrder/detail.do",param,function(result){
            if(result.success){
                success && success(result.object);
            }else{
                
            }
        })
    },
    
    //商品问答评论
    
    goodsQAList :function(param,callback){
    	param = param || {};
    	param.page = param.pages || 1;
    	param.pageSize = param.displayRecord || 10;
    	
    	ajax.getAsync("/pc/auth/cmt/listQuestionUserAsked.do",param,function(result){
    		if(result.success){
    			callback && callback({
    				type: result.code,
                    goodsQAList: result.object
    			})
    		}
    	})
    },
   
    getNewAnswerList : function(param,callback){
    	ajax.getAsync("/pc/cmt/listMoreCmtGoodsQuestionAnswer.do",param,function(result){
    		if(result.success){
    			callback && callback({
    				type:result.code,
    				getNewAnswerList: result.object
    			})
    		}
    	})
    },
    goodsAnswerList : function(param,callback){
    	param = param || {};
    	param.page = param.pages || 1;
    	param.pageSize = param.displayRecord || 10;
    	ajax.getAsync("/pc/auth/cmt/listQuestionUserAnswer.do",param,function(result){
    		if(result.success){
    			callback && callback({
    				type:result.code,
    				goodsAnswerList : result.object
    			})
    		}
    	})
    },
    goodsNoAnswerList : function(param,callback){
    	param = param || {};
    	param.page = param.pages || 1;
    	param.pageSize = param.displayRecord || 10;
    	ajax.getAsync("/pc/auth/cmt/listQuestionUserUnAnswer.do",param,function(result){
    		if(result.success){
    			callback && callback({
    				type:result.code,
    				goodsNoAnswerList:result.object
    			})
    		}
    	})
    },
//我的礼包
    getMyBaglist : function(param,callback){
        param = param || {};
        ajax.getAsync("/pc/myBag/getMyBaglist.do",param,function(result){
            if(result.success){
                callback && callback({
                    getMyBaglist:result.object
                })
            }
        })
    },
    getMyBagGroupDetail : function(param,callback){
        param = param || {};
        ajax.getAsync("/pc/myBag/getMyBagGroupDetail.do",param,function(result){
            if(result.success){
                callback && callback({
                    getMyBagGroupDetail:result.object
                })
            }
        })
    },
    getMyGiftBagDetail : function(param,callback){
        param = param || {};
        ajax.getAsync("/pc/myBag/getMyGiftBagDetail.do",param,function(result){
            if(result.success){
                callback && callback({
                    getMyGiftBagDetail:result.object
                })
            }
        })
    },

    // 收货地址列表
    addressList:function(param,callback){
        ajax.getAsync("/pc/auth/userAddr/list.do",{},function(result){
            if (result.success) {
                callback && callback({
                    type: result.code,
                    addressList: result.object
                });
            }
        })
    },

    // 修改收货地址
    getMemberAddress:function (addrId , success) {
        ajax.getAsync('/pc/auth/userAddr/get.do',{addrId:addrId},function (result) {
            if(result.success) {
                success && success(result.object);
            }
        })
    }
};