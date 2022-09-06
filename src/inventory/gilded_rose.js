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
  "Sulfuras, Hand of Ragnaros": legendaryUpdate,
  "Conjured": conjuredUpdate
}

function defaultUpdate(item) {
  let newItem = item; //TODO: hard copy instead? Omit?
  newItem.sell_in -=1;
  newItem.quality -=1;

  if(newItem.sell_in < 0) newItem.quality -= 1;
  if(newItem.quality < 0) newItem.quality = 0;

  return newItem;
}

function cheeseUpdate(item) {
  let newItem = item;
  newItem.sell_in -=1;
  newItem.quality +=1;

  if(newItem.sell_in < 0) newItem.quality += 1;
  if(newItem.quality > 50) newItem.quality = 50;

  return newItem;
}

function ticketUpdate(item) {
  let newItem = item;
  newItem.sell_in -=1;
  newItem.quality +=1;

  if(newItem.sell_in <= 10) newItem.quality += 1;
  if(newItem.sell_in < 0) newItem.quality = 0;
  if(newItem.quality > 50) newItem.quality = 50;

  return newItem;
}

function legendaryUpdate(item) {
  //currently, legendary items should not change.
  return item;
}

//WIP...conjured items mess up the strategy pattern.
function conjuredUpdate(item) {
  let newItem = item;
  newItem.sell_in -=1;
  newItem.quality -=2;

  if(newItem.sell_in < 0) newItem.quality -= 2;
  if(newItem.quality < 0) newItem.quality = 0;

  return newItem;
}

export function updateItems(items) {
  let updateFunction;
  let strategyName;

  for (var i = 0; i < items.length; i++) {
    //Ugly temp code for passing tests.
    //Maybe a 'getStrategy' function to futureproof?
    strategyName = (items[i].name.startsWith("Conjured") ? "Conjured" : items[i].name);
    //Below is what I had before "conjured"
    updateFunction = strategies[strategyName] || defaultUpdate;
    items[i] = updateFunction(items[i])
  }
}
