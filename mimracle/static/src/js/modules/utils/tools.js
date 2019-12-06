module.exports = {
    getUrlParam:(param)=>{
        var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }
};