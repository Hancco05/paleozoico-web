const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('appInfo', {
    platform: process.platform,
    version: '1.0.0',
    isDesktop: true
});