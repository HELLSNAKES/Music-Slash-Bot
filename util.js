module.exports.trim = (string = String, max = 2048) => {
    return string.length > max ? `${string.slice(0, max - 3)}...` : string
}
