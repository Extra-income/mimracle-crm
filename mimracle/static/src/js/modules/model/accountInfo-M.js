var ajax = require("U/ajax");

module.exports = {
	//个人基本资料
	accountInfo:function(param,callback){
		ajax.getAsync("/pc/auth/userInfo/getInfo.do",{},function(result){
			 if (result.success) {
			 	//组装生日信息
			 	if(result.object.birthday){
			 		var birthday = result.object.birthday;
//			 		console.log(birthday)
				 	var birthdayList = birthday.split("-");
				 	
				 	var year = birthdayList[0];
				 	var month1 = birthdayList[1];
				 	var day1 = birthdayList[2]
				 	
				 	var month = month1.replace(/\b(0+)/gi,"")
					var day = day1.replace(/\b(0+)/gi,"")
//					console.log(month,day)
			 	}
			 	//切分个人标签
			 	var tagList = result.object.tag;
			 	var tag = tagList.split(",");
//			 	console.log(tagList);
                callback && callback({
                    type: result.code,
                    accountInfo: result.object,
                    year : year,
                    month : month,
                    day : day,
                    tag:tag
                });
            }
		})
		
	},
	//推荐标签
	recommendTag : function(param,callback){
		ajax.postAsync("/app/userInfo/listPersentUserTags.do",{},function(result){
			if(result.success){
//				console.log(result);
				callback && callback({
                    type: result.code,
                    recommendTag: result.object
                });
			}
		})
	},
	//头像信息
	portraitList : function(param,callback){
		ajax.getAsync("/pc/auth/userInfo/getIndex.do",{},function(result){
			if(result.success){
				// console.log(result);
				callback && callback({
                    type: result.code,
                    portraitList: result.object
                });
			}
		})
	},
	//获取数字字典信息
	MoreInfoList : function(param,callback){
		var dicCode = ["HYHY","ZY","NXFW","AHXX","HYZK","JTCXFS","HYHX","ZXFW","ZXJD","JJXQFG","ZXKJ"];
		
		var dicCodeList = {};
		dicCodeList.dicCodeList = dicCode;
		
		ajax.postStream("/pc/auth/userInfo/getDicCodeBatch.do",dicCodeList,function(result){
			if(result.success){
				callback && callback({
                    type: result.code,
                    MoreInfoList: result.object
                });
			}
		});
	},
	// 收货地址列表
	addressList:function(param,callback){
		ajax.getAsync("/pc/auth/userAddr/list.do",{},function(result){
			 if (result.success) {
                callback && callback({
                    type: result.code,
                    addressList: result.object,
                });
            }
		})
	},
	
	// 修改收货地址
    getMemberAddress:function (addrId , success) {
        ajax.getAsync('/pc/auth/userAddr/get.do',{addrId:addrId},function (result) {
            if(result.success) {
                success && success(result.object);
            }
        })
    }

};