const inquirer = require('inquirer');
const fs = require('fs');

const questions = [
    {
        type: 'input',
        message: 'What would you like to do?',
        name: 'startChoice',
    },
  ];