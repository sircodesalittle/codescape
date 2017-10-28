var fs = require('fs');


// let instance = null;

// class Player{  
//     constructor(username, pizzaRolls, experience) {
//         if(!instance){
//               instance = this;
//         }
//         this.username = username;
//         this.pizzaRolls = pizzaRolls;
//         this.experience = experience;
//         fs.stat('player.json', function(err, stat) {
//             if(err == null) {
//                 console.log('File exists');
//                 fs.readFile('player.json', 'utf8', function (err, data) {
//                     if (err) throw err; // we'll not consider error handling for now
//                     var obj = JSON.parse(data);
//                     // player = new Player(obj.username, obj.pizzaRolls, obj.experience);
//                     console.log(obj);
//                     console.log(instance);
//                     instance.experience = obj.experience;
//                     instance.pizzaRolls = obj.pizzaRolls;
//                     instance.username = obj.username;
//                     console.log(obj);
//                     console.log(instance);
//                 });
//             }
//         });
//         return instance;
//       }

//     toJSON() {
//         return {
//             username: this.username,
//             pizzaRolls: this.pizzaRolls,
//             experience: this.experience
//         }
//     }

//     savePlayer() {
//         fs.writeFile('player.json', JSON.stringify(this), (err) => {
//             if (err) throw err;
//             console.log('Player data saved.');
//           });
//     }
// }

// module.exports = {
//     Player: Player
// }


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