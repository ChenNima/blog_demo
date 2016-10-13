/**
 * Created by i336106 on 16/10/13.
 */
BlogDemo.IndexRoute = Ember.Route.extend({
    model:function(){
        return $.get('articles').then(function(data){
            return data
        })
    },
    setupController: function(controller, model) {
        controller.set('articles', model.reverse());
    }
});