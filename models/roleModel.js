const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Role extends Model {}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
        },
        salary: {
            type: DataTypes.INTEGER,
        },
        dept_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, 
    {
    sequelize, 
    timestamps: false,
    modelName: 'Role' 
    }
);

module.exports = Role;