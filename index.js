const inquirer = require('inquirer');
const fs = require('fs');

const choiceList = ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role'];

const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'startChoice',
        choices: choiceList,
    },
  ];

  function init() {
    inquirer.prompt(questions)
    .then (response => {

    });
  };

  init();