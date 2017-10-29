var fs = require('fs');


function createPlayer(usrname) {
    var player = {
        username:  usrname,
        pizzaRolls: 0,
        experience: 0,
        itemSlot1: null,
        itemSlot2: null,
        itemSlot3: null
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

function editPlayer(usr, pr, exp, i1, i2, i3) {
    var player = {
        username: usr,
        pizzaRolls: pr,
        experience: exp,
        itemSlot1: i1,
        itemSlot2: i2,
        itemSlot3: i3
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