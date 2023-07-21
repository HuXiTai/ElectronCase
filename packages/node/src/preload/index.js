"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
// 渲染进程发布
electron_1.contextBridge.exposeInMainWorld("ipcRenderer", electron_1.ipcRenderer);
// 渲染进程订阅
electron_1.contextBridge.exposeInMainWorld("on", {
    maximize: function (callback) { return electron_1.ipcRenderer.on("maximize", callback); },
    unmaximize: function (callback) { return electron_1.ipcRenderer.on("unmaximize", callback); },
    close: function (callback) { return electron_1.ipcRenderer.on("close", callback); },
});
