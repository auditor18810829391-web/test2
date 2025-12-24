const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: false,          // 无边框
    transparent: true,     // 透明窗口
    resizable: true,       // 可以缩放，需要配合html代码使用 
    alwaysOnTop: true,     // 可选：总在最前
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html'); // 你的 HTML 文件
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
