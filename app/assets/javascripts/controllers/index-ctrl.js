/**
 * Created by i336106 on 16/10/12.
 */
BlogDemo.IndexController = Ember.Controller.extend({

    loginService: BlogDemo.services.login,

    loginStatus: function() {
        return this.get('loginService').status;
    }.property('loginService.status'),

    vol: function() {
        return 140-this.get('article').content.length;
    }.property('article.content.length'),

    init:function(){

    },

    obArticle : function(){
        return this.get('articles').toArray().reverse();
    }.property('articles.length'),

    //obArticle : Ember.computed('articles.@each.content',function(){
    //    return this.get('articles');
    //}),

    //updateArticles:function() {
    //    $.get('articles').then(function(data){
    //        this.set('articles',data);
    //    }.bind(this));
    //},

    updateArticles:function() {
        this.set('articles',this.get('store').findAll('article'));
    },

    article:{
        content:''
    },

    actions:{
        submit:function() {
            var content = this.get('article').content;
            var name = this.get('loginService').userName;
            var newArticleParams = {
                content: content,
                user: {
                    name: name
                },
                comments: []
            };
            var newArticle = this.store.createRecord('article',newArticleParams);
            Ember.set(newArticle,'isSubmitting',true);
            debugger;
            this.set('article.content','');
            newArticle.save().then(function(data){
                Ember.set(data,'isSubmitting',false);
                debugger
            }.bind(this));
        }
        ,
        //submit:function(){
        //    debugger
        //    var content = this.get('article').content;
        //    var name = this.get('loginService').userName;
        //    var elderArticles = this.get('articles');
        //    var newArticle = {
        //        content:content,
        //        user:{
        //            name:name
        //        },
        //        submitting:true,
        //        comments:[]
        //    };
        //    elderArticles.unshiftObject(newArticle);
        //
        //    $.post('articles',{article:this.get('article')}).then(function(data){
        //        newArticle.id = data.id;
        //        Ember.set(newArticle,'submitting',false);
        //        debugger;
        //        this.set('article.content','');
        //    }.bind(this));
        //},
        comment:function(article) {
            if(!this.get('loginStatus')){
                alert('请登录!');
                return;
            }
            var name = this.get('loginService').userName;
            var comment = {content:article.comment};
            comment.commenter = name;
            var commentBody = {comment: comment};
            article.get('comments').push(comment);

            Ember.set(article,'comment','');

            $.post('articles/' + article.id + '/comments',commentBody).then(function (data) {
                this.get('updateArticles').call(this);
            }.bind(this));
        },

        removeArticle:function(article){
            if(!this.get('loginStatus')){
                alert('请登录!');
                return;
            }
            //var article = this.get('articles')[index];
            if (this.get('loginService').userName!=article.get('user').name){
                alert('只有作者才能删除自己的文章!');
                return;
            }
            article.destroyRecord();
            //$.post('articles/'+article.id,{_method: "delete"}).then(function (data) {
            //    this.get('updateArticles').call(this);
            //}.bind(this));
        },
        removeComments:function(article,cIndex){
            if(!this.get('loginStatus')){
                alert('请登录!');
                return;
            }
            var comment = article.get('comments')[cIndex];
            var userName = this.get('loginService').userName;
            if(userName!=article.get('user').name&&userName!=comment.commenter){
                alert('文章或评论作者才能删除评论!');
                return;
            }
            $.post('articles/'+article.id+'/comments/'+comment.id,{_method: "delete"}).then(function (data) {
                this.get('updateArticles').call(this);
            }.bind(this));
        }

    }
});
