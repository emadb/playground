class Calendar

  def initialize event_store
    @event_store = event_store
    @appointments = []
  end


  def on_new_appointment &callback
    @callback = callback
  end

  def fix_appointment company_id, date, duration
    appointment = Appointment.new(date, duration)
    @callback.call appointment unless @callback.nil?
    @appointments << appointment
    @event_store << {company_id: company_id, date: date, duration: duration}
  end
end

