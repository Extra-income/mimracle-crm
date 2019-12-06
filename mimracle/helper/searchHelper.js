module.exports = {
	translSearchHistory: function(data){
		var temp = [];
		var array = [];
		temp = data.split(',').reverse();
		for(var i=0; i<10; i++){
			array.push(temp[i]);
		}
		return array;
	}
}