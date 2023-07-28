import { BrowserWindow, app } from "electron";
import path from "path";
import MainWin from "./main";
const isDev = !app.isPackaged;

type createType = {
  width: number, height: number, modal:boolean, movable: boolean, resizable: boolean, title: string, url: string, route:string
}

// 弹窗窗口class
export default class ChildWin {
  constructor (argu: createType) {
    const { width, height, modal, movable, resizable, title, url, route } = argu
    ChildWin.create(width, height, modal, movable, resizable, title, url, route);
  }

  static win: undefined | BrowserWindow; 
  // 创建窗口
  static create (width: number, height: number, modal = false, movable: boolean, resizable: boolean, title: string, url: string, route: string) {
    app.whenReady()
      .then(() => {
        ChildWin.win = new BrowserWindow({
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
          ChildWin.win?.loadURL(url + route);
        } else {
          ChildWin.win?.loadFile(url, {
            hash: route,
          });
        }
        
        ChildWin.win.on("maximize", () => {
          ChildWin.win?.webContents.send("maximize");
        });

        ChildWin.win.on("unmaximize", () => {
          ChildWin.win?.webContents.send("unmaximize");
        });

        ChildWin.win.on("close", () => {
          ChildWin.win?.webContents.send("close");
        });

      }).catch((err) => {
        console.error(err);
      });

  }

  // 销毁窗口
  static quit () {
    ChildWin.win?.close();
    ChildWin.win?.destroy();
    ChildWin.win = undefined;
  }
}
