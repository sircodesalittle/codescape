const player = require('./player.js');
const entries = require('./entries.js');


class Experience {
    constructor(type, log, pizzaRolls) {
        this.type = type;
        this.log = log;
        this.pizzaRolls = pizzaRolls;
    }

    static analyzeExp(path) {

        // Get a player and update experience
        var currentPlayer = player.getPlayer();
        var fileEntries = entries.getFileEntries();
        fileEntries.entries.forEach(function(element) {
            if(element.path == path) {
                player.editPlayer(currentPlayer.username, currentPlayer.pizzaRolls + (parseInt(element.currentNumLines) - parseInt(element.previousNumLines))*2,
                currentPlayer.experience + (parseFloat(element.currentScore) - parseFloat(element.previousScore))*100)
            }
        });
    }    
}

module.exports = {
    Experience: Experience
}