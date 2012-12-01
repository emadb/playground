class MyService
  def do_something
    p "i'm doing something very interesting"
  end
end


MyService.class_eval do
  alias :do_something_new :do_something
  
  def do_something
    p "i'm ready to do something"
    do_something_new
    p "i did something interesting, isn't it?"
  end
  
end

service = MyService.new
service.do_something