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