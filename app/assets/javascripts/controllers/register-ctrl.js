/**
 * Created by i336106 on 16/10/13.
 */
BlogDemo.RegisterController = Ember.Controller.extend({
    userData:{
        username:'',
        password:'',
        repass:''
    },
    login:Ember.inject.service(),
    varify: function(){
        var userData = this.get('userData');
        if(userData.password!=userData.repass){
            alert('两次输入密码不一致');
            return;
        }else if(userData.password==='' || userData.username===''){
            alert('必须输入用户名/密码');
            return;
        }
        var user = {
            user:{
                name:this.userData.username,
                email:this.userData.password
            }
        };
        $.post('users',user).then(function(data){
            if(data.msg!='success'){
                alert(data.msg);
            }else{
                this.get('login').login(data.name, data.id);
                window.location.href='#/';
            }
        }.bind(this));
    },
    actions:{
        register : function(){
            this.varify();
        }
    }
});