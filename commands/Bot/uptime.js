const Discord = require("discord.js")

module.exports = {
    name: "uptime",
    description: "Uptime the bot",
    timeout: 5000,
    run: async (interaction, client) => {
        const days = Math.floor(client.uptime / 86400000)
        const hours = Math.floor(client.uptime / 3600000) % 24
        const minutes = Math.floor(client.uptime / 60000) % 60
        const seconds = Math.floor(client.uptime / 1000) % 60
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.user.username}`)
            .setColor("RED")
            .addField(":computer: UPTIME", ` ${days}days ${hours}hrs ${minutes}min ${seconds}sec`, true)
            .setTimestamp(Date())
        interaction.reply({ embeds: [embed] })
    }
}
