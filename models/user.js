module.exports = (sequelize, dataTypes) => {
    return sequelize.define('user', {
        email: {
            type: dataTypes.STRING,
            unique: true
        },
        name: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        }
    })
}
