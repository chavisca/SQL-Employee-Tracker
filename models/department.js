const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class department extends Model {}

department.init(
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

module.exports = department;