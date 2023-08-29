const express = require('express');
const mysql = require('mysql2');
const sequelize = require('./config/connection');
const fs = require('fs');
const startProcess = require('./startProcess');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: true }).then(() => {
    console.log('Database synced successfully.');
    startProcess();
    app.listen(PORT, () => console.log('Now listening'));
}).catch((error) => {
    console.error('Error syncing database:', error);
});

query = "SELECT * FROM departments";
connection.query(query, (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        return;
    }
    console.log('All Departments:', results);
});