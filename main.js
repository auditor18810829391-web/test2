const { app, BrowserWindow, screen } = require('electron'); // 👈 注意：引入 screen
const path = require('path');
const primaryDisplay = screen.getPrimaryDisplay();
const { width, height } = primaryDisplay.workAreaSize;

function createWindow() {
  const win = new BrowserWindow({
    width: Math.floor(width * 0.15),
    height: Math.floor(height * 0.15),
    frame: false,
    transparent: false,
    resizable: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');

  // 等待窗口内容加载完成后再设置位置（可选，但更可靠）
  win.once('ready-to-show', () => {
    // 获取主显示器的工作区域（排除任务栏等）
    const { width: windowWidth, height: windowHeight } = win.getBounds();
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;

    // 计算右下角坐标：x = 屏幕宽 - 窗口宽，y = 屏幕高 - 窗口高
    const x = screenWidth - windowWidth;
    const y = screenHeight - windowHeight;

    win.setPosition(x, y);
    win.show(); // 如果你用了 show: false，这里要显示
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
