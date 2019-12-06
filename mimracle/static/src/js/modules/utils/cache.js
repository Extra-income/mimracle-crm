function Cache(){
    this.cache = window.localStorage;
}

Cache.prototype = {

    constructor:Cache,

    get:function(key,def){
        var value = this.cache.getItem(key);
        if(!value) return def;
        try{
            value = JSON.parse(value);
        }catch(e){}
        return value;
    },

    set:function(key,value){
        if(typeof value == "string"){
            return this.cache.setItem(key,value);
        }
        this.cache.setItem(key,JSON.stringify(value));

    },

    remove:function(key){
        this.cache.removeItem(key);
    }
};

module.exports = new Cache();