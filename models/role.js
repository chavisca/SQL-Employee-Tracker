const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Role extends Model {}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
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
            references: {
                model: 'department',
                key: 'id'
            }
        },
    }, 
    {
    sequelize, 
    timestamps: false,
    modelName: 'Role' 
    }
);

module.exports = Role;