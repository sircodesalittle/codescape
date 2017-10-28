var chokidar = require('chokidar');
var path = require('path')
var extJson = require('./extensions.json')
const { exec } = require('child_process');
const {Experience} = require('./experience.js')
const { Notificaton } = require('electron');
const entries = require('./entries.js');
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow


function initWatcher(mainWindow) {
  var watcher = chokidar.watch('.codescape_monitor.js', {
    ignored: [/(^|[\/\\])\../, '*/node_modules/*'],
    persistent: true
  });

  // Something to use when events are received.
  var log = console.log.bind(console);

  // for (var key in extJson['languageIds']) {
  //   log('"' + extJson['languageIds'][key]  + '": "' + key + '",')
  // }

  // Add event listeners.
  watcher 
    // .on('add', path => log(`File ${path} has been added`))
    .on('change', path => {
      var ext = path.split('.').pop();
      log(ext)
      var fileType = extJson['fileExtensions'][ext]
      log(fileType);
      var type = extJson['languageIds'][fileType]
      log(type)
      mainWindow.webContents.send('notify-change', ext, fileType, type)
      
      exec('python score.py ' + path + ' .pylintrc', (error, stdout, stdin) => {
        // TODO -> handle if error isnt empty
        console.log("STDOUT FROM PYTHON SCRIPT:\n" + stdout);
        results = stdout.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; });

        var wcReturn = require('child_process').execSync('wc -l ' + path).toString();
        var num = parseInt(wcReturn.match(/\d+/)[0]);

        entries.editFileEntries(path, results[0], num);
        Experience.analyzeExp(path);
        
        // new Notification('Title', {
        //   body: 'Lorem Ipsum Dolor Sit Amet'
        // });

        mainWindow.webContents.send('send-notification', 'Titly Title', 'MASSAGE');
        mainWindow.webContents.send('update-player');
      });
    })
    .on('unlink', path => log(`File ${path} has been removed`));

  // More possible events.
  watcher
    .on('addDir', path => log(`Directory ${path} has been added`))
    .on('unlinkDir', path => log(`Directory ${path} has been removed`))
    .on('error', error => log(`Watcher error: ${error}`))
    .on('ready', () => log('Initial scan complete. Ready for changes'))
    .on('raw', (event, path, details) => {
      log('Raw event info:', event, path, details);
    });
  return watcher;
}

module.exports = {
  initWatcher: initWatcher
}