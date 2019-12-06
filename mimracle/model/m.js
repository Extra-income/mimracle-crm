module.exports = {
    _data:{},
    Mock:require("mockjs"),
    set:function(key,data){
        this._data[key] = data;
    },
    url:function(key){
        var data = this._data[key];
        if(data && data.url){
            return data.url;
        }
        return key;
    },
    mock:function(key){
        var data = this._data[key];
        if(!data || !data.mock){
            return;
        }
        return data.mock();
    },
    translate:function(key,object){
        var data = this._data[key];
        if(!data || !data.translate){
            return;
        }
        return data.translate(object);
    }
};