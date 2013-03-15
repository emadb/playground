square_number = Proc.new { |n| n * n }
l = lambda { "I'm a lambda" }

class Array
  def map!(proc_object)
    self.each_with_index do |value, index|
      self[index] = proc_object.call(value)
    end
  end
end



numbers = [1,2,3,4]

numbers.map! square_number

p square_number.call(2)
p numbers

p l.call