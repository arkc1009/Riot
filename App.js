const req = require('request');


let url = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
let name = "둥진냉면";
name = encodeURI(name);
let key = "RGAPI-d5ed5d04-6607-4753-b746-5935ab5722d8";
req.get(`${url}${name}?api_key=${key}`, (err, res, body)=>{
    let json = JSON.parse(body);
    let accId = json.accountId;
    let matchUrl = `https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accId}?api_key=${key}`;

    req.get(matchUrl, (err, res, body)=>{
        let matchjson = JSON.parse(body);
        console.log(matchjson);
    });
});