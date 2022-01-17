module.exports = {
    name: "play",
    description: "Playing music",
    options: [
        {
            name: "query",
            type: 3,
            description: "The song you want to play | Supported url: youtube,soundcloud,spotify",
            required: true
        }
    ],
    timeout: 5000,
    run: async (interaction, client) => {
        const voiceChannel = interaction.member.voice.channel
        const queue = await client.distube.getQueue(interaction)
        const query = interaction.options.get("query").value
        if (!voiceChannel) {
            return interaction.reply({ content: "Please join a voice channel!", ephemeral: true })
        }
        if (queue) {
            if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
                return interaction.reply({ content: "You are not on the same voice channel as me!", ephemeral: true })
            }
        }
        await interaction.reply("🔍 **Searching and attempting...**")
        await interaction.editReply("Searching done :ok_hand: ")
        client.distube.play(voiceChannel, query, {
            textChannel: interaction.channel,
            member: interaction.member
        })
    }
}
