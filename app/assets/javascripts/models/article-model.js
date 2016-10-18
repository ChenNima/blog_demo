BlogDemo.Article = DS.Model.extend({
    content:DS.attr('string'),
    user:DS.attr(),
    comments:DS.attr(),
    created_at:DS.attr()
});
