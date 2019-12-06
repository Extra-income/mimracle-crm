require("viewModel/base/baseHeaderTop.js");
require("viewModel/base/basePCenterTop.js");
require("VM/base/baseFooter.js");


var four = {    
    //绑定事件
    _bindEvent:function(){
        var self = this;
       
     }, 
    //初始化
    _init:function(){
        var self = this;
        self._bindEvent();
        
        $(function(){
            self._ready();
        });
    },

    //document ready
    _ready:function(){
        var self = this;
       
    }
};  
four._init();