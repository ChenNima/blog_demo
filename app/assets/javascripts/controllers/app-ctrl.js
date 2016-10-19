/**
 * Created by i336106 on 16/10/13.
 */
BlogDemo.ApplicationController = Ember.Controller.extend({

    init: function () {
        var csrfToken = $('meta[name="csrf-token"]').attr('content');
        $.ajaxSetup({
            headers: {
                'X-CSRF-Token': csrfToken
            }
        });
        $.get('cookie_login').then(function (data) {
            if (data.msg === 'success') {
                this.get('login').login(data.name, data.id);
            }
        }.bind(this));
    },

    login:Ember.inject.service(),

    loginStatus: function () {
        return this.get('login').isLogin;
    }.property('login.isLogin'),

    userName: function () {
        return this.get('login').userName;
    }.property('login.userName'),

    actions: {
        logout(){
            $.get('logout').then(function (data) {
                this.get('login').logout();
                window.location.href = '#/';
            }.bind(this))
        }
    }
});