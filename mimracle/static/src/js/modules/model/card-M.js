var ajax = require("U/ajax");
module.exports = {
	allCouponAndCashList:function(param,callback){
        //根据产品id或店铺所需的卡券
        param = param || {};
        ajax.getAsync("/pc/coupon/listCouponAndCash.do",param,function (result) {
            if (result.success) {
                callback && callback({
                    type : result.code,
                    allCouponAndCashList : result.object
                });
            }
        });
    },
    cashCouponList:function(param,callback){
        //结算的代金券
        param = param || {};
        ajax.getAsync("/pc/auth/cashCoupon/settle.do",param,function (result) {
            if (result.success) {
                callback && callback({
                    type : result.code,
                    cashCouponList : result.object
                });
            }
        });
    },
    couponCardListOfCalc:function(param,callback){
        //结算页面优惠券
        param = param || {};
        ajax.postStream("/pc/auth/coupon/settle.do",param,function (result) {
            //分可用与不可用
            if (result.success) {
                var canUse = [];
                var noUse = [];
                //result.object = (result.object || []);
                if(result.object && result.object.length > 0){
                    var length = result.object.length - 1;
                    for(length; length >= 0;length--){
                        var data = result.object[length];
                        if(0 == data.coupon_use || 1 == data.is_expire){
                            noUse.push(data);
                        }else{
                            canUse.push(data);
                        }
                    }
                }
                
                var resultObject = {
                    noUse : noUse,
                    canUse : canUse,
                    allCardList : result.object || []
                }
                callback && callback({
                    type : result.type,

                    couponCardList : resultObject
                });
            }
        });
    }
};