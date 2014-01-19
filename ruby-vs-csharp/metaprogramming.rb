require 'YAML'
config = YAML.load_file("config.yaml")


class Settings
  def initialize(options)
    options.each do |key, value|
      self.instance_variable_set "@#{key}", value
      self.class.send :define_method, key, proc{self.instance_variable_get("@#{key}")}
      self.class.send :define_method, "#{key}=",proc{|value| self.instance_variable_set("@#{key}", value)}
    end
  end
end

c = Settings.new config

p c.title
p c.author
p c.pub_year

c.title = 'the new felix'
p c.title

