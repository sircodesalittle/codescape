var fs = require('fs');


function createPlayer(usrname) {
    var player = {
        username:  usrname,
        pizzaRolls: 0,
        experience: 0
    }
    fs.writeFileSync('player.json', JSON.stringify(player), (err) => {
        if (err) throw err;
        console.log('User data file created.');
    });
}

function getPlayer() {
    var data = fs.readFileSync('player.json', 'utf8')
    return JSON.parse(data);
}

function editPlayer(usr, pr, exp) {
    var player = {
        username: usr,
        pizzaRolls: pr,
        experience: exp
    }
    if (player.experience < 1000)
        player.experience = 1000;
    fs.writeFileSync('player.json', JSON.stringify(player), (err) => {
        if (err) throw err;
        console.log('User data file created.');
    });
}

module.exports = {
    createPlayer: createPlayer,
    getPlayer: getPlayer,
    editPlayer: editPlayer
}