module.exports = (sequelize, dataTypes) => {
    return sequelize.define('memories', {
        title: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        },
        image: {
            type: dataTypes.BLOB
        }
    })
}
