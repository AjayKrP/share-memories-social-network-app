module.exports = (sequelize, dataTypes) => {
    return sequelize.define('share', {
        count: {
            type: dataTypes.INTEGER
        }
    })
}
