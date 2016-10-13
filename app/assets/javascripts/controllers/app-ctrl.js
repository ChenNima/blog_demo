/**
 * Created by i336106 on 16/10/13.
 */
BlogDemo.ApplicationController = Ember.Controller.extend({

    init:function(){
      $.get('cookie_login').then(function(data){
          if(data.msg==='success'){
              BlogDemo.services.login.login(data.name,data.id);
          }
      });
    },

    loginService : BlogDemo.services.login,

    loginStatus: function() {
        return this.get('loginService').status;
    }.property('loginService.status'),

    userName: function() {
        return this.get('loginService').userName;
    }.property('loginService.userName'),

    actions:{
        logout(){
            $.get('logout').then(function(data){
                BlogDemo.services.login.logout();
                window.location.href='#/';
            })
        }
    }
});