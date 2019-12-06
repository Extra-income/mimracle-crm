var ajax = require("U/ajax");
module.exports = {
    orderList:function(param,success){
        //参数默认值设置 (这个一般是接口来做的)
        param = param || {};
        param.pages = param.pages || 1;
        param.size = param.displayRecord || 5;
        param.order_page_type = param.order_page_type || "PC";
        param.page_type = param.page_type || "PC_DETAIL";
        param.orderStatus = param.orderStatus || "ALL";
        /////////////////////////////////////////////////////////////////////
        ajax.getAsync("/pc/auth/order/list.do",param,function(result){
            if(result.success){
                //TODO 在这里做数据的预处理
                success && success(result.object);
            } else{
                //TODO 在这里做错误的提示
            }
        });
    },
    //订单列表各状态订单总数
    orderStatistic:function(param,success){
        ajax.getAsync("/pc/auth/user/statistic/get.do",param,function(result){
            if(result.success){
                result.object = result.object.orderStatistic;
                success && success(result.object);
            } else{
            }
        });
    },
    // 物流详情
    orderLogistics:function(param,success){
        ajax.get("/pc/auth/order/getOrderLogistics.do",param,function(result){
            if(result.success){
                success && success(result.object);
            } else{
            }
        });
    },
    // 订单详情
    orderDetail:function(param,success){
        param = param || {};
        param.order_no = param.order_no;
        param.page_type = param.page_type || "PC_DETAIL";
        param.order_page_type = param.order_page_type || "PC";

        ajax.getAsync("/pc/auth/order/getDetail.do",param,function(result){
            if(result.success){
                success && success(result.object);
            }else{
                
            }
        });
    },
    
};