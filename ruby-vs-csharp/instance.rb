class Cat
  def meow
    'meow'
  end
end

cat = Cat.new
new_cat = Cat.new

def cat.argh
  'argh'
end

p cat.meow
p cat.argh
p new_cat.meow
p new_cat.argh