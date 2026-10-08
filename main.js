const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true
    }
  });

  const devURL = "http://localhost:3001";

  // Try dev server first; fall back to production build
  win
    .loadURL(devURL)
    .then(() => {
      win.webContents.openDevTools();
    })
    .catch(() => {
      win
        .loadFile(path.join(__dirname, "build/index.html"))
        .then(() => {
          win.webContents.openDevTools();
        });
    });
}

app.whenReady().then(createWindow);
