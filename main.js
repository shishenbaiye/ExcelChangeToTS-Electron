const {app,BrowserWindow,Menu, dialog} = require('electron');
const ipc = require('electron').ipcMain;
const path = require('path');

function CreatWindow(){
    Menu.setApplicationMenu(null);
    const win = new BrowserWindow({
        width: 800,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: false, // turn off remot
            contextIsolation: false,
            preload: path.join(__dirname, 'src/uitls/changeScript.js')
        }
    })
    // win.webContents.openDevTools();
    win.loadFile('dist/myapp/index.html');
}

app.on('ready', CreatWindow);



app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

/**主进程监听 */
ipc.on("finish-change",(event)=>{
    dialog.showMessageBox({message:"转换完成!"})
})

// ipc.on('open-the-file',(event)=>{
//     event.returnValue = dialog.showOpenDialogSync({properties: ['openFile', 'openDirectory', 'multiSelections']})
// })