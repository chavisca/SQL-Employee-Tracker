const express = require('express');
const mysql = require('mysql2');
const sequelize = require('./config/connection');
const startProcess = require('./startProcess');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: false }).then(() => {
  startProcess();
    app.listen(PORT, () => console.log('Now listening'));
  });