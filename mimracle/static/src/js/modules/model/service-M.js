/**
 * Created by ymm on 2016/11/10.
 */
var ajax = require("U/ajax");

module.exports = {
    //售后单
    afterSalesList:function(param,success){
        //参数默认值设置 (这个一般是接口来做的)
        var args = {};
        args.pages = param.page||1; //页码
        args.size = param.displayRecord||10;  //页数
        ajax.getAsync("/pc/auth/orderReturn/listRefundOrders.do",args,function(result){
            if(result.success){
                result.count = result.object.total;
                success && success(result);
            }else{

            }
        });
    },
    //保修单
    guaranteeList:function(param,success){
        var args = {};
        args.pages = param.page||1; //页码
        args.size = param.displayRecord||10;  //页数
        ajax.getAsync("/pc/auth/orderReturn/listWarrantyOrders.do",args,function(result){
            if(result.success){
                result.count = result.object.total;
                success && success(result);
            }else{

            }
        });
    },
    //售后单详情信息
    afterSalesDetail:function(param,success){
        var args = {};
        args.orderRefundNo = param.orderRefundNo;
        args.page_type = "PC_AFTER_DETAIL";
        ajax.getAsync("/pc/auth/orderReturn/getInfo.do",args,function(result){
            if(result.success){
                success && success(result);
            }else{

            }
        });
    },
    //保修单详情信息
    guaranteeDetail:function(param,success){
        var args = {};
        args.orderRefundNo = param.orderRefundNo;
        args.page_type = "PC_AFTER_DETAIL";
        ajax.getAsync("/pc/auth/orderReturn/getWarranty.do",args,function(result){
            if(result.success){
                success && success(result.object);
            }else{

            }
        });
    },
    //商品信息
    serviceGoodsDetail:function(param,success){
        var args = {};
        args.itemId = param.itemId;
        args.orderNo = param.orderNo;
        ajax.getAsync("/pc/auth/orderReturn/getAfterSalesItemInfo.do",args,function(result){
            if(result.success){
                success && success(result.object);
            }else{

            }
        });
    },
    //协商记录
    serviceCommunication:function(param,success){
        var args = {};
        args.orderRefundNo = param.orderRefundNo;
        ajax.getAsync("/pc/auth/orderReturn/listRecord.do",args,function(result){
            if(result.success){
                success && success(result.object);
            }else{
                
            }
        });
    },
    //获取编辑信息
    getEditData:function(param,success){
        var args = {};
        args.order_item_id = param.itemId;
        ajax.getAsync("/pc/auth/orderReturn/getReturnDetail.do",args,function(result){
            if(result.success){
                success && success(result.object);
            }
        });
    },
    //获取新增时信息
    newInfo:function(param,success){
        var args = {};
        args.order_item_id=param.itemId,
        args.order_no = param.orderNo
        ajax.getAsync("/pc/auth/orderReturn/getMsg.do",args,function(result){
            if(result.success){
                success && success(result.object);
            }
        });
    },
    //退款、保修原因
    getReasons:function(param,success){
        var args = {};
        args.code = param.code;
        ajax.getAsync("/pc/dic/listDictAndDictContentByCode.do",args,function(result){
            if(result.success&&result.object!=null){
                success && success(result.object);
            }
        });
    }


    

};