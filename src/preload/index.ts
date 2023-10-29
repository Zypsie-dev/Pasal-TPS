// Import the necessary Electron components.
const { contextBridge, ipcRenderer } = require('electron')

// White-listed channels.
const ipc = {
  render: {
    // From render to main.
    send: [],
    // From main to render.
    receive: [],
    // From render to main and back again.
    sendReceive: ['login', 'register', 'getproduct', 'deleteproduct', 'addproduct']
  }
}

// Exposed protected methods in the render process.
contextBridge.exposeInMainWorld(
  // Allowed 'ipcRenderer' methods.
  'ipcRender',
  {
    // From render to main.
    send: (channel: string, args: any) => {
      let validChannels: any = ipc.render.send
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, args)
      }
    },
    // From main to render.
    receive: (channel: string, listener: (...args: any[]) => void) => {
      let validChannels: any = ipc.render.receive
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`.
        ipcRenderer.on(channel, (_, ...args) => listener(...args))
      }
    },
    // From render to main and back again.
    invoke: (channel: string, args: any) => {
      let validChannels = ipc.render.sendReceive
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, args)
      } else {
        return Promise.reject(`Invalid invoke channel: ${channel}`)
      }
    }
  }
)

/**
 * Render --> Main
 * ---------------
 * Render:  window.ipcRender.send('channel', data); // Data is optional.
 * Main:    ipcMain.on('channel', (event, data) => { methodName(data); })
 *
 * Main --> Render
 * ---------------
 * Main:    windowName.webContents.send('channel', data); // Data is optional.
 * Render:  window.ipcRender.receive('channel', (data) => { methodName(data); });
 *
 * Render --> Main (Value) --> Render
 * ----------------------------------
 * Render:  window.ipcRender.invoke('channel', data).then((result) => { methodName(result); });
 * Main:    ipcMain.handle('channel', (event, data) => { return someMethod(data); });
 *
 * Render --> Main (Promise) --> Render
 * ------------------------------------
 * Render:  window.ipcRender.invoke('channel', data).then((result) => { methodName(result); });
 * Main:    ipcMain.handle('channel', async (event, data) => {
 *              return await promiseName(data)
 *                  .then(() => { return result; })
 *          });
 */
