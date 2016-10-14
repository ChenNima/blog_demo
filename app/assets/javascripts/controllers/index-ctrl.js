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
        return this.get('articles');
    }.property('articles'),

    updateArticles:function() {
        $.get('articles').then(function(data){
            this.set('articles',data.reverse());
        }.bind(this));
    },

    article:{
        content:''
    },

    editIndex:1,

    isEditable:function(index){
        return index === this.get('editIndex');
    },

    actions:{
        submit:function(){
            //var article = this.get('article');
            //article.user = 'lala'
            //this.get('articles').unshift(article);
            //this.set('articles',this.get('articles'));
            $.post('articles',{article:this.get('article')}).then(function(data){
                this.get('updateArticles').call(this);
                this.set('article.content','');
            }.bind(this))
        },
        edit:function(index){
            this.set('editIndex',index);
        },
        comment:function(article_id,index) {
            if(!this.get('loginStatus')){
                alert('请登录!');
                return;
            }
            var name = this.get('loginService').userName;
            var articles = this.get('articles');
            var comment = {content:articles[index].comment};
            comment.commenter = name;
            var commentBody = {comment: comment};
            var article = this.get('articles')[index];

            article.comments.push(comment);

            //Ember.set(article,'comments',article.comments);

            $.post('articles/' + article_id + '/comments',commentBody).then(function (data) {
                this.get('updateArticles').call(this);
            }.bind(this));
        },

        removeArticle:function(index){
            if(!this.get('loginStatus')){
                alert('请登录!');
                return;
            }
            var article = this.get('articles')[index];
            if (this.get('loginService').userName!=article.name){
                alert('只有作者才能删除自己的文章!');
                return;
            }
            $.post('articles/'+article.id,{_method: "delete"}).then(function (data) {
                this.get('updateArticles').call(this);
            }.bind(this));
        },
        removeComments:function(aIndex,cIndex){
            if(!this.get('loginStatus')){
                alert('请登录!');
                return;
            }
            var article = this.get('articles')[aIndex];
            var comment = article.comments[cIndex];
            var userName = this.get('loginService').userName;
            if(userName!=article.name&&userName!=comment.commenter){
                alert('文章或评论作者才能删除评论!');
                return;
            }
            $.post('articles/'+article.id+'/comments/'+comment.id,{_method: "delete"}).then(function (data) {
                this.get('updateArticles').call(this);
            }.bind(this));
        }

    }
});