/**
 * Created by ymm on 2016/11/8.
 */
var ajax = require("U/ajax"),
    cache = require("U/cache");
module.exports = {
    WORDS_CACHE_KEY:"WORDS_CACHE_KEY",
    //搜索栏默认词
    words:function(param,success){

        var self = this;
        param = {};
        param.channel = "PC";

        var cache_data = cache.get(self.WORDS_CACHE_KEY);
        if(cache_data){
            success && success(cache_data);
        }


        var data = {};
        // 默认词
        ajax.getAsync("/search/goods/defaultword.do",param,function(result){
            if(result.success&&result.object!=null&&result.object.length>0){
                data.defaultWord = result.object && result.object[0];
            }else{
                data = {
                    defaultword:{
                        word:""
                    }
                }
            }
            // 热门词
            ajax.getAsync("/search/goods/hotword.do?size=10",param,function(result){
                result.object = result.object || [];
                if(result.success){
                    data.hotWords = result.object;
                    cache.set(self.WORDS_CACHE_KEY,data);
                    if(!cache_data){
                        success && success(data);
                    }
                }

            });
        });

    },
    //获取联想词
    tipWord:function(param,success){
        param = param||{};
        param.word = param.word || "";
        param.size = 10;
        ajax.getAsync("/search/goods/tip_preview.do",param,function(result){
            if(result.success&&result.object!=null){
                var data =[];
                for(var i =0;i<result.object.length;i++){
                    var obj ={
                        word : result.object[i].tip,
                        num : result.object[i].preview
                    }
                    data.push(obj);
                }
                success && success(data);
            }
        });
    },
    //菜单
    baseHeaderMenu: function baseHeaderMenu(param, success) {
        ajax.getAsync("/pc/ads/getPageInfo.do", param, function (result) {
            if (result.success && result.object != null) {
                success && success(result.object);
            }
        });
    },
    baseHeaderRightCard:function(param,success){
        
        param = param || {};
        ajax.getAsync("/pc/coupon/listMyCardCoupon.do",param,function(result){
            if(result.success){
                //TODO 在这里做数据的预处理
                success && success(result.object);
            } else{
                //TODO 在这里做错误的提示
            }
        });
    },
     baseHeaderRightTakeCard:function(param,success){
        
        param = param || {};
        ajax.getAsync("/pc/coupon/listCouponAndCash.do",param,function(result){
            if(result.success){
                //TODO 在这里做数据的预处理
                success && success(result.object);
            } else{
                //TODO 在这里做错误的提示
            }
        });
    },
    baseHeaderRightTop:function(param,success){
        
        param = param || {};
        ajax.getAsync("/pc/sysRegionInfo/listAllCity.do",param,function(result){
            if(result.success){
                //TODO 在这里做数据的预处理
                success && success(result.object);
            } else{
                //TODO 在这里做错误的提示
            }
        });
    }
};