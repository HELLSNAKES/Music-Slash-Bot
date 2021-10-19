const { readdirSync } = require("fs")
console.log("\x1b[33m%s\x1b[0m", "Welcome to Music-Slash-Bot|https://github.com/HELLSNAKES/Music-Slash-Bot")
module.exports = (client) => {
    try {
        let amount = 0
        readdirSync("./commands/").forEach((dir) => {
            const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"))
            for (const file of commands) {
                const pull = require(`../commands/${dir}/${file}`)
                if (pull.name) {
                    client.slash.set(pull.name, pull)
                    amount++
                    console.log("\x1b[36m%s\x1b[0m", "|Loaded|" + file)
                } else {
                    console.log(file, "error -> missing a help.name, or help.name is not a string.")
                    continue
                }
                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name))
            }
        })
        console.log("\x1b[31m%s\x1b[0m", `[Finish Loading] ${amount} Commands`)
        console.log("\x1b[34m%s\x1b[0m", "Logging into Bot User...")
    } catch (e) {
        console.log(e)
    }
}
