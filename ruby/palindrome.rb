#!/usr/bin/ruby

def run
  input = STDIN.gets
  i = 0
  j = input.length-2
  match = true
  while match and i < j
    match = input[i] == input[j]
    i = i+1
    j = j-1
  end
  result = match ? "Y": "N"
  puts result
end

STDIN.gets.to_i.times { run }