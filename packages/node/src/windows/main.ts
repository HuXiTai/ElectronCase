import { app, Menu, Tray, screen, BrowserWindow } from "electron";
import path from "path";

const isDev = !app.isPackaged;
app.disableHardwareAcceleration();
// 忽略https证书安全问题
app.commandLine.appendSwitch("ignore-certificate-errors");

type createType = {
  url: string, route:string
}

export default class MainWin {
  constructor (argu: createType) {
    const { url, route } = argu
    this.start(url, route);
    this.tray();
  }

  static tray: Tray; // 托盘对象
  static win: BrowserWindow | undefined; // 窗口实例
  static iconPath = isDev ? path.join(__dirname, "../../icon.png") : path.join(__dirname, "../icon.png");

  start (url: string, route: string): void {
    app.whenReady()
      .then(() => {
        // 设置名称
        app.setName("ElectronCase");

        //取消自动启动
        app.setLoginItemSettings({openAtLogin: false});

        // 获取最大高度和最大宽度
        const { width, height } = screen.getPrimaryDisplay().workAreaSize;

        MainWin.win = new BrowserWindow({
          width: 1020,
          height: 700,
          minWidth: 1020,
          minHeight: 700,
          maxHeight: height,
          maxWidth: width,
          frame: false,
          icon: MainWin.iconPath,
          title: "ElectronCase",
          autoHideMenuBar: true,
          webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "../preload.js"),
          },
        });

        
        // 加载页面
        if (isDev) {
          MainWin.win?.loadURL(url);
        } else {
          MainWin.win?.loadFile(url, {
            hash: route,
          });
        }
        

        MainWin.win.on("maximize", () => {
          MainWin.win?.webContents.send("maximize");
        });

        MainWin.win.on("unmaximize", () => {
          MainWin.win?.webContents.send("unmaximize");
        });

        MainWin.win.on("close", () => {
          MainWin.win?.webContents.send("close");
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  tray (): void {
    app.on("ready", () => {
      MainWin.tray = new Tray(MainWin.iconPath);

      MainWin.tray.setToolTip("ElectronCase");



      const contextMenu = Menu.buildFromTemplate([
        { label: "休息一下", submenu: [
          { label: "小休" },
          { label: "下班" },
        ]},
        { label: "打开主窗口", click: () => {
          MainWin.win?.restore();
        } },
        { label: "退出", click: () => {
          app.quit();
          app.exit();
        } },

      ]);

      MainWin.tray.on("click", () => {
        MainWin.win?.show();
        MainWin.win?.flashFrame(false);
        MainWin.tray.setImage(MainWin.iconPath);
      });

      MainWin.tray.setContextMenu(contextMenu);

    });
  }
  
  static quit (): void  {
    MainWin.win?.close();
    MainWin.win?.destroy();
    MainWin.win = undefined;
  }
}
