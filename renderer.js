// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron')
const {remote} = require('electron');
const player = require('./player.js');

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

// TESTING THE NOTIFICATION FUNCTION
notify('Test title', 'Testing the notification method');

// Updates UI player info with most recent player data
function updatePlayer() {
    var currentPlayer = player.getPlayer();
    $('#username').text(currentPlayer.username);
    $('#experience').text(currentPlayer.experience);
    $('#pizzarolls').text(currentPlayer.pizzaRolls);
    console.log(parseInt(currentPlayer.experience) * 100 + '%');
    $('#xpbar').css('width', parseInt(currentPlayer.experience) + '%')
}

// Pushes a notification to the user
function notify(title, body) {
    var options = [
        {
            title: title,
            body: body
        }
    ]
    new Notification(options[0].title, options[0]);
}

ipcRenderer.on('update-player', (event) => {
    updatePlayer();
})

ipcRenderer.on('send-notification', (event, title, msg) => {
    notify(title, msg);
})

ipcRenderer.on('updated-watching-files', (event, arg) => {
    console.log('update called')
    var fileList = $('#watchedFiles');
    fileList.empty();
    var files = remote.getGlobal('watchedFiles');
    for (var key in files) {
        for (index=0; index<files[key].length; index++)
            fileList.append('<li>' + files[key][index] + '</li>');
    } 
});

ipcRenderer.on('notify-change', (event, ext, fileType, type) => {
    console.log(ext, fileType, type);
    console.log($('#dTable tr:last'))
    $('#dTable tr:last').after(`<tr><td>${ext}</td><td>${fileType}</td><td>${type}</td></tr>`);
})

