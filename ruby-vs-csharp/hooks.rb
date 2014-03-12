
class StrategyFactory
  @classes = {}
  def self.add_class(clazz)
    @classes[clazz.name] = clazz
  end
  def self.get_strategy(name)
    @classes[name].new
  end
end


class BaseStrategy
  def self.inherited(subclass)
    StrategyFactory.add_class(subclass)
  end
end

class Strategy1 < BaseStrategy
  def do_something
    "I'm the Strategy1"
  end
end

class Strategy2 < BaseStrategy
  def do_something
    "I'm the Strategy2"
  end
end

strategy = StrategyFactory.get_strategy ('Strategy2')
p strategy.do_something