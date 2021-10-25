const { joinVoiceChannel } = require("@discordjs/voice")

module.exports = {
    name: "leave",
    description: "Leave voice channel",
    timeout: 5000,
    run: async (interaction, client) => {
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "Please join a voice channel!", ephemeral: true })
        }
        if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "I'm not on any voice channel yet!", ephemeral: true })
        }

        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator
        })
        connection.destroy()
        await interaction.reply("***Successfully left the voice channel***")
    }
}
