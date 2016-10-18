/**
 * Created by i336106 on 16/10/13.
 */
BlogDemo.IndexRoute = Ember.Route.extend({
    model:function(){
        return this.get('store').findAll('article');
            //.then(function(data){
            //debugger;
            //return data
        //});
        //return $.get('articles').then(function(data){
        //    return data
        //})
    },
    setupController: function(controller, model) {
        //debugger;
        controller.set('articles', model);
        //controller.set('articles', Ember.A(model.reverse()));
    }
});