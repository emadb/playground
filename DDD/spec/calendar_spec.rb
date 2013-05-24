# require './lib/calendar/calendar'
# require 'date'

# describe Calendar do
#   before do
#     even_raised = false
#     event_store = []
#     @calendar = Calendar.new(@event_store)
#     @calendar.on_new_appointment do |a|
#       even_raised = true
#     end
#   end

#   it 'fixing a new appointment should raise an event' do
#     @calendar.fix_appointment('this_is_just_a_company_id', Date.today, 2)
#     @even_raised.should be_true
#     @event_store.should have(1).items
#   end


# end
