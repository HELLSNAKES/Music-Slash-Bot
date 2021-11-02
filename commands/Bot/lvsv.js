require("dotenv").config()
module.exports = {
    name: "lvsv",
    description: "leaveserver |adminbot only",
    options: [
        {
            name: "id",
            description: "id server",
            type: 3,
            required: true
        }
    ],
    run: async (interaction, client) => {
        const id = interaction.options.getString("id")
        const guild = client.guilds.cache.get(id)
        try {
            if (interaction.member.id !== process.env.Admin) {
                return interaction.reply({ content: "AdminBot Only" })
            }
            if (!guild) {
                return interaction.reply({ content: "No guild ID was specified. Please specify a guild ID" })
            }

            await guild.leave()
            interaction.reply({ content: `Left **${guild.name}** with \`${guild.memberCount}\` members.` })
        } catch (err) {
            interaction.reply({ content: `An error occurred while leaving the server: \`${err.message}\`` })
        }
    }
}
