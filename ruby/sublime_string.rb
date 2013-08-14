#!/usr/bin/ruby

def run
  s1, s2 = STDIN.gets.split ' '

  s1.each_char do |c|
    index = s2.index(c)
    if (index.nil?)
      puts 'unsublime'
      return
    else
      s2 = s2[index+1..-1]
    end
  end
  puts 'sublime'
end

STDIN.gets.to_i.times { run }
