defmodule ModuleName do
  def hello do
    IO.puts "Hello World"
  end
  def fun1(contents) do
    IO.puts contents    
  end
end

ModuleName.hello




case File.read("sample.csv") do
  { :ok, contents }  ->
    ModuleName.fun1(contents)
  { :error, reason } ->
    IO.puts "error"
end