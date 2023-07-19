import { BrowserWindow, ipcMain } from "electron";
import MainWin from "../windows/main";
import ChildWin from "../windows/child";
import GrandchildWin from "../windows/grandchild";

const winOperate = {
  MainWin: {
    maximize(argu: any) {
      !MainWin.win?.isMinimized() && MainWin.win?.isMaximized() ? MainWin.win?.restore() : MainWin.win?.maximize();
    },
    minimize(argu: any) {
      MainWin.win?.minimize();
    },
    quit(argu: any) {
      MainWin.quit()
    },
    start(argu: any) {
      MainWin.quit();
      new MainWin(argu);
    },
  },
  ChildWin: {
    maximize(argu: any) {
      !ChildWin.win?.isMinimized() && ChildWin.win?.isMaximized() ? ChildWin.win?.restore() : ChildWin.win?.maximize();
    },
    minimize(argu: any) {
      ChildWin.win?.minimize();
    },
    quit(argu: any) {
      ChildWin.quit()
    },
    start(argu: any) {
      ChildWin.quit();
      new ChildWin(argu);
    },
  },
  GrandchildWin: {
    maximize(argu: any) {
      !GrandchildWin.win?.isMinimized() && GrandchildWin.win?.isMaximized() ? GrandchildWin.win?.restore() : GrandchildWin.win?.maximize();
    },
    minimize(argu: any) {
      GrandchildWin.win?.minimize();
    },
    quit(argu: any) {
      GrandchildWin.quit()
    },
    start(argu: any) {
      GrandchildWin.quit();
      new GrandchildWin(argu);
    },
  }
}

// 最小化
ipcMain.on("win-operate", (_, { win, operate, argu }:{ win: "MainWin" | "ChildWin" | "GrandchildWin", operate: "maximize" | "minimize" | "quit" | "start", argu: any }) => {
  winOperate[win][operate](argu)
});
