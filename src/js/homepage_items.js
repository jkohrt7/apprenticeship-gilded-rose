import { Item, updateItems } from '../inventory/gilded_rose.js';

const getNewItems = () => [
  new Item('+5 Dexterity Vest', 10, 20),
  new Item('Aged Brie', 2, 0),
  new Item('Elixir of the Mongoose', 5, 7),
  new Item('Sulfuras, Hand of Ragnaros', 0, 80),
  new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
  new Item('Conjured Mana Cake', 3, 6),
];

const getItemRowHtml = ({ name, sell_in: sellIn, quality }) => {
  const itemHtml = document.createElement('tr');
  itemHtml.innerHTML += `<td>${name}</td>`;
  itemHtml.innerHTML += `<td>${quality}</td>`;
  itemHtml.innerHTML += `<td>${sellIn}</td>`;
  return itemHtml;
};

const renderItemsOnHomepage = (items) => {
  const elementItemsList = document.querySelector('#items > tbody');
  elementItemsList.innerHTML = null;
  items.forEach((element) => {
    const itemHtml = getItemRowHtml(element);
    elementItemsList.append(itemHtml);
  });
};

const getItemsFromStorage = () => {
  const result = localStorage.getItem('inventory');
  if (result) {
    return JSON.parse(result);
  }
  return getNewItems();
};

const setItemstoStorage = (items) => {
  const stringItems = JSON.stringify(items);
  localStorage.setItem('inventory', stringItems);
};

const bindEventListenToUpdateButton = () => {
  const updateButton = document.getElementById('update-items-button');
  updateButton.addEventListener('click', (e) => {
    e.preventDefault();
    const newItems = updateItems(getItemsFromStorage());
    console.log('Running...');
    renderItemsOnHomepage(newItems);
    setItemstoStorage(newItems);
  });
};

const bindEventListenToResetButton = () => {
  const updateButton = document.getElementById('reset-inventory-button');
  updateButton.addEventListener('click', (e) => {
    e.preventDefault();
    renderItemsOnHomepage(getNewItems());
    setItemstoStorage(getNewItems());
  });
};

const showItemsOnHomePage = () => {
  const items = getNewItems();
  renderItemsOnHomepage(items);
  bindEventListenToUpdateButton(items);
  bindEventListenToResetButton(items);
};

showItemsOnHomePage();
