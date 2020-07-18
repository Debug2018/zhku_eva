module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/zhku_eva/'
        : '/',
    outputDir: "docs"
}