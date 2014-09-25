var child_process = require('child_process');
var app = require('app');
var BrowserWindow = require('browser-window');

var dirname = __dirname;
console.log(dirname);


var start = function (callback) {
  if (process.env.NODE_ENV === 'development') {
    callback(process.env.ROOT_URL);
  }
};

mainWindow = null;

app.on('activate-with-no-open-windows', function () {
  if (mainWindow) {
    mainWindow.show();
  }
  return false;
});

app.on('ready', function() {
  start(function (url) {
    var cleanUp = function () {
      app.quit();
      process.exit();
    };
    process.on('exit', cleanUp);
    process.on('uncaughtException', cleanUp);
    process.on('SIGINT', cleanUp);
    process.on('SIGTERM', cleanUp);

    // Create the browser window.
    var windowOptions = {
      width: 800,
      height: 578,
      frame: false,
      resizable: true,
      'web-preferences': {
        'web-security': false
      }
    };

    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.focus();
    mainWindow.loadUrl(url);
  });
});
