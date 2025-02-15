import { Item, updateItems } from './gilded_rose';

describe('`updateItems`', () => {
  // 'Haunted Shoe' is a generic item and represents default behavior.
  it('deprecates the sell in by one for a Haunted Shoe', () => {
    const standardItem = new Item('Haunted Shoe', 10, 10);
    const newItem = updateItems([standardItem])[0];
    expect(newItem.sell_in).toBe(9);
  });

  it('deprecates the quality by one for a Haunted Shoe while sell in is >=0', () => {
    const standardItem = new Item('Haunted Shoe', 10, 10);
    const newItem = updateItems([standardItem])[0];
    expect(newItem.quality).toBe(9);
  });

  it('deprecates the quality by 2 for a Haunted Shoe while sell in is <0', () => {
    const standardItem = new Item('Haunted Shoe', 0, 10);
    const newItem = updateItems([standardItem])[0];
    expect(newItem.quality).toBe(8);
  });

  it('does not lower quality of a Haunted Shoe below 0', () => {
    const standardItem = new Item('Haunted Shoe', 10, 0);
    const newItem = updateItems([standardItem])[0];
    expect(newItem.quality).toBe(0);
  });

  // Legendary items do not have sell by dates or decrease in quality.
  // I am unsure if they are also supposed to have quality >50, as shown here.
  it('does not lower the quality of a Hand of Ragnaros', () => {
    const legendaryItem = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
    const newItem = updateItems([legendaryItem])[0];
    expect(newItem.quality).toBe(80);
  });

  it('does not lower the sell_in of a Hand of Ragnaros', () => {
    const legendaryItem = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
    const newItem = updateItems([legendaryItem])[0];
    expect(newItem.sell_in).toBe(0);
  });

  // Aged Brie is meant to increase in quality as sell by decreases. It
  // should cap at 50 quality.
  it('increments the quality of aged brie by 1 as sell-in decreases', () => {
    const cheeseItem = new Item('Aged Brie', 10, 10);
    const newItem = updateItems([cheeseItem])[0];
    expect(newItem.quality).toBe(11);
  });

  it('increments the quality of aged brie by 2 when sell-in <0', () => {
    const cheeseItem = new Item('Aged Brie', 0, 10);
    const newItem = updateItems([cheeseItem])[0];
    expect(newItem.quality).toBe(12);
  });

  it('cannot increment the quality of aged brie once it is 50', () => {
    const cheeseItem = new Item('Aged Brie', 50, 50);
    const newItem = updateItems([cheeseItem])[0];
    expect(newItem.quality).toBe(50);
  });

  // Tickets go up by 2 quality once sell-in <=10, but their quality is locked
  // at 0 once sell-in <=0. They are otherwise identical to aged brie.
  it('increments the quality of tickets by 1 while sell-in >10', () => {
    const ticketItem = new Item('Backstage passes to a TAFKAL80ETC concert', 15, 10);
    const newItem = updateItems([ticketItem])[0];
    expect(newItem.quality).toBe(11);
  });

  it('increments the quality of tickets by 2 while sell-in <=10', () => {
    const ticketItem = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10);
    const newItem = updateItems([ticketItem])[0];
    expect(newItem.quality).toBe(12);
  });

  it('sets the quality of tickets to 0 when sell-in is 0', () => {
    const ticketItem = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10);
    const newItem = updateItems([ticketItem])[0];
    expect(newItem.quality).toBe(0);
  });

  it('does not change the quality of tickets after sell-in drops below 0', () => {
    const ticketItem = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10);
    updateItems([ticketItem]);
    const newItem = updateItems([ticketItem])[0];
    expect(newItem.quality).toBe(0);
  });

  // The Conjured Mana Cake decreases in quality twice as fast as other items
  it('decreases conjured item quality by 2 when sell_in >= 0', () => {
    const conjuredItem = new Item('Conjured Mana Cake', 10, 10);
    const newItem = updateItems([conjuredItem])[0];
    expect(newItem.quality).toBe(8);
  });

  it('decreases the quality of a conjured item"s quality by 4 when sell_in < 0', () => {
    const conjuredItem = new Item('Conjured Mana Cake', 0, 10);
    const newItem = updateItems([conjuredItem])[0];
    expect(newItem.quality).toBe(6);
  });

  it('cannot decrement the quality of a conjured item below 0', () => {
    const conjuredItem = new Item('Conjured Mana Cake', 0, 0);
    const newItem = updateItems([conjuredItem])[0];
    expect(newItem.quality).toBe(0);
  });
});
