//数据上报

var domain = {
    develop:"//datareport-dev.my0404.com",
    product:"//datareport-test.my0404.com",
    online:"//datareport.linshimuye.com",
    develop_linux: "//datareport-dev.my0404.com"
};

//数据上报
var model = {
    clientType:undefined, //客户端 wxweb app web wap
    accessId:undefined, //用户临时id
    accessUrl:undefined,//网页ID
    appDustributionChannel:undefined,//安卓：华为、OPPO、vivo、小米、应用宝、360、魅族、豌豆荚、91、安卓市场、百度手机助手 IOS：AppStore
    appVersion:undefined,//商城APP 的版本
    goodsId:undefined,//商品 ID
    mobileDevideMode:undefined,//移动设备型号
    nextAccessUrl:undefined,//	下一网页ID
    optType:"open",//操作类型 :打开 open，暂停 stop，重启 restart，关闭 close
    preAccessUrl:undefined,//上一网页ID
    resolution:undefined,//浏览器分辨率：长x宽
    secodeClass:undefined,//网页中类 注册页 register 登陆页 registerLogin 找回密码 registerFindPass 首页 main 商品分类列表页 goodsClassList 商品搜索列表页 goodsSearchList 商品详情页 goodsDetail 购物车页面 carDetail 结算页面 settlementDetail 支付页面 payDetail
    skuId:undefined,//没有则不需要
    table:undefined,//后端使用，对应到相应的数据表
    threedClass:undefined,//网页小类 注册页 register 登陆页 registerLogin 找回密码 registerFindPass 首页 main 商品分类列表页 goodsClassList 商品搜索列表页 goodsSearchList 商品详情 goodsDetail 商品推荐 goodsDetailRecommend 商品评价 goodsDetailEvaluate 购物车页面 carDetail 结算页面 settlementDetail 支付页面 payDetail
    topClass:undefined,//网页大类 	网页大类 注册登录 topRegister 首页 topMain 商品 topGoods 购物车 topCar 结算 topSettlement
    userId:undefined  //会员ID
};

//////////////////////////////////////////////
// 初始化一些数据
//////////////////////////////////////////////
function getHeight(){
    if(window.innerHeight!= undefined){
        return window.innerHeight;
    }
    else{
        var B= document.body, D= document.documentElement;
        return Math.min(D.clientHeight, B.clientHeight);
    }
}
function getWidth(){
    if(window.innerWidth!= undefined){
        return window.innerWidth;
    }
    else{
        var B= document.body, D= document.documentElement;
        return Math.min(D.clientWidth, B.clientWidth);
    }
}
function isPC() {
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
}

function cookie(name){
    if(!name){
        return undefined;
    }
    var cookies = document.cookie.split(";");
    for(var i=0;i<cookies.length;i++){
        var c = cookies[i].split("=");
        if(c[0].trim().toLowerCase() == name.trim().toLowerCase()){
            return decodeURI(c[1]) || undefined;
        }
    }
    return undefined;
}

var ua = window.navigator.userAgent.toLowerCase();
if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    model.clientType = "wxweb";
}else if(isPC()){
    model.clientType = "pc";
}else{
    model.clientType = "wap";
}
//////////////////////////////////////////////////
if(cookie("LSMY_PC_SESSION")){
    model.accessId = cookie("LSMY_PC_SESSION");
}else{
    $.ajax({
        url: '/pc/dev/getSession_key.do',
        type: 'GET',
        success:function(){
            model.accessId = cookie("LSMY_PC_SESSION");
        }
    });
}
model.accessUrl = location.href;
model.preAccessUrl = document.referrer || undefined;
model.resolution = getHeight()+"x"+getWidth();
model.userId = cookie("LSMY_PC_USER_ID");


//////////////////////////////////////////////

function report(dataModel = {}){
    if(!domain[env]) return;
    for(var key in model){
        if(dataModel[key] == undefined){
            dataModel[key] = model[key];
        }
    }
    if(!document.getElementById("dataReport_target_id")){
        var iframe = document.createElement("iframe");
        iframe.name = "dataReport_target_name";
        iframe.id = "dataReport_target_id";
        iframe.style.width="0";
        iframe.style.height="0";
        iframe.style.border="none";
        iframe.style.display = "none";
        document.body.appendChild(iframe);
    }
    var turnForm = document.createElement("form");
    document.body.appendChild(turnForm);
    turnForm.method = 'post';
    turnForm.action = domain[env]+'/info/v1';
    turnForm.target = 'dataReport_target_name';
    turnForm.id = "dataReport_id";

    var newElement = document.createElement("input");
    newElement.setAttribute("name","json");
    newElement.setAttribute("type","hidden");
    newElement.setAttribute("value",JSON.stringify(dataModel));
    turnForm.appendChild(newElement);

    turnForm.submit();

    document.body.removeChild(turnForm);
}

function reportOneMinute(){
    if(!domain[env]) return;
    if(!document.getElementById("dataReportOneMinute_target_id")){
        var iframe = document.createElement("iframe");
        iframe.name = "dataReportOneMinute_target_name";
        iframe.id = "dataReportOneMinute_target_id";
        iframe.style.width="0";
        iframe.style.height="0";
        iframe.style.border="none";
        iframe.style.display = "none";
        document.body.appendChild(iframe);
    }
    var turnForm = document.createElement("form");
    document.body.appendChild(turnForm);
    turnForm.method = 'post';
    turnForm.action = domain[env]+'/lua/v1';
    turnForm.target = 'dataReportOneMinute_target_name';
    turnForm.id = "dataReportOneMinute_id";

    var newElement = document.createElement("input");
    newElement.setAttribute("name","json");
    newElement.setAttribute("type","hidden");
    newElement.setAttribute("value",JSON.stringify({
        accessId:model["accessId"] || "",
        clientType:model["clientType"]
    }));
    turnForm.appendChild(newElement);

    turnForm.submit();

    document.body.removeChild(turnForm);

}

setInterval(reportOneMinute,60000);
reportOneMinute();

module.exports = report;