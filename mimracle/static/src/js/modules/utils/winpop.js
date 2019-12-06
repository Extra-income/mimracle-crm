/**
*重置window的alert和confirm方法
**/
(function(window, jQuery, undefined) {
    
    var HTMLS = {
        ovl: '<div class="J_WinpopMask winpop-mask dn" id="J_WinpopMask"></div>'
        +'<div class="dh-pop-vhc dn" id="J_WinpopBox">'
        +'<div class="dh-pop-vhc-container">'
        +'<div class="J_WinpopBox dh-pop-container" >'
        +'<div class="dh-pop-content">' 
        +'<div class="dh-pop-title" id="J_title-container"><span class="fr dh-pop-close" id="J-close"></span><span id="J_title">提示</span></div>'
        + '<div class="J_WinpopMain dh-pop-details"></div>' 
        + '<div class="J_WinpopBtns  txtCenter"></div>' 
        + '</div></div></div></div>',
        alert: '<input type="button" class="J_AltBtn altBtn" value="确定">',
        confirm: '<input type="button" class="J_CfmFalse confirmBtn" value="取消">' + '<input type="button" class="J_CfmTrue altBtn" value="确定">'
    };

    function Winpop() {
        var config = {};
        this.get = function(n) {
            return config[n];
        };

        this.set = function(n, v) {
            config[n] = v;
        };

        this.init();
    }

    Winpop.prototype = {
        init: function() {
            this.createDom();
            this.bindEvent();
        },
        createDom: function() {
            var body = jQuery("body"),
                ovl = jQuery("#J_WinpopBox");

            if (ovl.length === 0) {
                body.append(HTMLS.ovl);
            }

            this.set("ovl", jQuery("#J_WinpopBox"));
            this.set("mask", jQuery("#J_WinpopMask"));
        },
        bindEvent: function() {
            var _this = this,
                ovl = _this.get("ovl"),
                mask = _this.get("mask");
            ovl.on("click", ".J_AltBtn", function(e) {
                _this.hide();
                var cb = _this.get("alertCallback");
                cb && cb();

            });
            ovl.on("click", "#J-close", function(e) {
                _this.hide();

            });
            ovl.on("click", ".J_CfmTrue", function(e) {
                var cb = _this.get("confirmBack");
                _this.hide();
                cb && cb(true);
            });
            ovl.on("click", ".J_CfmFalse", function(e) {
                var cb = _this.get("confirmFailed");
                _this.hide();
                cb && cb(false);
            });
            mask.on("click", function(e) {
                _this.hide();
            });
            jQuery(document).on("keyup", function(e) {
                var kc = e.keyCode,
                    cb = _this.get("confirmBack");
                if (kc === 27) {
                    _this.hide();
                } else if (kc === 13) {
                    _this.hide();
                    if (_this.get("type") === "confirm") {
                        cb && cb(true);
                    }else{
                        var cb = _this.get("alertCallback");
                        cb && cb();
                    }
                }
            });
        },
        
        alert: function(str,obj,cb) {
            var str = (typeof str === 'string') ? str : str?str.toString():"",
                ovl = this.get("ovl");
            this.set("type", "alert");
            ovl.find(".J_WinpopMain").html(str);

            if(typeof obj == "function"){
                cb = obj;
                obj = null;
            }
            obj = obj || {};
            this.set("alertCallback",cb || function(){});

            if(typeof obj == "object" && obj.titleText){
                ovl.find("#J_title").html(obj.titleText);
            }
            if (typeof obj == "undefined" || obj.btnstr !== '') {
                ovl.find(".J_WinpopBtns").html(HTMLS.alert);
            } else {
                ovl.find(".J_WinpopBtns").html(obj.btnstr);
            }
            //this.setContainerContent(obj || '');
            this.show();
        },
        confirm: function(str, obj) {
            var str = typeof str === 'string' ? str : str.toString(),
                ovl = this.get("ovl");
            this.set("type", "confirm");
            ovl.find(".J_WinpopMain").html(str);
            ovl.find(".J_WinpopBtns").html(HTMLS.confirm);
            if(typeof obj == "object" && obj.titleText){
                ovl.find("#J_title").html(obj.titleText);
            }
            var callback = obj.callback;
            this.set("confirmBack", (callback || function() {}));
            this.set("confirmFailed",obj.cancel || function(){});
            this.show();
        },
        show: function() {
            this.get("ovl").show();
            this.get("mask").show();
        },
        hide: function() {
            var ovl = this.get("ovl");
            ovl.find(".J_WinpopMain").html("");
            ovl.find(".J_WinpopBtns").html("");
            ovl.hide();
            this.get("mask").hide();
        },
        destory: function() {
            this.get("ovl").remove();
            this.get("mask").remove();
            delete window.alert;
            delete window.confirm;
        }
    };

    var obj = new Winpop();
    window.alert = function(str,data) {
        obj.alert.call(obj,str,data);
    };
    window.confirm = function(str, cb,cancel) {
        obj.confirm.call(obj, str,{callback:cb,cancel:cancel});
    };
})(window, jQuery);