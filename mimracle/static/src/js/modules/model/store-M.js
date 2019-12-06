var ajax = require("U/ajax");
module.exports = {
    listRegion:function(param,success){
        param = param || {};
        param.parentRegionId = param.parentRegionId || 0;
        ajax.getAsync("/pc/sysRegionInfo/listRegion.do",param,function(result){
            if(result.success){
                //TODO 在这里做数据的预处理
                success && success(result.object);
            } else{
                //TODO 在这里做错误的提示
            }
        });
    },
    // listByProvice:function(param,success){
    //     param = param || {};
    //     param.pageNum = param.pageNum || 1;
    //     param.pageSize = param.pageSize || 56;
    //     param.province = param.province || {};
    //     ajax.getAsync("/pc/bookShop/listByProvice.do",param,function(result){
    //         if(result.success){
    //             //TODO 在这里做数据的预处理
    //             success && success(result.object);
    //         } else{
    //             //TODO 在这里做错误的提示
    //         }
    //     });
    // },
    bespokeList:function(param,success){

        param = param || {};
        ajax.getAsync("/pc/auth/bookShop/list.do",param,function(result){
            if(result.success){
                //TODO 在这里做数据的预处理
                success && success(result.object);
            } else{
                //TODO 在这里做错误的提示
            }
        });
    },
    bespokeWrite:function(param,success){
        
        param = param || {};
        param.id = param.id || global.getUrlParam('id');
        ajax.getAsync("/pc/auth/bookShop/get.do",param,function(result){
            if(result.success){
                //TODO 在这里做数据的预处理
                success && success(result.object);
            } else{
                //TODO 在这里做错误的提示
            }
        });
    },
    storeList:function(param,success){
        
        param = param || {};
        param.city_id = param.city_id || global.getUrlParam('cityId');
        ajax.getAsync("/pc/store/selectList.do",param,function(result){
            if(result.success){
                //TODO 在这里做数据的预处理
                success && success(result.object);
            } else{
                //TODO 在这里做错误的提示
            }
        });
    },
    storeMessage:function(param,success){
        param = param || {};
        // param.store_id = global.getUrlParam('store_id');
        // var city = global.getUrlParam2(req.path,"/");
        // param.store_code = location.hostname.match()
        var url = window.location.pathname;
        var urlParamStart = url.lastIndexOf("/");
        param.store_code = url.substring(urlParamStart+1, url.length);

        ajax.getAsync("/pc/store/getStoreAddr.do",param,function(result){
            if(result.success){    
                //TODO 在这里做数据的预处理
                success && success(result.object);
            } else{
                //TODO 在这里做错误的提示
            }
        });
    },
    storeMessageCart:function(param,success){
        
        param = param || {};
        param.store_id = param.id || global.getUrlParam('store_id');
        ajax.getAsync("/pc/store/listGoods.do",param,function(result){ 
            if(result.success){    
                //TODO 在这里做数据的预处理
                success && success(result.object);
            } else{
                //TODO 在这里做错误的提示
            }
        });
    },
    storeExperienceList:function(param,success){
        
        param = param || {};
        param.pageNum = param.page || "";
        param.pageSize = param.displayRecord || "";
        ajax.getAsync("/pc/store/selectList.do",param,function(result){ 
            if(result.success){   
                //TODO 在这里做数据的预处理
                result.object.count = result.object.count;
                success && success(result.object);
            } else{
                //TODO 在这里做错误的提示
            }
        });
    }

};