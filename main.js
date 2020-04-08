const electron = require("electron")
const {app, BrowserWindow} = electron
const fs = require('fs')
var wmi2 = require('node-wmi');
let win

//load initial electron window
app.on('ready', ()=>{
    win = new BrowserWindow({
        width: 1100,
        height: 900,
        webPreferences:{
            webviewTag: true,
            nodeIntegration:true,
            alwaysOnTop: true,
            nativeWindowOpen:true
        }
    })
    win.loadFile('./views/index.html')
    win.removeMenu()
})





