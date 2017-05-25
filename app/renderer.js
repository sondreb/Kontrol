// var remote = require('remote'); // Load remote compnent that contains the dialog dependency
// var dialog = remote.require('dialog'); // Load the dialogs component of the OS
var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)

var app = require('electron').remote;
var dialog = app.dialog;

var path = require('path');
var glob = require('glob');

const electron = require('electron');
//const ipc = electron.ipcRenderer;
//var ipc = require('ipc');

// In renderer process (web page).
const {ipcRenderer} = require('electron')

//console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//   console.log(arg) // prints "pong"
// })

const remote = electron.remote;
const mainProcess = remote.require('./main');

const $ = require('jquery');

// ipc.on('file-opened', function (event, file, content) {
//     console.log(content);
// });

//const $markdownView = $('.raw-markdown');
//const $htmlView = $('.rendered-html');
const $openFileButton = $('#openFolder');
const $exitButton = $('#exit-button');
//const $saveFileButton = $('#save-file');
//const $copyHtmlButton = $('#copy-html');

$openFileButton.on('click', () => {
  mainProcess.openFile();
});

$exitButton.on('click', () => {
  ipcRenderer.send('close-main-window', 'ok');
  console.log('Message sent!!');
});


// function fromDir(startPath, filter) {

//     //console.log('Starting from dir '+startPath+'/');

//     if (!fs.existsSync(startPath)) {
//         console.log("no dir ", startPath);
//         return;
//     }

//     var files = fs.readdirSync(startPath);
//     for (var i = 0; i < files.length; i++) {
//         var filename = path.join(startPath, files[i]);
//         var stat = fs.lstatSync(filename);
//         if (stat.isDirectory()) {
//             fromDir(filename, filter); //recurse
//         }
//         else if (filename.indexOf(filter) >= 0) {
//             console.log('-- found: ', filename);
//         };
//     };
// };

// document.getElementById('openFolder').addEventListener('click', function () {

//     dialog.showOpenDialog({
//         title: "Select a folder",
//         properties: ["openDirectory"]
//     }, (folderPaths) => {
//         // folderPaths is an array that contains all the selected paths
//         if (folderPaths === undefined) {
//             console.log("No destination folder selected");
//             return;
//         } else {
//             debugger;
//             console.log(folderPaths);

//             var filteredPath = path.join(folderPaths[0], '*.mp4');

//             filteredPath = path.normalize(filteredPath);

//             console.log(filteredPath);

//             // options is optional
//             glob(filteredPath, null, function (er, files) {

//                 debugger;
//                 console.log(files);

//                 var file = files[0];
//                 var movieFile = fs.readFileSync(file);

//                 mainWindow.webContents.send('file-opened', file, content);

//                 // files is an array of filenames.
//                 // If the `nonull` option is set, and nothing
//                 // was found, then files is ["**/*.js"]
//                 // er is an error object or null.
//             })

//             // sync 
//             // var files = glob.readdirSync(filteredPath, {});



//             // options is optional
//             // glob(filteredPath, options, function (er, files) {
//             //     // files is an array of filenames.
//             //     // If the `nonull` option is set, and nothing
//             //     // was found, then files is ["**/*.js"]
//             //     // er is an error object or null.

//             //     debugger;
//             //     console.log(files);
//             // })

//             //var videoFiles = fs.readdirSync(filteredPath);
//             //console.log(videoFiles);

//             //fromDir('../LiteScript', '.html');

//         }
//     });

// });


