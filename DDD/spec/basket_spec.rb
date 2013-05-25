# 2 contesti: carrello e magazzino
# CARRELLO
# - applica coupon sconto
# - scegli tipo spedizione
# - gestione dei bundle (se hai comprato A e compri B ottieni uno sconto)
# - effettua checkout
#   - inserisci indirizzo spedizione
#   - inserisci indirizzo fatturazione
#   - effettua pagamento
#   - genera ordine
#
require './lib/basket/basket'
require './lib/basket/article'

describe Basket do
  before do
    @basket = Basket.new
    @item_one = Article.new('one', 5.00)
    @item_two = Article.new('two', 10.00)
  end

  it 'should be possible to add a new item and count should raise' do
    @basket.add_item(@item_one)

    expect(@basket.item_count).to eq(1)
  end

  it 'does not change size if I add the same item twice' do
    @basket.add_item(@item_one)
    @basket.add_item(@item_one)

    expect(@basket.item_count).to eq(1)
  end

  it 'should increase quantity if I add the same item twice' do
    @basket.add_item(@item_one)
    @basket.add_item(@item_one)

    expect(@basket.items[0].quantity).to eq(2)
  end


  it 'should decrease quantity if I remove an item that is in the basket' do
    @basket.add_item(@item_one)
    @basket.remove_item(@item_one)

    expect(@basket.items[0].quantity).to eq(0)
  end

  it 'should decrease quantity if I remove an item that is in the basket' do
    @basket.add_item(@item_one)
    @basket.add_item(@item_one)
    @basket.remove_item(@item_one)

    expect(@basket.items[0].quantity).to eq(1)
  end

  it 'should empty the basket' do
    @basket.add_item(@item_one)
    @basket.add_item(@item_two)
    @basket.empty

    expect(@basket.item_count).to eq(0)
  end

  it 'with one item should return the total items price' do
    @basket.add_item(@item_one)

    expect(@basket.total_price).to eq(5.00)
  end

  it 'with two items should return the total items price' do
    @basket.add_item(@item_one)
    @basket.add_item(@item_two)

    expect(@basket.total_price).to eq(15.00)
  end

  it 'with three items should return the total items price' do
    @basket.add_item(@item_one)
    @basket.add_item(@item_one)
    @basket.add_item(@item_two)

    expect(@basket.total_price).to eq(20.00)
  end


end


#
# MAGAZZINO
# - accoda ordine per processarlo
# - scarica articolo dal magazzino
# - carica nuovo articolo in magazzino
#
#
#
#
#




