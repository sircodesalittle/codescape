const player = require('./player.js');
const entries = require('./entries.js');
const items = require('./items.js');


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
                var multiplier = 1;
                if(currentPlayer.itemSlot1 != null) multiplier *= items.getItemEntry(currentPlayer.itemSlot1).multiplier;
                if(currentPlayer.itemSlot2 != null) multiplier *= items.getItemEntry(currentPlayer.itemSlot2).multiplier;
                if(currentPlayer.itemSlot3 != null) multiplier *= items.getItemEntry(currentPlayer.itemSlot3).multiplier;
                if (rolls > 0) {
                    player.editPlayer(currentPlayer.username, currentPlayer.pizzaRolls + rolls, currentPlayer.experience + 
                        parseInt((parseFloat(element.currentScore) - parseFloat(element.previousScore))*100)*multiplier, currentPlayer.itemSlot1, currentPlayer.itemSlot2, currentPlayer.itemSlot3);
                } else {
                    player.editPlayer(currentPlayer.username, currentPlayer.pizzaRolls, currentPlayer.experience + 
                        parseInt((parseFloat(element.currentScore) - parseFloat(element.previousScore))*100)*multiplier, currentPlayer.itemSlot1, currentPlayer.itemSlot2, currentPlayer.itemSlot3);
                }
            }
        });
        return {old: currentPlayer, new: player.getPlayer()};
    }    
}

module.exports = {
    Experience: Experience
}