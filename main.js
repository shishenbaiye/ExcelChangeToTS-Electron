const {app,BrowserWindow,Menu} = require('electron');
const path = require('path');

function CreatWindow(){
    Menu.setApplicationMenu(null);
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: false, // turn off remot
            contextIsolation: false,
            preload: path.join(__dirname, 'src/uitls/changeScript.js')
        }
    })
    win.webContents.openDevTools();
    win.loadFile('dist/myapp/index.html');
}

app.on('ready', CreatWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})