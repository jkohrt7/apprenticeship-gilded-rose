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

/* Limits quality to values between 0 and 50 */
function limitQuality(quality) {
  if(quality < 0) {
    return 0;
  }
  else if (quality > 50) {
    return 50;
  }
  return quality;
}

//Helper function that  
function getQualityModifier(sell_in) {
  if (sell_in < 0) {
    return 2;
  }
  return 1;
}

export function updateItems(items) {
  const specialItems = ['Aged Brie', 
                        'Backstage passes to a TAFKAL80ETC concert', 
                        'Sulfuras, Hand of Ragnaros']

  let oldItemModifier;
  
  //Check each item in inventory
  for (var i = 0; i < items.length; i++) {
    //Items with sell_in < 0 have all their quality changes doubled.
    items[i].sell_in -= 1;
    oldItemModifier = getQualityModifier(items[i].sell_in);

    //Standard item; drops in sell-in and quality.
    if(!specialItems.includes(items[i].name)){
      items[i].quality -= 1 * oldItemModifier;
      items[i].quality = limitQuality(items[i].quality)
      
    }

    //Cheese item; gains quality over time
    else if(items[i].name == 'Aged Brie') {
      items[i].quality += 1 * oldItemModifier;
      items[i].quality = limitQuality(items[i].quality);
    }

    //ticket item; has 2 unique modifiers for quality
    else if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
      if(items[i].sell_in < 0) {
        items[i].quality = 0;
        oldItemModifier = 0;
      }
      else if (items[i].sell_in <= 10) {
        oldItemModifier = 2;
      }
      items[i].quality += 1 * oldItemModifier;
      items[i].quality = limitQuality(items[i].quality);
    }
    else {
      console.log(items[i].name)
    }
  }
}
