const {ipcRenderer} = require('electron');

window.addEventListener("keydown", (e)=> {
    if(e.ctrlKey && e.key.toLowerCase() == "q") {
        ipcRenderer.send("openDev");
    }
});

window.addEventListener("load", ()=> {
    
    let name = document.querySelector("#txtName");
    let searchBin = document.querySelector("#search");

    searchBin.addEventListener("click", (e)=> {
        let str = name.value;
        ipcRenderer.send("summoner", {name:str});
    })

    ipcRenderer.on("summonerData", (e, data)=> {
        let s = data.summoner;
        
        let html = summonerTemplate(s.profileIconId, s.name, s.summonerLevel, s.revisionDate);
    
        let sDiv = document.querySelector(".summoner");
        sDiv.innerHTML = html;

        let mDiv = document.querySelector(".matchList");
        let m = data.match; // 전적 100개;
        m.forEach(x => {
            let div = matchTemplate(x);
            mDiv.appendChild(div);
        });
    });
})


function summonerTemplate(icon, name, level, date) {
    const dateStr = new Date(date);
    return `<div class="img-wrapper">
    <img src="./image/profileicon/${icon}.png" alt="">
    </div>
    <div class="text-wrapper">
        <div class="info">
            <span>소환사 이름</span> <span id="sname">${name}</span>
        </div>
        <div class="info">
            <span>소환사 레벨</span> <span id="slevel">${level}</span>
        </div>
        <div class="info">
            <span>최종 갱신일</span> <span id="lastdate">${dateStr.toLocaleDateString()}</span>
        </div>

    </div>`;
}

function matchTemplate(match) {
    const timestampStr = new Date(match.timestamp);
    let champ = champData[match.champion];
    let html = `
    <div class="match">
            <div class="img-wrapper">
                <img src="./image/champion/${champ.img}" alt="">
            </div>
            <div class="up">
                <div clsss="match-info"><span>${match.lane}</span></div>
                <div clsss="match-info"><span>${champ.name}</span></div>
                <div clsss="match-info"><span>${match.platformId}</span></div>
                <div clsss="match-info"><span>${match.season}</span></div>
            </div>
            <div class="down">
                <div clsss="match-info"><span>${match.role}</span></div>
                <div clsss="match-info"><span>${match.queue}</span></div>
                <div clsss="match-info"><span>${timestampStr.toLocaleDateString()}</span></div>
            </div>
        </div>
    `;
    let div = document.createElement("div");
    div.classList.add("match");
    div.innerHTML = html;

    return div;
}