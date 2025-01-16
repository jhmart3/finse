const path = require('path');
const { app, BrowserWindow } = require('electron');
const windowStateKeeper = require('electron-window-state');

let mainWindow;
let isDevelopment = true;

function createMainWindow() {
    const mainWindowState = windowStateKeeper({
        defaultHeight: 500,
        defaultWidth: 700,
        path: isDevelopment ? './config' : app.getPath('userData'),
    });
    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height
    })
    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
    mainWindowState.manage(mainWindow);
}

app.whenReady().then(() => {
    createMainWindow();
    console.log(app.getPath('userData'));
});