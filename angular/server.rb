require 'sinatra'
require 'json'

  helpers do
    CONTENT_TYPES = {:json => 'application/json', :xml => 'text/xml'}

    def validate_key (key)
      error 401 unless key == 'rubyrocks'
    end
  end


  before do
    @todos = [
      {id: 1, name: 'ema'},
      {id: 2, name: 'lory'},
      {id: 3, name: 'tessa'},
    ]

    content_type CONTENT_TYPES[:json]
    
    #validate_key env['X_AUTH_KEY']
  end

  get '/todos' do
    @todos.to_json
  end

  get '/todos/:id' do
    todo = @todos[:id]
    todo.to_json
  end

