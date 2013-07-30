# https://www.hackerrank.com/challenges/meeting-point

class Point < Struct.new(:x, :y); end


class MeetingPoint
  def evaluate(map)
    x, y = 0, 0
    count = 0.0

    map.each do |p|
      count = count + 1
      x = x + p.x
      y = y + p.y
    end

    puts "x: #{x} / #{count} = #{x/count} #{(x/count).round}"
    puts "y: #{y} / #{count} = #{y/count} #{(y/count).round}"

    x = (x/count).round
    y = (y/count).round

    d = 0
    map.each do |p|
      dx2 = (x - p.x) * (x - p.x)
      dy2 = (y - p.y) * (y - p.y)
      puts "sqrt(#{dx2} + #{dy2}) = " + Math.sqrt(dx2 + dy2).to_s
      d = d + Math.sqrt(dx2 + dy2).floor
    end
    
    d

  end
end
=begin
(0,1)
2-0 * 2-0 = 4
2-1 * 2-1 = 1
sqrt(5) = 2,23 2

(2,5)
2-2 * 2-2 = 0
2-5 * 2-5 = 9
sqrt(9) = 2    3

(3,1)
2-3 * 2-3 = 1
2-1 * 2-1 = 1
sqrt(2) = 1,4  1

(4,0) - (2,2)
2-4 * 2-4 = 4
2-0 * 2-0 = 4
sqrt(8) = 2,8  3
=end