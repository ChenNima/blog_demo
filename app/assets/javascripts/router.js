// For more information see: http://emberjs.com/guides/routing/

BlogDemo.Router.map(function() {
    this.route("home");
    this.route("login");
    this.route("register");
});

BlogDemo.IndexRoute = Ember.Route.extend({
});