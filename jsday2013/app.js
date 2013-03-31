Path.map("#hello_world").to(function(){
    $('#root').load('hello_world.html');
});

Path.map("#contacts").to(function(){
    $('#root').load('contacts.html');
});


Path.root("/");

Path.listen();