/**
 * Created by i336106 on 16/10/19.
 */
BlogDemo.LoginService = Ember.Service.extend({
    isLogin:false,
    userName:null,
    userId:null,
    login:function(name,id){
        Ember.set(this,'isLogin',true);
        Ember.set(this,'userName',name);
        Ember.set(this.login,'userId',id);
    },
    logout:function(){
        Ember.set(this,'isLogin',false);
        Ember.set(this,'userName',null);
        Ember.set(this.login,'userId',null);
    }
});