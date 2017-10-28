const player = require('./player.js');


class Experience {
    constructor(type, log, pizzaRolls) {
        this.type = type;
        this.log = log;
        this.pizzaRolls = pizzaRolls;
    }

    static analyzeExp(results) {

        // 1 - This is the first time the file has been monitored
        // 0 - The file has been monitored before
        var first = 0;

        // Log the results from the linter
        if(results.length == 1) {
            first = 1;
            console.log(results[0]);
        }
        if(results.length == 3) {
            first = 0;
            console.log(results[0], results[1], results[2]);
        }

        // Get a player and update experience
        var currentPlayer = player.getPlayer();
        console.log("first: " + first);
        if(first) {
            console.log("SAM" + parseInt(results[0]));
            console.log("SAM" + parseInt(results[2]));
            player.editPlayer(currentPlayer.username, currentPlayer.pizzaRolls, currentPlayer.experience + parseInt(results[0])*100);
        } else {
            console.log("SAM" + parseInt(results[0]));
            console.log("SAM" + parseInt(results[2]));
            player.editPlayer(currentPlayer.username, currentPlayer.pizzaRolls, currentPlayer.experience + parseInt(results[2])*100);
        }
    }    
}

module.exports = {
    Experience: Experience
}