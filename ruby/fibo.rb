#!/usr/bin/ruby

# def fibo(x)
#   f1 = 1
#   f2 = 1
#   fn = 1
#   [2..x].each do |n|
#     fn = f1 + f2
#     f2 = f1
#     f1 = fn
#     puts "f1=#{f1} f2=#{f2} fn=#{fn}"
#   end
#   fn
# end

def fibo(x)
  @sq5 = Math.sqrt(5)
  @gm = (1 + @sq5) / 2
  @gn = (1 - @sq5) / 2
  return ((@gm**x - @gn**x) / @sq5).to_i
  end

def run
  test_cases = STDIN.gets.to_i
  test_cases.times do |n|
    puts fibo(n)
  end
end

STDIN.gets.to_i.times { run }