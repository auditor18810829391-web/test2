const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

function createWindow() {
  // 获取主显示器的可用工作区域尺寸
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

  // 设置窗口为屏幕可用区域的 80%
  const winWidth = Math.round(screenWidth * 0.15);
  const winHeight = Math.round(screenHeight * 0.15);

  const win = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    frame: false,          // 无边框
    transparent: true,     // 透明窗口
    resizable: true,       // 可缩放
    alwaysOnTop: true,     // 总在最前（可选）
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html'); // 加载你的 HTML 文件
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
