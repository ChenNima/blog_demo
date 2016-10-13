// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require jquery
//= require jquery_ujs
//= require ./environment
//= require ember
//= require ember-data
//= require active-model-adapter
//= require bootstrap-sprockets

//= require_self
//= require ./blog-demo

// for more details see: http://emberjs.com/guides/application/
BlogDemo = Ember.Application.create();

BlogDemo.services={

};

BlogDemo.services.login={
    status:false,
    userName:null,
    userId:null,
    login:function(name,id){
        Ember.set(this,'status',true);
        Ember.set(this,'userName',name);
        Ember.set(this.login,'userId',id);
    },
    logout:function(){
        Ember.set(this,'status',false);
        Ember.set(this,'userName',null);
        Ember.set(this.login,'userId',null);
    }
};

//= require_tree .
