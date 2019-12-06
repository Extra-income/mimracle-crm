var ajax = require("U/ajax");

module.exports = {
	//专题文章列表
	homeProjectListZT:function(param,callback){
		param = param || {};
    	param.page = param.page || 1;
    	param.pageSize = param.displayRecord || 5;
    	param.columnCode = 1;
//  	console.log(param)
		ajax.getAsync("/pc/cms/listArticle.do",param,function(result){
			 if (result.success) {
                callback && callback({
                    type: result.code,
                    homeProjectListZT: result.object,
                });
            }
		})
		
	},
	//居家指南列表
	homeProjectListJJ:function(param,callback){
		param = param || {};
    	param.page = param.page || 1;
    	param.pageSize = param.displayRecord || 5;
    	param.columnCode = 4;
//  	console.log(param)
		ajax.getAsync("/pc/cms/listArticle.do",param,function(result){
			 if (result.success) {
                callback && callback({
                    type: result.code,
                    homeProjectListJJ: result.object
                });
            }
		})
		
	},
	//装修指南列表（暂时屏蔽）
	homeProjectListZX:function(param,callback){
		ajax.getAsync("/pc/cms/listArticle.do",{columnCode:3,page:1,pageSize:10},function(result){
			 if (result.success) {
                callback && callback({
                    type: result.code,
                    homeProjectListZX: result.object
                });
            }
		})
		
	},
	//生活家列表
	homeProjectListSHJ:function(param,callback){
		param = param || {};
    	param.page = param.page || 1;
    	param.pageSize = param.displayRecord || 5;
    	param.columnCode = 2;
//  	console.log(param)
		ajax.getAsync("/pc/cms/listArticle.do",param,function(result){
			 if (result.success) {
                callback && callback({
                    type: result.code,
                    homeProjectListSHJ: result.object
                });
            }
		})
		
	},
	//专题文章内容
	homeFeatureArticle:function(param,callback){
//		console.log(param);
		ajax.getAsync("/pc/cms/getArticle.do",param,function(result){
			 if (result.success) {
                callback && callback({
                    type: result.code,
                    homeFeatureArticle: result.object
                });
            }
		})
		
	},
	//装修指南文章内容（屏蔽）
	homeDecorateArticle:function(param,callback){
//		console.log(param);
		ajax.getAsync("/pc/cms/getArticle.do",param,function(result){
			 if (result.success) {
                callback && callback({
                    type: result.code,
                    homeDecorateArticle: result.object
                });
            }
		})
		
	},
	//居家指南文章内容
	homeGuideArticle:function(param,callback){
//		console.log(param);
		ajax.getAsync("/pc/cms/getArticle.do",param,function(result){
			 if (result.success) {
                callback && callback({
                    type: result.code,
                    homeGuideArticle: result.object
                });
            }
		})
		
	},
	//生活家文章内容
	homeActivityArticle:function(param,callback){
//		console.log(param);
		ajax.getAsync("/pc/cms/getArticle.do",param,function(result){
			 if (result.success) {
                callback && callback({
                    type: result.code,
                    homeActivityArticle: result.object
                });
            }
		})
		
	},
	//文章评论
	homeDecorateComments:function(param,callback){
		param = param || {};
    	param.page = param.page || 1;
    	param.pageSize = param.displayRecord || 10;
    	param.busId = param.busId;
		ajax.getAsync("/pc/cms/listArticleComment.do",param,function(result){
			 if (result.success) {
                callback && callback({
                    type: result.code,
                    homeDecorateComments: result.object
                });
            }
		})
		
	},
	//个人信息
	homeDecorateMysel:function(param,callback){
		ajax.getAsync("/pc/auth/userInfo/getInfo.do",{},function(result){
			if(result.success){
				callback && callback({
                    type: result.code,
                    homeDecorateMysel: result.object
                });	
			}else{
				callback && callback({
                    type: result.code,
                    homeDecorateMysel: "111"
                });
			}
		})
	},
	
};