const winston = require("winston")

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "./anticrash.log" })
    ],
    format: winston.format.printf(log => `[${new Date().toLocaleString()}] - [${log.level.toLowerCase()}] - ${log.message}`)
})
module.exports = (client) => {
    process.on("unhandledRejection", (reason, p) => {
        console.log(reason, p)
        logger.error(reason, p)
    })
    process.on("uncaughtException", (err, origin) => {
        console.log(err, origin)
        logger.error(err, origin)
    })
}
