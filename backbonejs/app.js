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
=======
MyApp = {
    init: function (){
        console.log('all is up and running');
    }
}

// MODEL

Person = Backbone.Model.extend({
        defaults: {
            name: 'defautl_name'
        },
        initialize: function(){
            this.on("change:name", function(model){
                var name = model.get('name'); 
                console.log("Changed my name to " + name );
            });
        },
        print: function(){
            console.log('print', this.get('name'));
            this.set('name', 'cambio nome');
        }

    });
    
var person = new Person();

// ROUTER

var AppRouter = Backbone.Router.extend({
        routes: {
            "do1/:id": "route1",
            "do2/:id": "route2" 
        }
    });
    // Initiate the router
    var app_router = new AppRouter;

    app_router.on('route:route1', function(actions) {
        console.log('route1');
        console.log(actions);
    });

    app_router.on('route:route2', function(actions) {
        console.log('route2');
        console.log(actions);
    })

    Backbone.history.start();

SearchView = Backbone.View.extend({
    initialize: function(){
        this.render();
        this.model.on('change', this.logChange, this);
    },
    render: function(){
        var template = _.template( $("#search_template").html(), {search: 'ricerca'} );
        this.$el.html( template );
    },
    events: {
        "click input[type=button]": "doSearch"
    },
    doSearch: function( event ){
        this.model.print();
        app_router.navigate('do2/7');
    },
    logChange: function(){
        console.log('something has changed',this.model.get('name'));

    }
});

var search_view = new SearchView({ model: person, el: $("#search_container") });
