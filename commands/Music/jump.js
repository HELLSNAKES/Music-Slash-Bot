const Discord = require("discord.js")

module.exports = {
    name: "jump",
    description: "Jump to the song number in the queue",
    options: [
        {
            name: "id",
            type: 10,
            description: "The music's ID in the queue",
            required: true
        }
    ],
    timeout: 5000,
    run: async (interaction, client) => {
        const musicid = interaction.options.getNumber("id")
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "Please join a voice channel!", ephemeral: true })
        }
        if (!queue) {
            const queueError = new Discord.MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RANDOM")
            return interaction.reply({ embeds: [queueError] })
        }
        if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "You are not on the same voice channel as me!", ephemeral: true })
        }
        try {
            await client.distube.jump(interaction, parseInt(musicid))
            await interaction.reply({ content: "Jumped to the song number " + musicid })
        } catch {
            return interaction.reply({ content: "Invalid song id!", ephemeral: true })
        }
    }
}
