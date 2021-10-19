const Discord = require("discord.js")
const status = (queue) => `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\` | Filter: \`${queue.filters.join(", ") || "Off"}\``
module.exports = {
    name: "nowplay",
    description: "Current song playing",
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
        const song = queue.songs[0]
        const embed = new Discord.MessageEmbed()
            .setTitle("<:headphones:879518595602841630> Now Playing")
            .setDescription(`[${song.name}](${song.url})`)
            .addField("**Views:**", song.views.toString())
            .addField("<:like:879371469132562552>", song.likes.toString())
            .addField("<:dislike:879371468817973299>", song.dislikes.toString())
            .addField("**Duration:**", `${queue.formattedCurrentTime} / ${song.formattedDuration}`)
            .addField("**Status**", status(queue).toString())
            .setThumbnail(song.thumbnail)
            .setColor("RANDOM")
        return interaction.reply({ embeds: [embed] })
    }
}
