class Cat
  def meow
    'meow'
  end
end

cat = Cat.new
p cat.meow

# adding new method to Cat class
class Cat
  def argh
    'argh'
  end
end

p cat.argh

new_cat = Cat.new
p new_cat.meow
p new_cat.argh

class Cat
  remove_method :meow
end

cat.meow