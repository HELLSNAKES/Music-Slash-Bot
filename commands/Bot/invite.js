const Discord = require("discord.js")

module.exports = {
    name: "invite",
    description: "invite url link",
    timeout: 10000,
    run: async (interaction, client) => {
        if (process.env.oauthv2link === undefined) {
            interaction.reply({ content: "Missing `oauthv2link` in .env", ephemeral: true })
        } else {
            if (!process.env.oauthv2link.toString().startsWith("https://discord.com/")) {
                interaction.reply({ content: "Please provides a vaild OAuth2 link", ephemeral: true })
            } else {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`${client.user.username}'s invite link:`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor("RANDOM")
                    .setDescription(`My invite link is: ${process.env.oauthv2link}`)
                interaction.reply({ embeds: [embed] })
            }
        }
    }
}
