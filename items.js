var fs = require('fs');
const player = require('./player.js');

// Get a JSON file representing the available items
function getItems() {
    var data = fs.readFileSync('items.json', 'utf8')
    return JSON.parse(data);
}

function getItem(key) {
    var items = getItems();
    items.entries.forEach(function(item) {
        if (item.id == key) {
            var currentPlayer = player.getPlayer()
            currentPlayer.pizzaRolls = currentPlayer.pizzaRolls - item.price;
            if (!currentPlayer.itemSlot1)
                player.editPlayer(currentPlayer.username, currentPlayer.pizzaRolls, currentPlayer.experience, item.id, currentPlayer.itemSlot2, currentPlayer.itemSlot3);
            else if (!currentPlayer.itemSlot2)
                player.editPlayer(currentPlayer.username, currentPlayer.pizzaRolls, currentPlayer.experience, currentPlayer.itemSlot1, item.id, currentPlayer.itemSlot3);
            else if (!currentPlayer.itemSlot3)
                player.editPlayer(currentPlayer.username, currentPlayer.pizzaRolls, currentPlayer.experience, currentPlayer.itemSlot1, currentPlayer.itemSlot2, item.id);
            else // TODO -> make this alert the user
                console.log('No item slots available...')
        }
    });
}

function getImage(key) {
    var items = getItems();
    var result = '';
    items.entries.forEach(function(item) {
        if (item.id == key) {
            result = item.image;
        }
    });
    return result;
}

// Gets the entry in the dictionary representing an item
function getItemEntry(key) {
    var items = getItems();
    var result = '';
    items.entries.forEach(function(item) {
        if (item.id == key) {
            result = item;
        }
    });
    return result;
}


// function chargeItem(key) {
//     var item = getItem(key);
//     var currentPlayer = player.getPlayer();
//     console.log(item);
// }

// Make the function usable elsewhere
module.exports = {
    getItems: getItems,
    getItem: getItem,
    getImage: getImage,
    getItemEntry: getItemEntry
}