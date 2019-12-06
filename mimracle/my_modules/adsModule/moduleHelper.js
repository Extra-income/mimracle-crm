module.exports = {
    getContent:function(conf,global){
        var content = "";
        //先判断是属于哪个模块的先
        if(!conf.module){
            //如果没有这个字段，那么证明这个是旧模块
            if(conf.row && conf.column){
                conf.module = "cube";
            }else{
                conf.module = "slider";
            }
        }
        var module = require("./"+conf.module+"Module");
        content = module && module.format(conf,global);
        return content;
    }
};