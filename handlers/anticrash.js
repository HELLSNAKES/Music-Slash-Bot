const { MessageEmbed } = require("discord.js")

module.exports = (client) => {
    process.on("unhandledRejection", (reason, p) => {
        const embed = new MessageEmbed()
            .setAuthor("Anti Crash", client.user.displayAvatarURL({ dynamic: true }))
            .setColor("RED")
            .setTitle("Unhandled Rejection")
            .addField("Promise", `\`\`\`${p}\`\`\``, true)
            .addField("Reason", `\`\`\`${reason.message}\`\`\``, true)
            .setTimestamp()
        const logchannel = client.channels.cache.get(process.env.Channel_log)
        logchannel.send({ embeds: [embed] })
        console.log(reason, p)
    })
    process.on("uncaughtException", (err, origin) => {
        const embed = new MessageEmbed()
            .setAuthor("Anti Crash", client.user.displayAvatarURL({ dynamic: true }))
            .setColor("RED")
            .setTitle("Uncaught Exception")
            .addField("Origin", `\`\`\`${origin}\`\`\``, true)
            .addField("Error", `\`\`\`${err}\`\`\``, true)
            .setTimestamp()
        const logchannel = client.channels.cache.get(process.env.Channel_log)
        logchannel.send({ embeds: [embed] })
        console.log(err, origin)
    })
}
