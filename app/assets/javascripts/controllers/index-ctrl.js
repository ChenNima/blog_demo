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
            $.post('articles',{article:this.get('article')}).then(function(data){
                this.get('updateArticles').call(this);
                this.set('article.content','');
            }.bind(this))
        },
        edit:function(index){
            this.set('editIndex',index);
        },
        comment:function(article_id,index) {
            var name = this.get('loginService').userName;
            var comment = {content:this.get('articles')[index].comment};
            comment.commenter = name;
            var commentBody = {comment: comment};
            $.post('articles/' + article_id + '/comments',commentBody).then(function (data) {
                this.get('updateArticles').call(this);
            }.bind(this));
        }

    }
});