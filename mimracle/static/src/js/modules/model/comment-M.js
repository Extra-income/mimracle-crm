/**
 * Created by chanwefun on 2016/11/7.
 */
var ajax = require("U/ajax");
module.exports = {
    commentAdvice:function(param,success){
        param = param || {};
        param.orderNo = param.orderNo;
        ajax.getAsync("/pc/auth/cmt/getOrderItems.do",param,function(result){
            // console.log('我是返回来的数据');console.log(result);
            if(result.success){
                success && success(result.object);
            }else{
            }
        });
    },

    //获取商品评论
    getComment:function (param, success) {
        param = param || {};
        param.orderNo = param.orderNo;
        ajax.getAsync('/pc/auth/cmt/getCmtOrderItems.do', param , function (result) {
            // console.log(345);
            // console.log(result)
            if(result.success) {
                success && success(result.object);
            }
        });
    }
}