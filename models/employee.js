const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class employee extends Model {}

employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'role',
                key: 'id'
            }
        },
        manager_id: {
            type: DataTypes.INTEGER,
        }
    }, 
    {
    sequelize, 
    timestamps: false,
    modelName: 'Employee' 
    }
);

module.exports = employee;