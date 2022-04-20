module.exports = (sequelize, dataTypes) => {
    const Like = sequelize.define('like', {
        count: {
            type: dataTypes.INTEGER
        }
    });

    Like.associate = (model) => {
        Like.belongsTo(model.user, {foreignKey: 'userId', as: 'user_id'});
    }

    return Like;
}
