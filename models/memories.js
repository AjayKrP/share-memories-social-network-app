module.exports = (sequelize, dataTypes) => {
    return sequelize.define('memories', {
        title: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.TEXT
        },
        image: {
            type: dataTypes.BLOB
        }
    })
}
