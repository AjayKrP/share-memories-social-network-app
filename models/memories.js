module.exports = (sequelize, dataTypes) => {
    const Memories =  sequelize.define('memories', {
        title: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.TEXT
        },
        image: {
            type: dataTypes.BLOB
        }
    });

    Memories.associate = (model) => {
        Memories.belongsTo(model.user, {foreignKey: 'userId', as: 'user_id'});
        Memories.hasMany(model.tag, {as: 'tags'});
        Memories.hasMany(model.like, {as: 'likes'});
        Memories.hasMany(model.share, {as: 'shares'});
    }
    return Memories;
}
