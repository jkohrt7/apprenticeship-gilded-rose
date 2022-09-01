import { Item, updateItems } from './gilded_rose';

describe('`updateItems`', () => {
  let standardItem;
  let legendaryItem;
  let cheeseItem;
  let ticketItem;

  //'Haunted Shoe' is a generic item and represents default behavior.
  it('deprecates sell_in and quality of standard items by one each update', () => {
    standardItem = new Item('Haunted Shoe', 10, 10);
    updateItems([standardItem]);
    expect(standardItem.sell_in).toBe(9);
    expect(standardItem.quality).toBe(9);
  });

  it('deprecates the quality of standard items by 2 while sell in is <0', () => {
    standardItem = new Item('Haunted Shoe', 0, 10);
    updateItems([standardItem]);
    expect(standardItem.quality).toBe(8);
  });

  //Legendary items do not have sell by dates or decrease in quality.
  //I am unsure if they are also supposed to have quality >50, as shown here.
  it('does not lower the quality of a Hand of Ragnaros', () => {
    legendaryItem = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
    updateItems([legendaryItem]);
    expect(legendaryItem.quality).toBe(80);
  })

  //Aged Brie is meant to increase in quality as sell by decreases. It 
  //should cap at 50 quality.
  it('increments the quality of aged brie by 1 as sell-in decreases', () => {
    cheeseItem = new Item('Aged Brie', 10, 10);
    updateItems([cheeseItem]);
    expect(cheeseItem.quality).toBe(11);
  })

  it('increments the quality of aged brie by 2 when sell-in <0', () => {
    cheeseItem = new Item('Aged Brie', 0, 10);
    updateItems([cheeseItem]);
    expect(cheeseItem.quality).toBe(12);
  })

  it('cannot increment the quality of aged brie once it is 50', () => {
    cheeseItem = new Item('Aged Brie', 50, 50);
    updateItems([cheeseItem]);
    expect(cheeseItem.quality).toBe(50);
  })

  //Tickets go up by 2 quality once sell-in <=10, but their quality is locked 
  //at 0 once sell-in <=0. They are otherwise identical to aged brie.
  it('increments the quality of tickets by 1 while sell-in >10', () => {
    ticketItem = new Item('Backstage passes to a TAFKAL80ETC concert', 15, 10);
    updateItems([ticketItem]);
    expect(ticketItem.quality).toBe(11);
  })

  it('increments the quality of tickets by 2 while sell-in <=10', () => {
    ticketItem = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10);
    updateItems([ticketItem]);
    expect(ticketItem.quality).toBe(12);
  })

  it('sets the quality of tickets to 0 when sell-in is 0', () => {
    ticketItem = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10);
    updateItems([ticketItem]);
    expect(ticketItem.quality).toBe(0);
  })

  //Quality is never a negative value
  it('does not decrement quality below 0 for any item type', () => {
    standardItem = new Item('Haunted Shoe', 0, 0);
    cheeseItem = new Item('Aged Brie', 0, 0);
    ticketItem = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 0);
    legendaryItem = new Item('Sulfuras, Hand of Ragnaros', 0, 0);

    updateItems([standardItem,cheeseItem,ticketItem,legendaryItem])

    expect(standardItem.quality).toBe(0);
    expect(cheeseItem.quality).toBe(2);
    expect(ticketItem.quality).toBe(0);
    expect(legendaryItem.quality).toBe(0);
  })

});
