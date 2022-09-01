import { it } from 'node:test';
import { Item, updateQuality } from './gilded_rose';

describe('`updateQuality`', () => {
  let standardItem;
  let legendaryItem;
  let cheeseItem;
  let ticketItem;

  //'Haunted Shoe' is a generic item and represents default behavior.
  it('deprecates sell_in and quality of standard items by one each update', () => {
    standardItem = new Item('Haunted Shoe', 10, 10);
    updateQuality([standardItem]);
    expect(standardItem.sell_in).toBe(9);
    expect(standardItem.quality).toBe(9);
  });

  //Legendary items' sell_in values should not change and they should not decrease in quality.
  it('does not lower the quality or sell_in of a Hand of Ragnaros', () => {
    legendaryItem = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
    updateQuality([legendaryItem]);
    expect(legendaryItem.quality).toBe(80);
    expect(legendaryItem.sell_in).toBe(80);
  })

  //Aged Brie is meant to increase in quality as sell_in decreases.
  it('increments the quality of aged brie by 1 as sell_in decreases', () => {
    cheeseItem = new Item('Aged Brie', 10, 10);
    updateQuality([cheeseItem]);
    expect(cheeseItem.quality).toBe(11);
  })

  //Tickets go up by 2 quality once sell-in <=10, but their quality is locked 
  //at 0 once sell-in <=0. They are otherwise identical to aged brie.
  it('increments the quality of tickets by 1 while sell-in >10', () => {
    ticketItem = new Item('Backstage passes to a TAFKAL80ETC concert', 15, 10);
    updateQuality([ticketItem]);
    expect(ticketItem.quality).toBe(11);
  })

  it('increments the quality of tickets by 2 while sell-in <=10', () => {
    ticketItem = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10);
    updateQuality([ticketItem]);
    expect(ticketItem.quality).toBe(12);
  })

  it('sets the quality of tickets to 0 when sell-in is 0', () => {
    ticketItem = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10);
    updateQuality([ticketItem]);
    expect(ticketItem.quality).toBe(0);
  })

  //Quality is never a negative value
  it('does not decrement quality below 0 for any item type', () => {
    standardItem = new Item('Haunted Shoe', 0, 0);
    cheeseItem = new Item('Aged Brie', 0, 0);
    ticketItem = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 0);
    legendaryItem = new Item('Sulfuras, Hand of Ragnaros', 0, 0);

    updateQuality([standardItem,cheeseItem,ticketItem,legendaryItem])

    expect(standardItem.quality).toBe(0);
    expect(cheeseItem.quality).toBe(2);
    expect(ticketItem.quality).toBe(0);
    expect(legendaryItem.quality).toBe(0);
  })

  //Quality caps at 50; Initial value can be >50, however.
  it('does not increment quality above 50 for any appreciating items', () => {
    cheeseItem = new Item('Aged Brie', 50, 50);
    ticketItem = new Item('Backstage passes to a TAFKAL80ETC concert', 50, 50);

    updateQuality([cheeseItem,ticketItem])

    expect(cheeseItem.quality).toBe(50);
    expect(ticketItem.quality).toBe(50);
  })

  //Changes in quality double past sell_in date; note that
  //this behavior is overridden for legendary items and tickets
  it('doubles changes in quality when sell_in is <0', () => {
    standardItem = new Item('Haunted Shoe', 0, 10);
    cheeseItem = new Item('Aged Brie', 0, 0);

    updateQuality([standardItem, cheeseItem]);

    expect(standardItem.quality).toBe(8);
    expect(cheeseItem.quality).toBe(2);
  })
});
