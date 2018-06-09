// Modules to control application life and create native browser window
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

let template = [{
    label: 'Electron',
    submenu: [{
        label: 'About',
        enabled: true,
        click: function () {
            let aboutWindow = new BrowserWindow({width: 200, height: 100})
            aboutWindow.loadFile('about.html')
            aboutWindow.on('close', function () {
                aboutWindow = null
            })
        }
    }]
}, {
    label: 'Edit',
    submenu: [{
        label: 'Undo',
        accelerator: 'CmdOrCtrl + Z',
        role: 'undo'
    }, {
        label: 'Redo',
        accelerator: 'CmdOrCtrl + Shift + Z',
        role: 'redo'
    }, {
        label: 'Cut',
        accelerator: 'CmdOrCtrl + X',
        role: 'cut'
    }, {
        label: 'Copy',
        accelerator: 'CmdOrCtrl + C',
        role: 'copy'
    }, {
        label: 'Paste',
        accelerator: 'CmdOrCtrl + V',
        role: 'paste'
    }, {
        label: 'Delete',
        accelerator: 'Delete',
        role: 'delete'
    }]
}]

function addUpdateMenuItems(items, position) {
    if (process.mas)
        return
    const version = app.getVersion()
    let updateItems = [{
        label: 'Version '.version,
        enabled: false
    }, {
        label: 'Checking for Update',
        enabled: false,
        key: 'checkingForUpdate'
    }, {
        label: 'Check for Upddate',
        visible: false,
        key: 'checkForUpdate',
        click: function () {
            require('electron').autoUpdater.checkForUpdates()
        }
    }, {
        label: 'Restart and Install Update',
        enabled: true,
        visible: false,
        key: 'restartToUpdate',
        click: function () {
            require('electron').autoUpdater.quitAndInstall()
        }
    }]
    items.splice.apply(items, [position, 0].concat(updateItems))
}

function findReopenMenuItem() {
    const menu = Menu.getApplicationMenu()
    if (!menu) return

    let reopenMenuItem
    menu.items.forEach(function (item) {
        if (item.submenu) {
            item.submenu.items.forEach(function (item) {
                if (item.key == 'reopenMenuItem') {
                    reopenMenuItem = item
                }
            })
        }
    })
    return reopenMenuItem
}

if (process.platform == 'darwin') {
    const name = electron.app.getName()
}


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createMainWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600, show: false})

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')
    mainWindow.once('ready-to-show', () =>{
        mainWindow.show()
    })

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createMainWindow)

app.on('ready', function () {
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})

app.on('browser-window-created', function () {
    let reopenMenuItem = findReopenMenuItem()
    if (reopenMenuItem) reopenMenuItem.enabled = false
})

app.on('window-all-closed', function () {
    let reopenMenuItem = findReopenMenuItem()
    if (reopenMenuItem) reopenMenuItem.enabled = true
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createMainWindow()
    }
})