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
                var rolls = (parseInt(element.currentNumLines) - parseInt(element.previousNumLines))*2
                if (rolls > 0) 
                    player.editPlayer(currentPlayer.username, currentPlayer.pizzaRolls + rolls, currentPlayer.experience + (parseFloat(element.currentScore) - parseFloat(element.previousScore))*100);
                else
                    player.editPlayer(currentPlayer.username, currentPlayer.pizzaRolls, currentPlayer.experience + (parseFloat(element.currentScore) - parseFloat(element.previousScore))*100);
            }
        });
        return {old: currentPlayer, new: player.getPlayer()};
    }    
}

module.exports = {
    Experience: Experience
}