#!/usr/bin/ruby
class Class1 
  def foo
    puts 'class1'
  end
end

class Class2
  def foo
    puts 'class2'
  end
end


class Executor
  def self.run(clazz)
    clazz.foo
  end
end


Executor.run(Class2.new)

