const Discord = require("discord.js")

module.exports = {
    name: "filter",
    description: "Changes the audio Filter",
    options: [
        {
            name: "filter-name",
            type: 3,
            description: "The filter's name | Choose again to turn off the filter",
            required: true,
            choices: [
                {
                    name: "8d",
                    value: "3d"
                },
                {
                    name: "Bassboost",
                    value: "bassboost"
                },
                {
                    name: "Echo",
                    value: "echo"
                },
                {
                    name: "Karaoke",
                    value: "karaoke"
                },
                {
                    name: "Nightcore",
                    value: "nightcore"
                },
                {
                    name: "Vaporwave",
                    value: "vaporwave"
                },
                {
                    name: "Flanger",
                    value: "flanger"
                },
                {
                    name: "Gate",
                    value: "gate"
                },
                {
                    name: "Haas",
                    value: "haas"
                },
                {
                    name: "Reverse",
                    value: "reverse"
                },
                {
                    name: "Surround",
                    value: "surround"
                },
                {
                    name: "Mcompand",
                    value: "mcompand"
                },
                {
                    name: "Phaser",
                    value: "phaser"
                },
                {
                    name: "Tremolo",
                    value: "tremolo"
                },
                {
                    name: "Earwax",
                    value: "earwax"
                }
            ]
        }
    ],
    timeout: 5000,
    run: async (interaction, client) => {
        const queue = await client.distube.getQueue(interaction)
        const choose = interaction.options.getString("filter-name")
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
        await client.distube.setFilter(interaction, choose)
        const filterembed = new Discord.MessageEmbed()
            .setDescription(`Current queue filter: ${queue.filters.join(", ") || "Off"}`)
            .setColor("RANDOM")
        return interaction.reply({ embeds: [filterembed] })
    }
}
