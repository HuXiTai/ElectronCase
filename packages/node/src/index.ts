// 解决 Electron Security Warning
process.env[ "ELECTRON_DISABLE_SECURITY_WARNINGS" ] = "true";

import path from "path";
import "./utils/nodeSub";
import MainWin from "./windows/main";

new MainWin({ url: "http://localhost:5173/#/", route: "main-win" });

export const iconPngPath = path.join(__dirname, "../assets/icon.png")

