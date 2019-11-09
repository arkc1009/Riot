const fs = require("fs"); //노드js의 파일시스템

let json = fs.readFileSync("champ.json", "utf8");

json = JSON.parse(json)
let champList = json.data;


let keyList = Object.keys(champList);


let myJson = {};

for(let i=0; i<keyList.length; i++) {
    let item = champList[keyList[i]];
    let myItem = {name:item.name, id:item.id, img:item.image.full};
    myJson[item.key] = myItem;
}

fs.writeFileSync("myChamp.json", JSON.stringify(myJson), "utf8");
