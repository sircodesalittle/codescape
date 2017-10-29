// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron')
const {remote} = require('electron');
const player = require('./player.js');
const entries = require('./entries.js');

// Options for ways to show notifications
// var options = [
//     {
//         title: "Basic Notification",
//         body: "Short message part"
//     },
//     {
//         title: "Content-Image Notification",
//         body: "Short message plus a custom content image",
//         icon: "Path to png"
//     }
// ]

openFile = function() {
    ipcRenderer.send('select-folder')
}

// Initialize UI values
updatePlayer()
updateFileList()

// TESTING THE NOTIFICATION FUNCTION
// notify('Test title', 'Testing the notification method');

// Updates UI player info with most recent player data
function updatePlayer() {
    var currentPlayer = player.getPlayer();
    var currentLevel = Math.floor(Math.log2(currentPlayer.experience/1000));
    var lowxp = Math.pow(2, currentLevel) * 1000
    var highxp = Math.pow(2, currentLevel+1) * 1000
    
    var num = currentPlayer.experience - lowxp;
    var dem = highxp - lowxp;
    var percentComplete = (num / dem) * 100
    
    $('#level').text('lvl ' + currentLevel);
    $('#username').text(currentPlayer.username);
    $('#pizzarolls').text(currentPlayer.pizzaRolls);
    $('#xpratio').text(num.toString() + "/" + dem.toString()  + " experience")
    console.log(parseInt(currentPlayer.experience) * 100 + '%');
    $('#xpbar').css('width', parseInt(percentComplete) + '%')
}

// Updates the list of watched files
/*
 *
 * THIS FUNCTION NEEDS TO BE MODIFIED SO THAT THE FILES ARE VIEWABLE IN THE UI
 * 
 */
function updateFileList() {
    console.log("DID YOU GET HERE?");
    var currentList = entries.getFileEntries();
    currentList.entries.forEach(function(element) {
        console.log('ELEMENT: ' + element.path);
    });
}

// Pushes a notification to the user
function notifyPlayerUpdate(pizzaRollUpdate, xpUpdate) {
    var options = [
        {
            title: 'CodeScape Player Updates',
            silent: true,
            body: pizzaRollUpdate + ' Pizza Rolls\n' + xpUpdate + ' Experience'
        }
    ]
    new Notification(options[0].title, options[0]);
}

ipcRenderer.on('update-player', (event) => {
    updatePlayer();
    // TESTING TESTING TESTING
    //updateFileList();
})

ipcRenderer.on('send-notification', (event, updatedRolls, updatedXp) => {
    if (updatedRolls == 0 && updatedXp == 0)
        return
    notifyPlayerUpdate(updatedRolls, updatedXp);
})

ipcRenderer.on('updated-watching-files', (event, arg) => {
    console.log('update called')
    var fileList = $('#watchedFiles');
    fileList.empty();
    var files = remote.getGlobal('watchedFiles');
    for (var key in files) {
        for (index=0; index<files[key].length; index++) {
            fileList.append('<li>' + files[key][index] + '</li>');
        }
    } 
});

ipcRenderer.on('notify-change', (event, ext, fileType, type) => {
    console.log(ext, fileType, type);
    console.log($('#dTable tr:last'))
    $('#dTable tr:last').after(`<tr><td>${ext}</td><td>${fileType}</td><td>${type}</td></tr>`);
});

