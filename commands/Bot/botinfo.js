const Discord = require("discord.js")
const { version } = require("discord.js")
const os = require("os")
const botver = require("../../package.json").version

module.exports = {
    name: "botinfo",
    description: "Send detailed info about the client",
    timeout: 10000,
    run: async (interaction, client) => {
        const embed = new Discord.MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle("Bot Stats")
            .setColor("RANDOM")
            .addFields(
                {
                    name: "<:author:879515584767873024> Author",
                    value: `${interaction.client.users.cache.get(process.env.Admin)?.tag}`,
                    inline: true
                },
                {
                    name: "<:server:879374547864936448> Servers",
                    value: `Serving ${client.guilds.cache.size} servers.`,
                    inline: true
                },
                {
                    name: "<:channels:879515584407162982> Channels",
                    value: `Serving ${client.channels.cache.size} channels.`,
                    inline: true
                },
                {
                    name: "<:user:879371469048664115> Users",
                    value: `Serving ${client.users.cache.size} users.`,
                    inline: true
                },
                {
                    name: "<:join:879517590454689852> Join Date",
                    value: client.user.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: "<:djs:879371469094805564> Discord.js Version",
                    value: `${version}`,
                    inline: true
                },
                {
                    name: "<:node:879371469015097374> Node.js Version",
                    value: `${process.version}`,
                    inline: true
                },
                {
                    name: "<:github:882479353185833020> Bot Version",
                    value: `v${botver}`,
                    inline: true
                },
                {
                    name: "<:computer:879379500322922507> ARCH",
                    value: `\`${os.arch()}\``,
                    inline: true
                },
                {
                    name: "<:computer:879379500322922507> Platform",
                    value: `\`${os.platform()}\``,
                    inline: true
                },
                {
                    name: "<:memory:879371468876701786> Memory",
                    value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb`,
                    inline: true
                },
                {
                    name: "<:cpu:879371469052846110> CPU",
                    value: `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``,
                    inline: true
                }
            )
        interaction.reply({ embeds: [embed] })
    }
}
