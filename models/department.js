const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Department extends Model {}

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        deptName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, 
    {
    sequelize, 
    timestamps: false,
    modelName: 'Department' 
    }
);

module.exports = Department;