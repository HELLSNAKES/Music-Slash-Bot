const Discord = require("discord.js")
require("dotenv").config()

module.exports = {
    name: "botguild",
    description: "bot guild list",
    timeout: 10000,
    run: async (interaction, client) => {
        if (interaction.member.id !== process.env.Admin) {
            return interaction.reply({ content: "AdminBot Only" })
        }
        const guilds = client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .first(50)
        const description = guilds.map((guild, index) => {
            return `${index + 1}) ${guild.name}: ${guild.memberCount} members|ID:${guild.id} `
        }).join("\n")
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.user.username}'s top Guild:`)
            .setThumbnail(client.user.displayAvatarURL())
            .setColor("RANDOM")
            .setDescription(description)
        interaction.reply({ embeds: [embed] })
    }
}
