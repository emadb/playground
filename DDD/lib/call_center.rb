Dir["./lib/*.rb"].each {|file| require file }

class CallCenter
  def self.new_session
    operator_finder = OperatorFinder.new
    CallSession.new(operator_finder.get_one)
  end
end

