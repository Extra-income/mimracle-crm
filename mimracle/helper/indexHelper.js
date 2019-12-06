module.exports = {
    translGoodsInfo:function(data){

    	var goodsInfo = data.data.goodsInfo || [];
        data.data.goodsInfo = data.data.goodsInfo || [];
        for(var i=0; i<goodsInfo.length; i++){
            goodsInfo[i].id = goodsInfo[i].goods_id;
            goodsInfo[i].url = goodsInfo[i].goods_pic_url;
            goodsInfo[i].title = goodsInfo[i].goods_title;
            goodsInfo[i].sales = goodsInfo[i].sell_qty;
            goodsInfo[i].price = goodsInfo[i].sell_price;
        }
        data.data.goodsInfo.resultList = goodsInfo || [];
    }
};