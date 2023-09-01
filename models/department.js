const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Department extends Model {}

Department.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
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