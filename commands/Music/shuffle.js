const Discord = require("discord.js")

module.exports = {
    name: "shuffle",
    description: "Shuffle the guild queue songs",
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
        await client.distube.shuffle(interaction)
        await interaction.reply("***Shuffled songs in the queue***")
        const message = await interaction.fetchReply()
        await message.react("🔀")
    }
}
