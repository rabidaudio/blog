/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'marked',
    'handlebars'
], function ($, _, Backbone, marked, Handlebars) {
    'use strict';

    var PostView = Backbone.View.extend({

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change',     this.render);
            this.listenTo(this.model, 'destroy',    this.remove);
            this.listenTo(this.model, 'visible',    this.toggleVisible);
            this.listenTo(this.model, 'got_body',   this.render);
        },

        render: function () {
            //build html
            this.$el.html(this.template(this.model.toJSON()));
            //compile markdown
            var post_body = this.model.get("content");
            if(!post_body){
                var md = this.model.get("markdown");
                if( !md ) return;
                post_body = this.bodyRender(md);
                this.model.set("content", post_body);
            }
            this.$(".body").html(post_body);
            return this;
        },

        bodyRender: marked.parse,

        // template: function(x){ return x;},

        template: Handlebars.default.compile( $("#post-template").html() ),

        remove: function(){
            $el.remove();
        },

        toggleVisible: function(){
            $el.toggle();
        }
    });

    return PostView;
});