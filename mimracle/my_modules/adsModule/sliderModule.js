var $ = require("../util");

module.exports = {
    format:function(conf,global){
        var self = conf;
        var scale = self.scale_w + ":" + self.scale_h;
        var width = 0,height = 0;
        var style = "";
        if(self.width){
            width = self.width;
            height = Math.ceil(self.width / self.scale_w * self.scale_h);
            style='style="width:'+width+'px;height:'+height+'px;"';
        }else{
            style = 'style="width:100%;"';
        }
        var html = '<div data-width="'+width+'" '+style+' class="g-slider" data-style="'+self.style+'" data-scale="'+scale+'">\r<ul>\r__{content}__\r</ul>\r</div>';
        var li = [];
        $.each(self.pics,function(index){
            var index = index;
            if(this.src){
                var a = '';
                if(this.href){
                    //var href = (this.href?(/^https?:\/\//ig.test(this.href)?this.href:'http://'+this.href):"javascript:void(0)");
                    var href = this.href;
                    a = '\r<a href="'+href+'"></a>'
                }
                var src = this.src;
                if(global.config().image_cname && src.indexOf(".img-") > 0){
                    for(var i=0;i<global.config().image_cname.length;i++){
                        src = src.replace(global.config().image_cname[i].key,global.config().image_cname[i].value);
                    }

                }
                if(width){
                    src+="@"+height+"h_"+width+"w_1e_1c_0l";
                }
                if(src.indexOf("@") > 0){
                    src+="_90Q";
                }else{
                    src+="@90Q";
                }
                if(index==0){
                    li.push('<li>\r<img src="'+src+'">'+a+'\r</li>');
                }else{
                    li.push('<li>\r<img data-src="'+src+'">'+a+'\r</li>');
                }
                
            }
        });
        return html.replace("__{content}__",li.join("\r"));
    }
};
