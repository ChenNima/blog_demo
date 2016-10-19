/**
 * Created by i336106 on 16/10/12.
 */
BlogDemo.LoginController = Ember.Controller.extend({
    needs: ['application'],

    application: Ember.computed.alias('controllers.application'),

    userData:{
      username:'',
      password:''
    },

    login:Ember.inject.service(),

    clearErr:function() {
        this.set('userErr',false);
        this.set('passErr',false);
    },

    varify: function(){
        this.clearErr();
        var user = {
            user:{
                name:this.userData.username,
                email:this.userData.password
            }
        };
        $.post('login',user).then(function(data){
            switch(Number.parseInt(data.code)){
                case 2:
                    this.set('userErr',true);
                    alert(data.msg);
                    break;
                case 1:
                    this.set('passErr',true);
                    alert(data.msg);
                    break;
                case 0:
                    this.get('login').login(data.name,data.id);
                    window.location.href='#/';
                    break;
                default :
                    alert(data.msg);
                    break;
            }
        }.bind(this));
    },
    actions:{
        login : function(){
            this.varify();
        }
    }
});