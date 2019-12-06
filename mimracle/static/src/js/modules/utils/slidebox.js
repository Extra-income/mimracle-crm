/*定义从后台广告拿过来的轮播图*/
/*此轮播图是引用SuperSlide插件*/
/*使用需引入require("P/jquery.SuperSlide.2.1.1.js")*/
/*对应的格式
 {{if data.ads["PC-INDEX-0001"]}}
    <div class="hd">
        <ul class="dh-gslide-btn"></ul>
    </div>
    <div class="bd dh-gslide-bd"> 
    
          {{#data.ads["PC-INDEX-0001"].content}}
    
     </div>
 {{/if}} 
 */
module.exports={
	slideBox:function(strImg,strA){
	    if(0 == strA.lenght || 0 == strImg.length) return '';
        var str_src = [];
        var str_href = [];
        var str_html ="";
        for(var i=0;i<strImg.length;i++){
            if(i==0){
              str_href.push(strA[i].href);
              str_src.push($(strImg[i]).attr("src"));
            }else{
              str_href.push(strA[i].href);
              str_src.push($(strImg[i]).attr("data-src"));
            }
            
        }
        for(var j=0;j<str_src.length;j++){
                if(j==0){
                  var html = "<li><img src='"+str_src[j]+"'/><a href='"+str_href[j]+"'></a></li>";
                  str_html+=html; 
              }else{
                var html = "<li><img data-src='"+str_src[j]+"'/><a href='"+str_href[j]+"'></a></li>";
                str_html+=html; 
              }
                         
        }
        str_html ="<ul>"+str_html+"</ul>";
        return str_html;

    },
    slideIcon:function(strImg){
        var str_html ="";
        if(strImg.length==1){
          str_html="";
        }else{
          for(var i=0;i<strImg.length;i++){
           var html = "<li></li>";
           str_html+=html; 
        }
        }
        
        return str_html;
    },
    slideImgLoad:function(){
        var self = this;
        $(".bd ul li").each(function(){
         
            if($(this).css("display")!="none"){
                clearTimeout(time);
                var $this = $(this).next('li').find("img");
                $this.attr("src",$this.attr("data-src"));
                $this.removeAttr("data-src");               
            }
        });
        var time = setTimeout(function(){
            self.slideImgLoad();
        },100)
    },
    slideInfo:function(){
      var self = this

        var str_img = $(".g-slider ul li img");
        var str_a = $(".g-slider ul li a"); 
        var html = self.slideBox(str_img,str_a);
        $('.dh-gslide-bd').html(html).css("max-height","2000px").css("min-height","0px");
        var icon_html=self.slideIcon(str_img);
        $('.dh-gslide-btn').html(icon_html);
        if(str_img.length>0){
            var margin_left = -((str_img.length-1)*15+10);
           
            $(".dh-gslide-btn").css("margin-left",margin_left);
        }
        
         self.slidejQuery(); 
         self.slideImgLoad();
    },

    //调节轮播图的各种轮播方式，参数参考
    slidejQuery:function(){
        jQuery("#dh-inedx__banner").slide({mainCell:".bd ul",effect:"fold",autoPlay:true,delayTime:1000,pnLoop:false});
         jQuery("#dh-inedx__banner1").slide({mainCell:".bd ul",effect:"fold",autoPlay:true,delayTime:1000,pnLoop:false});
         jQuery("#dh-inedx__banner2").slide({mainCell:".bd ul",effect:"fold",autoPlay:true,delayTime:1000,pnLoop:false});
        jQuery("#dh-inedx__banner3").slide({mainCell:".bd ul",effect:"fold",autoPlay:true,delayTime:1000,pnLoop:false});

        //清除预处理
        // $('.dh-gslide-bd').css({height:"auto"},{overflow:"visible"});
         // $('.dh-gslide-bd ul li a img').css({"min-height":"540px"},{height:"auto"});
    }
	
};
