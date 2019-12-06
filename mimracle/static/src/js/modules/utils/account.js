function Account(){
    this.mmh = this.cookie("LSMY_PC_MMH");
    this.phone = this.cookie("LSMY_PC_PHONE");
    this.user_id = this.cookie("LSMY_PC_USER_ID");
    this.user_level_id = this.cookie("LSMY_PC_USER_LEVEL_ID");
}
Account.prototype = {
    constructor:Account,
    cookie:function(name){
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if(arr != null){
            return(arr[2]);
        }else{
            return null;
        }
    },
    isLogin:function(){
        if(!this.mmh || !this.phone || !this.user_id || this.mmh == "" || this.phone == "" || this.user_id == "" || this.mmh == '""' || this.phone == '""' || this.user_id == '""'){
            return false;
        }
        return true;
    }
};

module.exports = new Account();
