/**
 * Created by i336106 on 16/10/17.
 */
BlogDemo.ArticleSerializer = DS.RESTSerializer.extend({
    normalizeFindAllResponse: function(store, primaryModelClass, payload, id, requestType){
        //debugger;
        payload = {articles: payload};
        return this._super(store, primaryModelClass, payload, id, requestType);
    },
});