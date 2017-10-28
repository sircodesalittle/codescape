var fs = require('fs');

function createFileEntry(path, newScore, currentEntries) {
    var file = {
        path: path,
        previousScore: 0,
        currentScore: newScore
    }
    currentEntries.entries.push(file);
}

function getFileEntries() {
    var data = fs.readFileSync('entries.json', 'utf8')
    return JSON.parse(data);
}

function editFileEntries(path, newScore) {
    var currentEntries = getFileEntries();
    var newEntry = true;
    
    console.log(currentEntries);

    currentEntries.entries.forEach(function(element) {
        if(element.path == path) {
            newEntry = false;
            element.previousScore = element.currentScore,
            element.currentScore = newScore
        }
    });

    if(newEntry) {
        createFileEntry(path, newScore, currentEntries);
    }

    console.log(currentEntries);
    
    fs.writeFileSync('entries.json', JSON.stringify(currentEntries), (err) => {
        if (err) throw err;
        console.log('Entry data for file modified.');
    });
}

module.exports = {
    createFileEntry: createFileEntry,
    getFileEntries: getFileEntries,
    editFileEntries: editFileEntries
}