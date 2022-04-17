module.exports = (sequelize, dataTypes) => {
    return sequelize.define('like', {
        count: {
            type: dataTypes.INTEGER
        }
    })
}
