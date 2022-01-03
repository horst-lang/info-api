const express = require('express');
const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"]});
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/devs', async (req, res, next) => {
    let body = [];
    const file = require('./functions/getDevs.js');
    res.send(await (file.getDevs(client, body)));
})
app.get('/version/info', async (req, res, next) => {
    const info = require('./info.json');
    res.send(info);
});
app.post('/version/publish', async (req, res, next) => {
    const info = require('./info.json');
    const headers = req.headers;

    if(headers.authorization === config.pass.toLowerCase()) {
        req.on('data', (data) => {
            data = JSON.parse(data);
            if (data.versionNr && data.name && data.tags) {
                info[data.versionNr] = {
                    "tags": data.tags,
                    "name": data.name,
                    "versionNr": data.versionNr
                };
                fs.writeFile('./info.json', JSON.stringify(info), (err) => {
                    if (err) {
                        res.send({"error": true, "message": err})
                    }else {
                        res.send({"error": false, "message": "Success!"})
                    }
                });
            }else {
                res.send({"error": true, "message": "Missing data"});
            }
        });
    }else {
        res.send({"error": true, "message": "Invalid password"});
    }
});

app.delete('/version/delete', async (req, res, next) => {
    const config = require('./config.json');
    const info = require('./info.json');
    const headers = req.headers;
    if (headers.authorization === config.pass.toLowerCase()) {
        req.on('data', (data) => {
            data = JSON.parse(data);
            if (data.versionNr && data.recent) {
                delete info[data.versionNr];
                info.recent = data.recent;
                fs.writeFile('./info.json', JSON.stringify(info), (err) => {
                    if (err) {
                        res.send({"error": true, "message": err})
                    }else {
                        res.send({"error": false, "message": "Success!"})
                    }
                });
            }else {
                res.send({"error": true, "message": "Missing data"});
            }
        });
    }else {
        res.send({"error": true, "message": "Invalid password"});
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
client.login(config.token);