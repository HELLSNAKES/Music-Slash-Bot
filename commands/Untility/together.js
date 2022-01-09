// https://github.com/RemyK888/discord-together/blob/main/src/DiscordTogether.js
const fetch = require("node-fetch")
module.exports = {
    name: "together",
    description: "Discord together",
    options: [
        {
            name: "app-name ",
            type: 3,
            description: "chosses the app name",
            required: true,
            choices: [
                {
                    name: "youtube",
                    value: "880218394199220334"
                },
                {
                    name: "poker",
                    value: "755827207812677713"
                },
                {
                    name: "betrayal",
                    value: "773336526917861400"
                },
                {
                    name: "fishing",
                    value: "814288819477020702"
                },
                {
                    name: "chess",
                    value: "832012774040141894"
                },
                {
                    name: "lettertile",
                    value: "879863686565621790"
                },
                {
                    name: "wordsnack",
                    value: "879863976006127627"
                },
                {
                    name: "doodlecrew",
                    value: "878067389634314250"
                },
                {
                    name: "awkword",
                    value: "879863881349087252"
                },
                {
                    name: "spellcast",
                    value: "852509694341283871"
                },
                {
                    name: "checkers",
                    value: "832013003968348200"
                },
                {
                    name: "puttparty",
                    value: "763133495793942528"
                },
                {
                    name: "sketchyartist",
                    value: "879864070101172255"
                }
            ]
        }
    ],
    timeout: 5000,
    run: async (interaction, client) => {
        const voiceChannel = interaction.member.voice.channel
        const choose = interaction.options.getString("app-name")
        if (!voiceChannel) {
            return interaction.reply({ content: "You need to be in a voice channel!", ephemeral: true })
        }
        await interaction.deferReply()
        fetch(`https://discord.com/api/v8/channels/${interaction.member.voice.channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: choose,
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                Authorization: `Bot ${process.env.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(invite => {
                if (!invite.code) return interaction.reply({ content: "x: An error occured while retrieving data !'", ephemeral: true })
                return interaction.followUp(`Click on the Link to start the GAME:\n> https://discord.com/invite/${invite.code}`)
            })
    }
}
