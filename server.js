var http = require('http')
var discord = require('discord.js')
var client = new discord.Client()
function onRequest(request, response){
    response.writeHead(200,{"Content-Type":"text/html"})

    let guild = client.guilds.cache.get('893955871837671484');
    let jimbob = guild.members.cache.get('538414949140267008');
    let nino = guild.members.cache.get('638980843381063703');

    response.write(`{"jimbob": {"avatar":"${jimbob.user.avatarURL({format:'png',size:256})}","name":"${jimbob.user.username}","discriminator":"${jimbob.user.discriminator}"},"ninods":{"avatar":"${nino.user.avatarURL({format:'png',size:256})}","name":"${nino.user.username}","discriminator":"${nino.user.discriminator}"},"horst":{"serverMembers":${guild.memberCount}}}`);
    response.end();
}
http.createServer(onRequest).listen(process.env.PORT || 8000)
client.login('TOKEN')