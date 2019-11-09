const {app, BrowserWindow, ipcMain, Menu} = require('electron');
const LolAPI = require("./LolAPI.js");   
const option = {
    width:1200,
    height:600,
    resizable: false,  
    webPreferences:{
        nodeIntegration: true,
        nativeWindowOpen: true,
    }
};

let win = null;
let api = new LolAPI(); // 인스턴스 하나 생성.
app.on("ready", ()=> {
    Menu.setApplicationMenu(null);
    win = new BrowserWindow(option);
    win.loadFile("index.html");
});

ipcMain.on("openDev", ()=> {
    win.webContents.openDevTools();
});

ipcMain.on("summoner", (e, data)=> {
    api.loadSummoner(data.name).then(data=>{
        e.reply("summonerData", data);
    });
    
});