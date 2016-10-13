/**
 * Created by i336106 on 16/10/12.
 */
BlogDemo.ApplicationRoute = Ember.Route.extend({
    model:function(){
        return BlogDemo.services.login;
    }
});