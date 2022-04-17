module.exports = (sequelize, dataTypes) => {
    return sequelize.define('tag', {
        name: {
            type: dataTypes.STRING
        },
        count: {
            type: dataTypes.INTEGER
        }
    })
}
