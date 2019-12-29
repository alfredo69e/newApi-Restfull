module.exports = {
    port: process.env.PORT || 3001,
    db: process.env.MONGODB || `mongodb://localhost/shop`,
    SECRET_TOKEN: `miclavedetokensesverdad12345.`
}