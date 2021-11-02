const fetch = require("node-fetch")
module.exports = {
    name: "youtube",
    description: "Watch YouTube with your friends, on discord",
    timeout: 5000,
    run: async (interaction, client) => {
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "You need to be in a voice channel!", ephemeral: true })
        }
        await interaction.deferReply()
        fetch(`https://discord.com/api/v8/channels/${interaction.member.voice.channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "880218394199220334",
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
