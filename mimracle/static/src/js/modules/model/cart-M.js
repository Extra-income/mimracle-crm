var ajax = require("U/ajax");
module.exports = {
	skuInfo:function(param,callback){
		//获取sku信息
		ajax.getAsync("/pc/auth/tcShoppingCart/getGoodsSku.do",param,function (result) {
            if (result.success) {
            	//sku组合信息处理
            	var skuPrices = result.object.goods_sku_prices || [];
            	var goods_sku_prices_map = {};
            	var i = skuPrices.length - 1;
            	for(;i >= 0;i--){
            		var currentSku = skuPrices[i]
            		goods_sku_prices_map[currentSku.goodsAttrValueIds] = currentSku;
            	}

            	result.object.goods_sku_prices_map = JSON.stringify(goods_sku_prices_map);
                //处理默认sku
                var hasDefaultSkuUrl = !(!result.object.goods_default_sku_price || result.object.goods_default_sku_price.goods_pic_url)
                result.object.hasDefaultSkuUrl = hasDefaultSkuUrl;
                callback && callback({
                	type : result.code,
                	skuInfo : result.object
                });
            }
        });
	},
    cartList : function(param,callback,errorCallback){
        //获取购物车列表
        ajax.getAsync("/pc/auth/tcShoppingCart/list.do",{},function (result) {
            
            if (result.success) {
                callback && callback({
                    type: result.code,
                    cartList: result.object
                });
            }else{
                 errorCallback && errorCallback({
                    type: result.code,
                    cartList: result.object
                 });
            }
        },function(req,state,errorThrown){
            console.log(state);
        });
    }/*,
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
                    var length = result.object;
                    for(length; length >= 0;length--){
                        var data = result.object[length];
                        if(0 == data.coupon_use){
                            noUse.push(data);
                        }else if(1 == data.coupon_use){
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
    }*/
};