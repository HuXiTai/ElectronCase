import { contextBridge, ipcRenderer } from "electron";
type Callback = ()=> void;

// 渲染进程发布
contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);

// 渲染进程订阅
contextBridge.exposeInMainWorld("on", {
  maximize: (callback: Callback) => ipcRenderer.on("web-maximize", callback),
  unmaximize: (callback: Callback) => ipcRenderer.on("web-unmaximize", callback),
  close: (callback: Callback) => ipcRenderer.on("web-close", callback),
});

