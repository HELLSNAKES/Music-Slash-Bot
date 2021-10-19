const Discord = require("discord.js")

module.exports = {
    name: "ping",
    description: "Returns latency and API ping",
    run: async (interaction, client) => {
        const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("PONG! :ping_pong:")
            .setThumbnail(interaction.user.displayAvatarURL())
            .addFields(
                { name: "Latency", value: `\`${Date.now() - interaction.createdTimestamp}ms\`` },
                { name: "API Latency", value: `\`${Math.round(client.ws.ping)}ms\`` }
            )
        interaction.reply({ embeds: [embed] })
    }
}
