const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const nativeImage = require('electron').nativeImage

const path = require('path')
const url = require('url')

const monitor = require('./codescape_monitor.js');
const player = require('./player.js')
const entries = require('./entries.js');
let watcher

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 725, height: 400, backgroundColor: '#2e2c29'})
  // mainWindow.setIcon(nativeImage.createFromPath(__dirname, 'images/icon64.png')); // This isnt working...
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  //---------------------------------------------------------------mycode
  watcher = monitor.initWatcher(mainWindow)

  const {ipcMain} = require('electron')

  global.watchedFiles = [] 

  const {dialog} = require('electron');


  watcher.on('add', (event, arg) => {
    global.watchedFiles = watcher.getWatched();
    mainWindow.webContents.send('updated-watching-files')
  })

  // When the program starts, watch all of the paths in the entries JSON file
  var paths = entries.getFileEntries();
  paths.entries.forEach(function(element) {
    watcher.add(element.path);
  });

  // The player made a purchase in the store and was updated
  ipcMain.on('notify-store-main', (event) => {
    console.log('notified about store in main')
    mainWindow.webContents.send('notify-store');
  })

  // When the user wants to monitor more files
  ipcMain.on('select-folder', (event, arg) => {
    // Show the file select dialog
    dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections']}, function(selection) {
      console.log('SELECTION: ' + selection);
      watcher.add(selection);
      // setTimeout(function() {
      //   console.log(watcher);
      //   console.log('THIS IS A LIST OF THE EXTENSIONS FOUND:');
      //   var files = watcher._closers;
      //   for(var key in files) {
      //     var re = /(?:\.([^.]+))?$/;
      //     var ext = re.exec(key)[1];
      //     console.log(ext);
      //     if(ext != 'py') {
      //       delete watcher._closers[key];
      //     }
      //   }
      //   global.watchedFiles = watcher.getWatched();
      //   mainWindow.webContents.send('updated-watching-files');
      //   console.log(watcher);
      // }, 2000);
    });
    // watcher.add('test_files/')
  });

  //---------------------------------------------------------------mycode
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})






