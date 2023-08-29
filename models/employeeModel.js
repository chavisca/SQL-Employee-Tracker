const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Employee extends Model {}

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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

module.exports = Employee;