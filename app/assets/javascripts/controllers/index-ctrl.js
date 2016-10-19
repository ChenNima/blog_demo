/**
 * Created by i336106 on 16/10/12.
 */
BlogDemo.IndexController = Ember.Controller.extend({

    login:Ember.inject.service(),

    loginStatus: function () {
        return this.get('login').isLogin;
    }.property('login.isLogin'),

    vol: function() {
        return 140-this.get('article').content.length;
    }.property('article.content.length'),

    init:function(){

    },

    articlesArray : function(){
        return this.get('articles').toArray().reverse();
    }.property('articles.length'),

    submitArticle: function(article){
        Ember.set(article,'isSubmitting',true);
        article.save().then(function(data){
            Ember.set(data,'isSubmitting',false);
            Ember.set(data,'isError',false);
        }).catch(function (err) {
            Ember.set(article,'isError',true);
        });
    },

    updateArticles:function() {
        this.set('articles',this.get('store').findAll('article'));
    },

    article:{
        content:''
    },

    actions:{
        submit:function() {
            var content = this.get('article').content;
            var name = this.get('login').userName;
            var newArticleParams = {
                content: content,
                user: {
                    name: name
                },
                comments: []
            };
            var newArticle = this.store.createRecord('article',newArticleParams);

            this.set('article.content','');

            this.get('submitArticle')(newArticle);
        }
        ,
        comment:function(article) {
            if(!this.get('loginStatus')){
                alert('请登录!');
                return;
            }
            var name = this.get('login').userName;
            var comment = {content:article.comment};
            comment.commenter = name;
            var commentBody = {comment: comment};
            article.get('comments').push(comment);

            Ember.set(article,'comment','');

            $.post('articles/' + article.id + '/comments',commentBody).then(function (data) {
                this.get('updateArticles').call(this);
            }.bind(this));
        },

        reSubmit:function(article){
            Ember.set(article,'isError',false);
            this.get('submitArticle')(article);
        },

        cancelSubmit: function(article){
            article.destroyRecord();
        },

        removeArticle:function(article){
            if(!this.get('loginStatus')){
                alert('请登录!');
                return;
            }
            if (this.get('login').userName!=article.get('user').name){
                alert('只有作者才能删除自己的文章!');
                return;
            }
            article.destroyRecord();
        },
        removeComments:function(article,cIndex){
            if(!this.get('loginStatus')){
                alert('请登录!');
                return;
            }
            var comment = article.get('comments')[cIndex];
            var userName = this.get('login').userName;
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
