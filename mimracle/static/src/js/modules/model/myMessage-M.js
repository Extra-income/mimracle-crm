var ajax = require("U/ajax");
module.exports = {
	//拿除了客服消息之外的其他消息
	activeMessage : function(param,callback){
		ajax.postStream("/pc/auth/message/getMessage.do",param,function(result){
			if(result.success){
				callback && callback({
					type:result.code,
					activeMessage:result.object
				})
			}
		})
	},
	//拿客服消息
	serviceMessage : function(param,callback){
		ajax.postStream("/pc/auth/message/getCstMessageList.do",param,function(result){
			if(result.success){
				callback && callback({
					type:result.code,
					serviceMessage:result.object
				})
			}
		})
	}
};