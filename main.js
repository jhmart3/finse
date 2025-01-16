const path = require('path');
const { app, BrowserWindow } = require('electron');
const windowStateKeeper = require('electron-window-state');

const isDev = process.env.NODE_ENV === 'development';
const isMac = process.platform === 'darwin';
let mainWindow;

function createMainWindow() {
    const mainWindowState = windowStateKeeper({
        defaultHeight: 500,
        defaultWidth: 700,
        path: isDev ? './user_data' : app.getPath('userData'),
    });
    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height
    })
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
    mainWindowState.manage(mainWindow);
}

app.whenReady().then(() => {
    createMainWindow();
});

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit()
    }
});