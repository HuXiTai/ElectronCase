import { BrowserWindow, app } from "electron";
import path from "path";
import MainWin from "./main";
const isDev = !app.isPackaged;

type createType = {
  width: number, height: number, modal:boolean, movable: boolean, resizable: boolean, title: string, url: string, route:string
}

// 弹窗窗口class
export default class GrandchildWin {
  constructor (argu: createType) {
    const { width, height, modal, movable, resizable, title, url, route } = argu
    GrandchildWin.create(width, height, modal, movable, resizable, title, url, route);
  }

  static win: undefined | BrowserWindow; 
  // 创建窗口
  static create (width: number, height: number, modal = false, movable: boolean, resizable: boolean, title: string, url: string, route: string) {
    app.whenReady()
      .then(() => {
        GrandchildWin.win = new BrowserWindow({
          parent: MainWin.win,
          frame: false,
          minWidth: width,
          minHeight: height,
          modal: modal,
          width: width,
          height: height,
          movable: movable,
          resizable: resizable, // 弹窗不可以改变大小
          title: title,
          webPreferences: {
            devTools: isDev,
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "../preload.js"),
          },
        });

        // 加载页面
        if (isDev) {
          GrandchildWin.win?.loadURL(url);
        } else {
          GrandchildWin.win?.loadFile(url, {
            hash: route,
          });
        }
        
        GrandchildWin.win.on("maximize", () => {
          GrandchildWin.win?.webContents.send("maximize");
        });

        GrandchildWin.win.on("unmaximize", () => {
          GrandchildWin.win?.webContents.send("unmaximize");
        });

        GrandchildWin.win.on("close", () => {
          GrandchildWin.win?.webContents.send("close");
        });

      }).catch((err) => {
        console.error(err);
      });

  }

  // 销毁窗口
  static quit () {
    GrandchildWin.win?.close();
    GrandchildWin.win?.destroy();
    GrandchildWin.win = undefined;
  }
}
