/**
 * Created by chanwefun on 2016/11/5.
 */

var ajax = require("U/ajax");
module.exports = {
    //我的礼品
    myGiftLists:function(param,success){
        param = param || {};
        param.page = param.page || 1;
        param.rows = param.rows || 88;
        ajax.getAsync("/pc/auth/giftShop/listMyGift.do",param,function(result){
            if(result.success){
                console.log(result.object);
                success && success(result.object);
            } else{
            }
        });
    },
    //积分商品首页
    integralMallHome:function(param , success) {
        param = param || {};
        param.page = param.page;
        param.rows = param.displayRecord;
        ajax.getAsync('/pc/giftShop/index.do' , param , function (result) {
            // console.log(123);
            if(result.success) {
                result.object.lists = result.object.pagingInfo.lists;
                result.object.count = result.object.pagingInfo.count;
                // console.log(result)
                success &&　success(result.object);
            } else {

            }
        })
    },

    //个人信息
    integralMallPerson:function (param, success) {
        param = param || {};
        ajax.getAsync('/pc/auth/userInfo/getIndex.do', param , function (result) {
            if(result.success) {
                success && success(result.object);
            } else {
                success(result.object);
            }
        })
    },

    //首页的礼品分类
    integralMallCagtegory:function (param , success) {
        param = param || {};
        param.cagtegory = param.cagtegory;
        param.page = param.page;
        param.rows = param.displayRecord;
        ajax.getAsync('/pc/giftShop/listGiftByCagtegory.do' , param , function (result) {
            if(result.success) {
                result.object.cagtegory_list = '';
                success && success(result.object);
            } else {

            }
        })
    },

    //礼品兑换详情
    integralMallExchangeDetail:function (param , success) {
        param = param || {};
        param.gift_id = param.gift_id;
        ajax.getAsync('/pc/giftShop/getGiftInfo.do' , param , function (result) {
            if(result.success) {
                success && success(result.object);
            } else {

            }
        });
    },

    // 获取兑换中礼品信息
    exchangeGiftInfo:function(param,success){
        param = param || {};
        param.gift_id = param.gift_id;
        ajax.postAsync('/pc/auth/giftShop/getExchangeGift.do',param,function (result) {
            if(result.success) {
                success && success(result.object);
            } else {

            }
        });
    },
    // 收获地址列表
    addrInfo:function(param,success){
        param = param || {};
        ajax.getAsync('/pc/auth/userAddr/list.do',param,function (result) {
            if(result.success) {
                success && success(result.object);
            } else {

            }
        });
    },

    //我的礼品 积分兑换单详情页 或 中奖领取页礼品详情
    winningDetail:function(param,success){
        param = param || {};
        param.exchange_order_no = param.exchange_order_no;
        param.sourceType = param.sourceType;
        ajax.getAsync('/pc/auth/giftShop/getGiftOrder.do',param,function (result) {
            if(result.success) {
                success && success(result.object);
            } else {
                alert(result.message)
            }
        });
    },

    // 个人首页-今日必兑，积分商城-热门推荐
    recommendList:function(param,success){
        var args = {};
        args.request_size = param.request_size||2;//请求条数
        ajax.getAsync('/pc/giftShop/giftTwo.do',args,function (result) {
            if(result.success) {
                success && success(result.object.pagingInfo);
            } else {

            }
        });
    },

};