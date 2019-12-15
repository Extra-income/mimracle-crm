let fs = require("fs");

let _fn = function() {};

/**
 * 根据api_key到配置文件获取后台api对应的请求地址和web_key，
 */
_fn.prototype.getConfig = function(key) {
    let config = JSON.parse(fs.readFileSync('./config.json').toString());

    if (config == null || config.api_configs == null || config.api_configs.length == 0) return null;

    let apiConfig;
    config.api_configs.forEach(element => {
        if (element.key == key) apiConfig = element.api_setting;
    });
    return apiConfig;
}

/**
 * 创建opt
 */
_fn.prototype.buildOpt = function(url, data, req) {
    let self = this;
    let apiConfig = this.getConfig(req.query["api_key"]);
    if (apiConfig == null) return null;

    let opt = {
        url: apiConfig.api_host + url,
        form: data
    };
    opt.form.web_key = apiConfig.web_key;
    return opt;
}

/**
 * 转换后台api接口返回内容
 */
_fn.prototype.toMimracleResult = function(apiResult) {
    let self = this;
    let result = {};
    result.code = apiResult.code;
    result.msg = apiResult.msg;
    result.succeed = result.code == 200;
    return result;
}

/**
 * 转换后台api接口返回内容
 */
_fn.prototype.getSuccessResult = function(code, msg) {
    let self = this;
    let result = {};
    result.code = code || 200;
    result.msg = msg || "获取成功";
    result.succeed = true;
    return self.toMimracleResult(result);
}

/**
 * 转换后台api接口返回内容
 */
_fn.prototype.getFailResult = function(code, msg) {
    let self = this;
    let result = {};
    result.code = code || 200;
    result.msg = msg || "系统异常";
    result.succeed = false;
    return self.toMimracleResult(result);
}

/**
 * 不存在api_key返回结果
 */
_fn.prototype.notExistsApiKeyResult = function() {
    let self = this;
    return self.getFailResult(200, "无效api_key");
}

/**
 * 获取广告类型
 */
_fn.prototype.getAdvertTypes = function() {
    let advertTypeDict = {
        top: 1,
        middle: 2,
        bottom: 3,
        left: 4,
        right: 5
    };
    return advertTypeDict;
}

let mimracleHelper = new _fn();

module.exports = mimracleHelper;