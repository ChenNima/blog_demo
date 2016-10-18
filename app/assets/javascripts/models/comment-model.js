/**
 * Created by i336106 on 16/10/17.
 */
BlogDemo.Comment=DS.Model.extend({
    content:DS.attr('string'),
    commenter:DS.attr('string'),
    article:DS.belongsTo('article')
});