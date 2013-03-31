 Path.map("#hello_world").to(function(){
    $('#root').load('hello_world.html');
});

Path.root("/");

Path.listen();