class Cat 
  def meow
    p "meow" 
  end 
end

cat = Cat.new
cat.meow

Cat.class_eval do 
  alias :meow_new :meow
  def meow
    p "i'm about to meow"
    meow_new
    p "did you hear me?"
  end 
end

cat.meow