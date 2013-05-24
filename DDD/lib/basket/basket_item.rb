class BasketItem
  attr_accessor :item, :quantity
  
  def initialize (item)
    @item = item
    @quantity = 1
  end

  def increase_quantity
    @quantity = @quantity + 1
  end

  def decrease_quantity
    @quantity = @quantity - 1
  end

  def item_price
    @item.price
  end

  def item_id
    @item.id
  end
end