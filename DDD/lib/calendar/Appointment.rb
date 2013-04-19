class Appointment
    attr_reader :date, :duration

    def initialize (date, duration)
      @date = date
      @duration = duration
    end
end
