var fs = require('fs');

// Get a JSON file representing the available items
function getFileEntries() {
    var data = fs.readFileSync('entries.json', 'utf8')
    return JSON.parse(data);
}

// Make the function usable elsewhere
module.exports = {
    getFileEntries: getFileEntries
}