ko.bindingHandlers.customText = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here
        console.log('init', element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever the associated observable changes value.
        // Update the DOM element based on the supplied values here.
        console.log('update', element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    }
};

function MainViewModel(username, password) {
    var self = this;
    self.username = ko.observable(username);
    self.password = ko.observable(password);
    self.result = ko.computed(function(){
        return self.username + self.password;
    })
    self.items = ko.observableArray([]);
    self.add = function(){
        var item = new ItemViewModel(self.username());
        self.items.push(item);
    }
}

function ItemViewModel(text){
    var self = this;
    self.itemText = text;
}

ko.applyBindings(new MainViewModel('uno', 'due'));