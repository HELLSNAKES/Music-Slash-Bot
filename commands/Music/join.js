const { joinVoiceChannel } = require("@discordjs/voice")

module.exports = {
    name: "join",
    description: "Join voice channel",
    timeout: 5000,
    run: async (interaction, client) => {
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "Please join a voice channel!", ephemeral: true })
        }
        try {
            joinVoiceChannel({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator
            })
            await interaction.reply("***Successfully joined the voice channel***")
        } catch (error) {
            return interaction.reply({ content: `There Was An Error Connecting To The Voice Channel: ${error}`, ephemeral: true })
        }
    }
}
