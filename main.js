const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const windowStateKeeper = require('electron-window-state');
const sqlite3 = require('sqlite3').verbose();

const isDev = process.env.NODE_ENV === 'development';
const isMac = process.platform === 'darwin';
let mainWindow;

let db = new sqlite3.Database(isDev ? path.join(__dirname, './user_data/db.sqlite') : app.getPath('userData'), (err) => {
    if (err) {
        console.error('Failed to connect to database', err);
    } else {
        console.log('Connected to database successfully');
        db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, dob TEXT)');
    }
});

// Build Main Window
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
        height: mainWindowState.height,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    })
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
    mainWindowState.manage(mainWindow);
}

//Add data to SQLite3 database
ipcMain.on('add-user', (event, data) => {
    const { name, dob } = data;
    db.run('INSERT INTO users (name, dob) VALUES (?, ?)', [name, dob], function(err) {
        if (err) {
            console.error('Error inserting user:', err);
        } else {
            console.log('User added successfully');
        }
    });
});

// Launch App When Ready
app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

// Quit App when Windows closed
app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit()
    }
});