const player = require('./player.js');


class Experience {
    constructor(type, log, pizzaRolls) {
        this.type = type;
        this.log = log;
        this.pizzaRolls = pizzaRolls;
    }

    static analyzeExp(results) {
        console.log(results[0], results[1], results[2]);
        var currentPlayer = player.getPlayer();
        player.editPlayer(currentPlayer.username, currentPlayer.pizzaRolls, currentPlayer.experience + parseInt(results[0]))
    }    
}

module.exports = {
    Experience: Experience
}