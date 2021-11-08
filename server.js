import http from 'http';
import discord from 'discord.js';
import fetch from 'node-fetch';
import fs from 'fs';
let config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
import { version } from 'os';
const client = new discord.Client();
async function onRequest(request, response){
    response.writeHead(200,{"Content-Type":"text/html"});

    let guild = client.guilds.cache.get('893955871837671484');
    let jimbob = guild.members.cache.get('538414949140267008');
    let nino = guild.members.cache.get('638980843381063703');


    const githubResponse= await fetch('https://raw.githubusercontent.com/horst-lang/info/main/version.json');
    let body = await githubResponse.text();
    body = JSON.parse(body);

    let obj = {
        jimbob: {
            avatar: jimbob.user.avatarURL({format:'png',size:256}),
            name: jimbob.user.username,
            discriminator: jimbob.user.discriminator
        },
        ninods: {
            avatar: nino.user.avatarURL({format:'png',size:256}),
            name: nino.user.username,
            discriminator: nino.user.discriminator
        },
        horst: {
            serverMembers: guild.memberCount,
            version: body.versionNr
        }
    }
    

    response.write(JSON.stringify(obj));
    response.end();
}
http.createServer(onRequest).listen(process.env.PORT || 8000);
client.login(config.token);