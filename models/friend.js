module.exports = (sequelize, dataTypes) => {
    const Friend =  sequelize.define('friend', {
    });

    Friend.associate = (model) => {
        Friend.belongsTo(model.user, {foreignKey: 'user1'});
        Friend.belongsTo(model.user, {foreignKey: 'user2'});
    }
    return Friend;
}
