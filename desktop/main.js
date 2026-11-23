const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 430,
    height: 900,
    autoHideMenuBar: true,
    title: 'Brain Puzzle',
    webPreferences: {
      contextIsolation: true
    }
  });
  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});
