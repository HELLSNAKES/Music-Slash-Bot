const Discord = require("discord.js")

module.exports = {
    name: "avatar",
    description: "Get avatar user",
    options: [
        {
            name: "user",
            description: "Get avatar user",
            type: 6
        }
    ],
    timeout: 5000,
    run: async (interaction) => {
        const user = interaction.options.getUser("user") || interaction.user
        const embed = new Discord.MessageEmbed()
            .setTitle(`${user.username}'s Avatar`)
            .setColor("RANDOM")
            .setImage(user.avatarURL())
            .setColor("RANDOM")
            .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setURL(user.avatarURL())
        interaction.reply({ embeds: [embed] })
    }
}
