const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const moment = require('moment');

const fs = require('fs');
const dialog = electron.dialog;
const glob = require('glob');
const exif = require('exiftool');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  //initialize();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function parseDate(date) {
  var m = null;

  if (date instanceof Date) {
    m = moment(date);
  }
  else {
    m = moment(date, 'YYYY:MM:DD HH:mm:ss');
  }

  return m.format('YYYY-MM-DD-HH[h]mm[m]ss');
}

function getFileName(extension, date, counter) {

  var counterText = '';

  if (counter == null || counter === 0) {
    counterText = '';
  }
  else {
    counterText = '-' + counter;
  }

  const fileName = parseDate(date);
  const targetFilename = fileName + counterText + extension;

  return targetFilename;
}

const openFile = function openFile() {

  dialog.showOpenDialog({
    title: "Select a folder",
    properties: ["openDirectory"]
  }, (folderPaths) => {
    // folderPaths is an array that contains all the selected paths
    if (folderPaths === undefined) {
      console.log("No destination folder selected");
      return;
    } else {

      console.log(folderPaths);

      //var filteredPath = path.join(folderPaths[0], '*.{mp4,MP4}');
      var filteredPath = path.join(folderPaths[0], '*.{mp4,MP4,mov,MOV}');
      filteredPath = path.normalize(filteredPath);
      console.log(filteredPath);

      // options is optional
      glob(filteredPath, { nodir: true }, function (er, files) {

        console.log(files);
        const EMPTY_DATE = '0000:00:00 00:00:00';
        var invalidFiles = [];

        files.forEach(function (file) {

          // Read one and one file for now, look into multi-reads later on.
          fs.readFile(file, function (err, data) {
            if (err)
              throw err;
            else {
              exif.metadata(data, function (err, metadata) {
                if (err) {
                  throw err;
                }
                else {

                  const stats = fs.statSync(file);

                  var creationDate = null;

                  console.log(metadata);

                  if (metadata.createDate && metadata.createDate !== EMPTY_DATE) {
                    creationDate = metadata.createDate;
                  }
                  else if (metadata.mediaCreateDate && metadata.mediaCreateDate !== EMPTY_DATE) {
                    creationDate = metadata.mediaCreateDate;
                  }
                  else if (metadata.trackCreateDate && metadata.trackCreateDate !== EMPTY_DATE) {
                    creationDate = metadata.trackCreateDate;
                  }

                  if (creationDate === null) {
                    const stats = fs.statSync(file);
                    console.log(stats);
                    creationDate = stats.mtime;
                  }

                  const fileInfo = path.parse(file);

                  var targetFilename = getFileName(fileInfo.ext, creationDate, 0);
                  var targetPath = path.join(fileInfo.dir, targetFilename);

                  // If the base name of source file does not contain the targetFileName, we can rename.
                  // If rename have already happened, and there was duplicates, the .base could be "file-1.mp4", hence the indexOf check and not equals.
                  if (fileInfo.base.indexOf(targetFilename) === -1) {

                    if (fs.existsSync(targetPath)) {

                      // TODO: Refactor and implement a loop to find available filename.
                      targetFilename = getFileName(fileInfo.ext, creationDate, 1);
                      targetPath = path.join(fileInfo.dir, targetFilename);
                      fs.renameSync(file, targetPath);

                    }
                    else {
                      //console.log(targetPath);
                      fs.renameSync(file, targetPath);

                      console.log('File: ' + file);
                      console.log('Renamed: ' + targetPath);
                    }
                  }
                  else {
                    console.log('File skipped, already renamed.');
                  }
                }
              });
            }
          });

        });
      })
    }
  });
}

exports.openFile = openFile;