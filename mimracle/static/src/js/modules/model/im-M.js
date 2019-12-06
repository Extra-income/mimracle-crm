var ajax = require("U/ajax");
module.exports = {
	msgList:function(param,success){
		success && success([
			{
				b:Math.random() 
			},{
				b:2
			},{
				b:3
			},{
				b:4
			},{
				b:5
			}]);
		
	}
};