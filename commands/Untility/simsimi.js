const fetch = require("node-fetch")

module.exports = {
    name: "simsimi",
    description: "Talk with SimSimi",
    options: [
        {
            name: "text",
            description: "ask",
            type: 3,
            required: true
        }
    ],
    timeout: 5000,
    run: async (interaction) => {
        const text = interaction.options.getString("text")
        const url = `https://api.simsimi.net/v2/?text=${encodeURIComponent(text)}&lc=vn`
        let response
        try {
            response = await fetch(url).then(res => res.json())
        } catch (e) {
            return interaction.reply({ content: "An Error Occured, Try Again Later.", ephemeral: true })
        }
        await interaction.deferReply()
        await interaction.editReply(response.success)
    }
}
