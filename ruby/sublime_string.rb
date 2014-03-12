#!/usr/bin/ruby

def run
  s1, s2 = STDIN.gets.split ' '
  offset = 0
  s1.each_char do |c|
    index = s2.index(c, offset)
    if (index.nil?)
      puts 'unsublime'
      return
    else
      offset = index + 1
    end
  end
  puts 'sublime'
end

STDIN.gets.to_i.times { run }
