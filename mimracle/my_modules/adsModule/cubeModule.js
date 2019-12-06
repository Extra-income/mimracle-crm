var cheerio = require('cheerio');

module.exports = {
    format:function(conf,global){
        var table = '<table class="g-cube">\n<tbody>\n__{content}__\n</tbody>\n</table>';

        var tr = [];
        for(var r = 0;r<conf.data.length;r++){
            var td = [];
            for(var c = 0;c<conf.data[r].length;c++){
                var column = conf.data[r][c] || {};
                var left = column.paddingLeft || 0;
                var right = column.paddingRight || 0;
                var top = column.paddingTop || 0;
                var bottom = column.paddingBottom || 0;
                var width = column.width || 0;
                var height = column.height || 0;
                if(!column.isValid) continue;
                var $ = cheerio.load(column.content);


                $("img").each(function(){
                    $(this).addClass("dh-lazy-load");
                    var src = $(this).attr("src");
                    if(global.config().image_cname && src.indexOf(".img-") > 0){
                        for(var i=0;i<global.config().image_cname.length;i++){
                            src = src.replace(global.config().image_cname[i].key,global.config().image_cname[i].value);
                        }

                    }
                    if(src.indexOf("@") > 0){
                        src+="_90Q";
                    }else{
                        src+="@90Q";
                    }
                    $(this).removeAttr("src").attr("data-src",src);
                });

                column.content = $.html();

                td.push('<td style="width: '+width+'px;height:'+height+'px;padding:'+top+'px '+right+'px '+bottom+'px '+left+'px" colspan="'+column.colspan+'" rowspan="'+column.rowspan+'">'+column.content+'</td>');
            }
            tr.push('<tr>\n'+td.join('\n')+'\n</tr>');
        }

        table = table.replace("__{content}__",tr.join('\n'));
        return table;
    }
};
