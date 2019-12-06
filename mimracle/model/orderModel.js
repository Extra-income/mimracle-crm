module.exports = function(model){
	model.set("orderList",{
		url:"/pc/auth/order/list.do",
		mock:function(){
			return null;
		}
	});
};