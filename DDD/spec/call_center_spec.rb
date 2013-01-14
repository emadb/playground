require './lib/call_center'

describe CallCenter do
  before do
    of_mock = double(OperatorFinder)
    of_mock.stub!(:get_one) {Operator.new(2)}
    of_mock.stub!(:new) {of_mock}
    OperatorFinder = of_mock

    @session = CallCenter.new_session()
  end

  it 'should be able to create a new session' do
      @session.should_not be_nil
  end

  it 'should have a valid operator' do
      @session.operator.id.should eql(2)
  end

  it 'should have zero calls' do
      @session.calls.should be_empty
  end

  describe 'start' do
    it 'should place a new call' do
      @session.start(company)
    end
  end

end