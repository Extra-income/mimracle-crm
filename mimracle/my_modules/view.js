var adsModule = require('./adsModule/moduleHelper'),
    logger = require("./util").logger;

module.exports = {
    formatAdsContent:function(ads,global){

        for(var key in ads){
            if(ads[key].materialType != 'HTML' || ads[key].manageType != 'INNER' || !ads[key].conf) continue;
            try{
                var conf = JSON.parse(ads[key].conf);
                var content = adsModule.getContent(conf,global);
                ads[key].content = content || ads[key].content;
            }catch(e){
                logger.error(e);
                continue;
            }
        }
    }
};