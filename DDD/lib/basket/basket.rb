require './lib/basket/basket_item'

class Basket
  
  def initialize
    @items = []
  end

  def items
    @items
  end

  def add_item (item)
    selected_item = get_item(item)
    if selected_item
      selected_item.increase_quantity
    else
      new_item = BasketItem.new(item)
      @items << new_item
    end
  end

  def remove_item (item)
    selected_item = get_item(item)
    selected_item.decrease_quantity
  end

  def item_count
    @items.size
  end

  def empty
    @items.clear
  end

  def total_price
    @items.inject(0) do |sum,x| 
      sum + x.item_price 
    end
  end

  private
  def get_item (item)
    selected_items = @items.select{|i| i.item == item}
    selected_items[0] if selected_items.size == 1
  end
end

class Article
  attr_reader :id, :price
  def initialize (id, price)
    @id = id
    @price = price
  end
end
