export interface IElectronAPi{
  loadPreferences: ()=> Promise<void>
}

declare global {
  interface Window {
    ipcRenderer: {
      sendSync: (a: string, c?: any)=> any
      send: (a: string, c?: any)=> any
      invoke: (a: string, c?: any)=> Promise<any>
      postMessage(channel: string, message: any, transfer?: (message: any, transfer: Transferable[])=> void): void;
    },
    on: any
  }
}

declare module "*.svg"
declare module "*.png"
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.gif"
declare module "*.bmp"
declare module "*.tiff"
