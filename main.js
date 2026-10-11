const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 900,
        minHeight: 600,
        icon: path.join(__dirname, 'icon.ico'),
        backgroundColor: '#141c14',
        title: 'Paleozoico · La Era de la Vida Antigua',
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

    // Abrir enlaces externos en el navegador del sistema
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    // Menú personalizado (opcional)
    const menu = Menu.buildFromTemplate([
        {
            label: 'Archivo',
            submenu: [{ role: 'quit', label: 'Salir' }]
        },
        {
            label: 'Ver',
            submenu: [
                { role: 'reload', label: 'Recargar' },
                { role: 'togglefullscreen', label: 'Pantalla completa' },
                { role: 'zoomIn', label: 'Acercar' },
                { role: 'zoomOut', label: 'Alejar' },
                { role: 'resetZoom', label: 'Restablecer zoom' }
            ]
        },
        {
            label: 'Ayuda',
            submenu: [
                {
                    label: 'Acerca de Paleozoico',
                    click: () => {
                        const { dialog } = require('electron');
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'Acerca de Paleozoico',
                            message: 'Paleozoico · La Era de la Vida Antigua',
                            detail: 'Explorador interactivo de la era Paleozoica.\nVersión 1.0.0\n\n© 2025',
                            buttons: ['OK']
                        });
                    }
                }
            ]
        }
    ]);
    Menu.setApplicationMenu(menu);

    mainWindow.on('closed', () => { mainWindow = null; });
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});