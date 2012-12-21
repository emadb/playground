
// MODEL
Socio = Backbone.Model.extend({
     defaults: function() {
      return {
        name: 'this is the name',
        title: 'Mister'
      };
    },
    initialize: function (){
        
    }
});

SocioCollection = Backbone.Collection.extend({
    model: Socio,
    initialize: function(){
        this.collection
    }
});


MainView = Backbone.View.extend({
    initialize: function(){
        var view = new SocioView({model: new Socio({name:'ema'})});
        this.$el.append(view.render().el);
        this.render();
    },

    render: function(){
        
    },
    events: {
        "click #addNew": "addNew"
    },
    addNew: function( event ){
        var view = new SocioView({model: new Socio()});
        this.$el.append(view.render().el);
    }
});

SocioCollectionView = Backbone.View.extend({
    tagName: 'ul',
    render: function(){
        this.collection.each(function(item){
            var socioView = new Socio({model: item}).render();
            $(this.el).append(socioView.el);
        });
    }
});

SocioView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#socio-template').html()),
    initialize: function(){
        this.render();
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var search_view = new MainView({el: $('#container'), collection: new SocioCollection()});
search_view.initialize();