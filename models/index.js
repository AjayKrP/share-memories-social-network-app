'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Building Relationship between tables
db.memories.hasMany(db['tag'], {as: 'Memories', foreignKey: 'memory_id'})
db.user.hasMany(db['memories'], {as: 'User', foreignKey: 'user_id'});


db.user.belongsToMany(db['like'], {through: 'like_memories', foreignKey: 'user_id'});
db.memories.belongsToMany(db['like'], {through: 'like_memories', foreignKey: 'memory_id'});


db.user.belongsToMany(db['share'], {through: 'share_memories', foreignKey: 'user_id'});
db.memories.belongsToMany(db['share'], {through: 'share_memories', foreignKey: 'memory_id'});

module.exports = db;
