class Time1 < Time

end

class Time2 < Time1
  def +(t)
    t = super(t)
  end
end



t = Time2.now
r = t + 3600 # adding 1 hour
puts r.class