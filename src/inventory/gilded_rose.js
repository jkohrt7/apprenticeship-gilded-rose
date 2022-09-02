// Item constructor. DO NOT MODIFY OR THE GOBLIN WILL EAT YOU!
export function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

/*
* Update inventory
* @param {Item[]} items - an array of Items representing the inventory to be updated
* Example usage:

const items = [
  new Item('+5 Dexterity Vest', 10, 20),
  new Item('Aged Brie', 2, 0),
  new Item('Elixir of the Mongoose', 5, 7),
  new Item('Sulfuras, Hand of Ragnaros', 0, 80),
  new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
  new Item('Conjured Mana Cake', 3, 6),
];

updateQuality(items);
*/

const strategies = {
  "Aged Brie": cheeseUpdate,
  "Backstage passes to a TAFKAL80ETC concert": ticketUpdate,
  "Sulfuras, Hand of Ragnaros": legendaryUpdate
}

function defaultUpdate() {

}

function cheeseUpdate() {

}

function ticketUpdate() {

}

function legendaryUpdate() {

}

export function updateQuality(items) {
  //apply the strategy from an object literal with key function pairs.
  let updateFunction;
  
  for (var i = 0; i < items.length; i++) {
    updateFunction = strategies.items[i].name;
    if(updateFunction) {
      updateFunction();
    }
    else {
      defaultUpdate();
    }
  }
}
