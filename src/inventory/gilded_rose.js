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

const qualityStrategies = {
  "Aged Brie": item => Math.min(50, item.sell_in >=0 ? item.quality + 1 : item.quality + 2),
  "Backstage passes to a TAFKAL80ETC concert": item => Math.min(50,getTicketQuality(item)),
  "Sulfuras, Hand of Ragnaros": item => item.quality,
  "Conjured": item => Math.max(0, item.sell_in >=0 ? (item.quality - 2) : (item.quality - 4)),
  "default": item => Math.max(0,item.sell_in >=0 ? (item.quality - 1) : item.quality - 2)
}

function calcNextSellIn(item) {
  if(item.name != "Sulfuras, Hand of Ragnaros"){
    return item.sell_in - 1;
  }
  return item.sell_in;
}

function calcNextQuality(item) {
  let strategyName;
  if(item.name.startsWith("Conjured")) {
    strategyName = "Conjured"
  }
  else {
    strategyName = item.name;
  }
  let strategy = qualityStrategies[strategyName] || qualityStrategies["default"];
  return strategy(item);
}

//Tickets have enough conditionals to merit a named function
function getTicketQuality(item) {
  if(item.sell_in <= 10 && item.sell_in >=0) {
    return item.quality + 2;
  }
  if(item.sell_in > 10) {
    return item.quality + 1;
  }
  return 0;
}

export function updateItems(items) {
  for (var i = 0; i < items.length; i++) {
    items[i].sell_in = calcNextSellIn(items[i]);
    items[i].quality = calcNextQuality(items[i]); //need clamping
  }
}
