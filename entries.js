var fs = require('fs');
//var exec = require('child_process').exec;

function createFileEntry(path, newScore, newNumLines, currentEntries) {
    var file = {
        path: path,
        previousScore: 0,
        currentScore: newScore,
        previousNumLines: 0,
        currentNumLines: newNumLines
    }
    currentEntries.entries.push(file);
}

function getFileEntries() {
    var data = fs.readFileSync('entries.json', 'utf8')
    return JSON.parse(data);
}

function editFileEntries(path, newScore, newNumLines) {
    var currentEntries = getFileEntries();
    var newEntry = true;
    
    console.log(currentEntries);

    currentEntries.entries.forEach(function(element) {
        if(element.path == path) {
            newEntry = false;
            element.previousScore = element.currentScore,
            element.currentScore = newScore,
            element.previousNumLines = element.currentNumLines,
            element.currentNumLines = newNumLines
        }
    });

    if(newEntry) {
        createFileEntry(path, newScore, newNumLines, currentEntries);
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