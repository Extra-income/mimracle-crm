const defaultOpts = {
    rect:{
        left:73.0810546875,
        top:53.4357192066942,
        right:135.9228515625,
        bottom:17.811456088564483
    }
};

function getDefaultOpts(opts = {}){
    for(var key in defaultOpts){
        if(opts[key] === undefined){
            opts[key] = defaultOpts[key];
        }
    }
    return opts;
}
function MapMarker(opts){
    var self = this;
    this.opts = getDefaultOpts(opts);
    this.markers = [];
    this.clickCallback = [];
    $(opts.container).on("mouseenter",".map-marker",function(){
        self._onMarkerClick($(this));
    });
}

MapMarker.prototype = {
    constructor:MapMarker,
    showMarker:function(){
        var $container = $(this.opts.container);
        $container.find(".map-marker").remove();
        if($container.length == 0 || !this.markers || this.markers.length == 0)return;
        var opts = this.opts;
        var width = $container.width(),height = $container.height();

        $.each(this.markers,function(index){
            var top =  (opts.rect.top - this.lng) / (opts.rect.top - opts.rect.bottom) * height;
            var left = (opts.rect.left - this.lat) / (opts.rect.left - opts.rect.right) * width;
            $container.append('<span data-id="'+index+'" class="map-marker" style="top:'+top+'px;left:'+left+'px"></span>');
        });
    },
    setMarker:function(markers){
        if(!markers) return;
        if($.type(markers) != "array"){
            markers = [markers];
        }
        this.markers = markers;
        this.showMarker();
    },
    _onMarkerClick:function($ele){
        var self = this;
        $.each(this.clickCallback,function(){
            this(self.markers[$ele.attr("data-id")],$ele);
        });
    },
    markerClick:function(callback){
        this.clickCallback.unshift(callback);
    }
};

module.exports = MapMarker;
