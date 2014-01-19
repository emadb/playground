class Type1
  def foo
    "I'm type1"
  end
end

class Type2
  def foo
    "I'm type2"
  end
end

def get_instance
  rand(2) == 0 ? Type1.new : Type2.new
end


t = get_instance
p t.foo