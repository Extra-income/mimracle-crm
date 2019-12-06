;!function (undefined) {
    var dhMall = {
        _ie:navigator.appName == "Microsoft Internet Explorer",
        _ie8:navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i)=="8.",
        _bindEvent:function(){
            $(document).on("keydown",".c-search>input",function(event){
                //监听enter
                event = event || window.event;
                if(event.keyCode == 13){
                    $(this).next().trigger("click");
                }
            });
            $(document).on("click","a",function(){
                var $this = $(this);

                if(!/^#.+/ig.test($this.attr("href"))) return true;

                var top = $($this.attr("href")).offset().top;

                // 手动微调偏移量
                if($this.attr('offset')) {
                    top += Number($this.attr('offset'))
                }
                // var top = $this.offset().top;
                $("html,body").animate({'scrollTop':top+"px"},300);
                return false;
            });
            $(document).click(function(e){
                var $dom = $(e.target);
                if($dom.hasClass('select-form') || $dom.parents('.select-form:first').size() > 0) {
                    //避免页面上有很多个select
                    /*if($dom.parents('.select-form:first').size() > 0){
                        $dom = $dom.parents('.select-form:first');
                        $('.select-form').each(function(){
                            $('.select-option',$(this)).hide();
                        });
                    }
                    $('.select-option',$dom).show();*/
                    return
                }
                if($(".select-form>.select-option").show()){
                    $(".select-form>.select-option").hide();
                }
            });

        },
        _placeholder:function(){
            if(!$.fn.placeholder) return;
            // var interval = setInterval(function(){
                $("[placeholder]").each(function(){
                    if($(this).is(".placeholder") || $(this).is(":focus"))return true;
                    if($(this).prev().is(".placeholder"))return true;
                    if($(this).next().is("input[type='password']"))return true;
                    if($(this).prev().is("input[type='text']"))return true;
                    $(this).placeholder();
                });
            // },200);
        },
        _inputError:function(){
            $(document).on("input propertychange keydown","input.error",function(){
                $(this).val() && $(this).removeClass("error");
            });
        },
        _changeDom:function(){
            //改变东西
            var _this = this;
            if(!_this._ie8) return;
            $(".checkbox2+span").each(function(){
                _this.replaceHtml($(this));
                
            });
        },
        replaceHtml : function($span){
            //ie8替换内容
            if(!this._ie8) return;
            if($span.find(".before").length >=1 || ($span.html().toLowerCase().indexOf("before") >=0 && $span.html().toLowerCase().indexOf("after") >=0) ) return true;
            $span.html('<span class="before"></span>'+$span.html()+'<span class="after"></span>');
            var $parents = $span.parent();
            var $input = $('.checkbox2',$parents);
            var isChecked = $input.is(':checked');
            $input[isChecked?'addClass':'removeClass']('checked');
            $parents[isChecked?'addClass':'removeClass']('checked');
        },
        changeState:function(){
            //改变选择状态
            $(".checkbox2+span").each(function(){
               if($(this).find(".before").length < 1 || ($(this).html().toLowerCase().indexOf("before") < 0 && $(this).html().toLowerCase().indexOf("after") < 0) ){
                    $(this).html('<span class="before"></span>'+$(this).html()+'<span class="after"></span>');
               }
               var $parents = $(this).parent();
                var $input = $('.checkbox2',$parents);
                var isChecked = $input.is(':checked');
                $input[isChecked?'addClass':'removeClass']('checked');
                $parents[isChecked?'addClass':'removeClass']('checked');
            });
        },
        _checkbox:function(){
            var self = this;
            if(!self._ie8) return;
            setInterval(function(){
                $(".checkbox+span").each(function(){
                    if($(this).find(".before").length >=1 || ($(this).html().toLowerCase().indexOf("before") >=0 && $(this).html().toLowerCase().indexOf("after") >=0) ) return true;
                    $(this).html('<span class="before"></span>'+$(this).html()+'<span class="after"></span>');
                });
                $(".checkbox").each(function(){
                    if($(this)[0].checked){
                        $(this).addClass("checked");
                        $(this).closest("label").addClass("checked");
                    }else{
                        $(this).removeClass("checked");
                        $(this).closest("label").removeClass("checked");
                    }
                });
            },300);
            $(document).on("click",".checkbox+span",function(event){
                /*var $checkbox = $(this).closest("label").find("input[type=checkbox]");
                $checkbox[0].checked = !$checkbox[0].checked;
                if($checkbox[0].checked) $checkbox.addClass("checked");
                else $checkbox.removeClass("checked");*/
                //增加了单选

                var $label = $(this).closest("label");
                var $checkbox = $('input[type=checkbox],input[type=radio]',$label);
                if($checkbox.size()){
                    $checkbox.each(function(){
                        this.checked = !this.checked;

                        if(this.checked){
                            $(this).addClass("checked");
                            $label.addClass("checked");
                        }else{
                            $(this).removeClass("checked");
                            $label.removeClass("checked");
                        }
                    });
                    
                }
                
                
            });
        },
        isPC:function() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },

        _redirect:function(){
            if(!this.isPC()){
                //移动端跳转
                var $meta = $("meta[name='mobile-agent']");
                if($meta.length == 0) return;
                var url = $meta.attr("content").split(";url=")[1];
                url = url || "";
                url = url.replace(/^("|')/,"").replace(/("|')$/,"");
                return window.location.href = url;
            }
        },
        getHeight:function(){
            if(window.innerHeight!= undefined){
                return window.innerHeight;
            }
            else{
                var B= document.body, D= document.documentElement;
                return Math.min(D.clientHeight, B.clientHeight);
            }
        },
        imgLazyLoad:function(){
            var self = this;
            $("img.dh-lazy-load").each(function(){
                var top = $("body").scrollTop() || document.documentElement.scrollTop;
                var bottom = top + self.getHeight() + 50;

                var $this = $(this);
                if($this.offset().top == 0){
                    return true;
                }
                if($this.offset().top <= bottom && $this.offset().top  >= top ){
                    $this.removeClass("dh-lazy-load");
                    $this.attr("src",$this.attr("data-src"));
                    $this.removeAttr("data-src");
                }
            });
        },
        /**
         * [lazyload 图片预加载，全程只需运行一次。之后插入的dom(viewV.render方法)也作处理，无须再次执行lazyload函数]   
         * @param  {Number正整数} threshold 默认100，未出现在视窗且距离视窗上方或下方100之内也提前加载
         * @param  {String} selector  默认'lazy-src'，dom元素属性名，且其值等于加载的图片路径
         * @return {Function}           [_scrollCheck]
         */
        lazyload: function (){
            var $lazyImg = []
            ,   _clearTimeout
            ,   _setTime = 100
            ,   _viewBetween = [/*视窗top*/, /*视窗bottom*/]
            ,   _option = {
                threshold: 200,//上下100视窗距离提前加载
                selector: 'lazy-src',//最好不要修改
                return: false,//当true时不通过window.onscroll绑定事件，返回_scrollCheck函数自行处理
            }

            function _scrollCheck(lastImgCheckAgain/*bool,最后一次check，防止长图片变短图片*/){
                var imgCount
                window.clearTimeout(_clearTimeout)

                // 让滚动真正停止时才执行
                _clearTimeout = setTimeout(function (){
                    $lazyImg.forEach(function (dom, index){
                        var _position = dom.getBoundingClientRect()
                        ,   _lazySrc

                        if(
                            _position.top >= _viewBetween[0] && _position.top <= _viewBetween[1]
                            || _position.bottom >= _viewBetween[0] && _position.bottom <= _viewBetween[1]
                        ){
                            delete $lazyImg[index]//减轻数组负担

                            _lazySrc = template.helpers.pImg(dom.getAttribute(_option.selector))
                            if(!_lazySrc) return//首屏时有可能nodejs渲染_refresh执行一次 + window.onscroll也执行一次导致_lazySrc为null
                            if(/img/i.test(dom.nodeName)) {
                                imgCount = index
                                dom.src = _lazySrc
                                dom.onload = function (){
                                    // 等待加载完成才删掉lazy-src属性，避免页面高度突然撑高体验不好
                                    dom.removeAttribute(_option.selector)
                                    if(!lastImgCheckAgain && imgCount === index) {
                                        _scrollCheck(true)
                                    }
                                }
                            }else {
                                dom.style.backgroundImage = 'url(' + _lazySrc + ')'
                                dom.removeAttribute(_option.selector)
                            }
                        }
                    })
                }, lastImgCheckAgain ? 0 : _setTime)
            }

            function _refresh(){
                $lazyImg = [].slice.call(document.querySelectorAll('[' + _option.selector + ']'))
                _scrollCheck()
            }

            return function (option){
                option && $.extend(_option, option)
                _viewBetween = [0 - _option.threshold, window.innerHeight + _option.threshold]

                var _oldFunc = template.compile

                // 重写template.compile函数，让viewV.renderAsync或viewV.render执行完后自动支持图片懒加载
                template.compile = function (html, option){
                    return function (data){
                        var renderHtml = _oldFunc.call(template, html, option)(data)

                        /* /lazy-src=\S[^{]/ */
                        // 当匹配到lazy-src="{{ $value }}"类似语句不执行_refresh()
                        // 只有lazy-src="http://"
                        ;new RegExp(_option.selector + '=\\S[^{]').test(renderHtml) && setTimeout(_refresh, 0)

                        return renderHtml
                    }
                }

                // 首屏时有可能nodejs渲染，而不需要template渲染
                _refresh()


                if(_option.return) return _scrollCheck
                else {
                    // 用此绑定事件方法，防止lazyload被多次执行，而绑定重复事件
                    window.onscroll = function (e){
                        _scrollCheck()
                    }
                }
            }
        }(),
        imgTouchLoad:function(){
            var self = this;
            $(".dh-touch-load-parent").each(function(){
             
                if($(this).css("display")=="block"){
                    clearTimeout(time);
                    var $this = $(this).find("img.dh-touch-load");
                    $this.each(function(i){

                        $(this).attr("src",$(this).attr("data-src"));
                        $(this).removeAttr("data-src");
                       $(this).removeClass("dh-touch-load");
                    })
                }
            });
            var time = setTimeout(function(){
                self.imgTouchLoad();
            },100)
        },
        _imgLazyLoad:function(){
            var self = this;
            $(function(){
                self.imgLazyLoad();
                self.imgTouchLoad();
            });
            var timeout = null;
            window.onscroll = function(){
                if(timeout){
                    clearTimeout(timeout);
                    timeout = null;
                }
                timeout = setTimeout(function(){
                    self.imgLazyLoad();
                },100);
            }
        },
        // 下拉
        /*_select:function(){
            var self = this;
            $(".select-form").each(function(){
                var $this = $(this);
                var $input = $this.find(".select-input");
                var $option = $this.find(".select-item");
                var text = $input.val();
                var val = $input.attr("data-value");
                if(text==""&&val==""){
                    var defaultText = $this.find(".select-item:eq(0)").text();
                    var defaultVal = $this.find(".select-item:eq(0)").attr("data-value");
                    $input.val(defaultText);
                    $input.attr("data-value",defaultVal);
                }
                $input.click(function(e){
                    e.stopPropagation();
                    if($this.find(".select-option").is(":visible")){
                        $this.find(".select-option").hide();
                    }else{
                        $this.find(".select-option").show();
                    }
                });
                $option.click(function(){
                    $input.val($(this).text());
                    $input.attr("data-value",$(this).attr("data-value"));
                });
            });
        },*/
        _select:function(){
            $(document).on('click','.select-form',function(e){
                var $target = $(e.target);
                var $input = $(".select-input",$(this));
                //var $option = $(".select-item",$(this));
                var $select = $('.select-option',$(this));
                var isInput = $target.hasClass('input-wrap') || !!$target.parents('.input-wrap:first').size();
                if(isInput){
                    $('.select-form').each(function(){
                        $('.select-option',$(this)).hide();
                    });
                    $select[$select.is(':visible')?'hide':'show']();
                    return;
                }
                var $option = $target.hasClass('select-item')?$target:$target.parents('.select-item:first');
                if(!$option.size()) return;
                $input.val($option.text());
                $input.attr("data-value",$option.attr("data-value"));
                $select.hide();
                $option[0].callback && $option[0].callback($input);

            });
        },
        _ready:false,
        _extJquery:function(){
            var self = this;
            var arrCallback = [];
            $.fn.readyEx = function(callback){
                if(this.length){
                    return callback && callback(this);
                }
                if(self._isReady) return;
                var $this =this;
                var interval = setInterval(function(){
                    if($($this.selector).length){
                        clearInterval(interval);
                        return callback && callback($($this.selector));
                    }
                    if(self._isReady){
                        clearInterval(interval);
                    }
                },100);
            };
        },
        getGoodsListUrlByKeyWords:function(keywords,callback){
          //根据关键词来获取进入搜索页面的url
            /*if(!keywords) return;*/
            keywords = $.trim(keywords) === ''?'':$.trim(keywords);
            $.ajax({
                type: "GET",
                //url: "search/goods/queryClassify.do",//TODO...暂时调用这个接口
                url : "/search/classify/query.do",
                data: {
                    word : keywords
                },
                success:function(data){
                    var url = '/goods';
                    url += keywords?'/word-' + keywords : '';
                    //var url = '/goods/word-' + keywords;
                    if(data.success && data.object && data.object.length){
                        //url = '/goods/sort-' + data.object[0].classifyCode + '/word-' + keywords;
                        //url = '/goods/sort-' + data.object[0].classifyCode;
                        var i = data.object.length -1;
                        url = '';

                        for(;i >= 0; i--){
                            if(keywords == data.object[i].classifyName){
                                //bool = true;
                                url = '/goods/sort-' + data.object[i].classifyCode;
                                break;
                            }
                        }
                        url = url?url:'/goods/sort-' + data.object[0].classifyCode + '/word-' + keywords;
                    }
                    data.url = url;
                    callback & callback(data);
                },
                error:function(){
                    callback & callback({url:'/goods/word-' + keywords});
                }
            });

        },
        _init:function(){
            var self = this;
            //self._checkbox2();
            self._checkbox();
            // self._placeholder();
            self._inputError();
            self._bindEvent();
            self._redirect();
            self._imgLazyLoad();
            self._extJquery();
            if(!document.addEventListener){
            }
            $(function(){
                self._ready();
                self._isReady = true;
                self._refreshPage();
            });
        },
        _ready:function(){
            var self = this;
            self._placeholder();
            self._select();
        },
        replaceURL:function(url){
            //替换历史URL
            if(!url) return;
            window.location.replace(url);
        },
        reinstallUrl:function(){
            //a->b->c
            var href = window.location.href;
            if(href.indexOf('#') == (href.length-1)) return;
            window.location.href = window.location.href+'#';//,添加一个hash值，为了清缓存用的
        },
        _refreshPage:function(){
            var href = window.location.href;
           if(href.indexOf('#') == (href.length-1)){
            //重置url
            window.location.href = href.substring(0,href.length-1);
           } 
        }
    };
    dhMall._init();
    window.DH = dhMall;
}();