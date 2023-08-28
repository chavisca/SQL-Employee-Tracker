const express = require('express');
const mysql = require('mysql2');
const sequelize = require('./config/connection');
const fs = require('fs');
const startProcess = require('./startProcess');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const seedData = fs.readFileSync('./db/seeds.sql', 'utf8');

sequelize.query(seedData).then(() => {
    console.log('Seed data inserted successfully.');
    startProcess();
    app.listen(PORT, () => console.log('Now listening'));
}).catch((error) => {
    console.error('Error inserting seed data:', error);
});
