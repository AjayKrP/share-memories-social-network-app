module.exports = (sequelize, dataTypes) => {
    const User =  sequelize.define('user', {
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
    });
    User.associate = (model) => {
        User.hasMany(model.memories, {as: 'memories'});
    }
    return User;
}
