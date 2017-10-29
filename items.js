var fs = require('fs');

// Get a JSON file representing the available items
function getItems() {
    var data = fs.readFileSync('items.json', 'utf8')
    return JSON.parse(data);
}

// Make the function usable elsewhere
module.exports = {
    getItems: getItems
}