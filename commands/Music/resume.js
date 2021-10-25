const Discord = require("discord.js")

module.exports = {
    name: "resume",
    description: "Resumes the currently playing track",
    timeout: 5000,
    run: async (interaction, client) => {
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
            await client.distube.resume(interaction)
            await interaction.reply("***Resumed the current track***")
            const message = await interaction.fetchReply()
            await message.react("▶")
        } catch {
            interaction.reply({ content: "The queue has been playing already", ephemeral: true })
        }
    }
}
