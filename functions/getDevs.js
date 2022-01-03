module.exports = {
    getDevs(client, body) {
        return new Promise((resolve, reject) => {
            client.guilds.cache.forEach(guild => {
                guild.members.cache.forEach(member => {
                    if (member.roles.cache.find(role => role.id === "900122479211720754")) {
                        body.push({id: member.id, name: member.user.username, discriminator: member.user.discriminator, avatar: member.user.avatarURL({format: 'png', size: 256}), title: member.roles.highest.name});
                    }
                })
            })
            resolve(body);
        })
    }
}