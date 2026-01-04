const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { x, y, width: screenWidth, height: screenHeight } = primaryDisplay.workArea;

  // 窗口尺寸：屏幕可用区域的 20%
  const winWidth = Math.round(screenWidth * 0.2);
  const winHeight = Math.round(screenHeight * 0.2);

  // 计算窗口左上角坐标，使其右下角对齐屏幕右下角
  const winX = x + screenWidth - winWidth; // 右对齐
  const winY = y + screenHeight - winHeight; // 下对齐

  const win = new BrowserWindow({
    x: winX,
    y: winY,
    width: winWidth,
    height: winHeight,
    frame: false,
    transparent: true,
    resizable: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
