// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron')
const {remote} = require('electron');
const player = require('./player.js');

openFile = function() {
    ipcRenderer.send('select-folder')
}


updatePlayer()


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

ipcRenderer.on('update-player', (event) => {
    updatePlayer();
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

