/**
 * Created by i336106 on 16/10/12.
 */
BlogDemo.LoginController = Ember.Controller.extend({
    userData:{
      username:'',
      password:''
    },
    varify: function(){
        var user = {
            user:{
                name:this.userData.username,
                email:this.userData.password
            }
        };
        $.post('login',user).then(function(data){
            if(data.msg!='success'){
                alert(data.msg);
            }else{
                BlogDemo.services.login.login(data.name,data.id);
                window.location.href='#/';
            }
        });
    },
    actions:{
        login : function(){
            this.varify();
        }
    }
});