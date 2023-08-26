const inquirer = require('inquirer');
const fs = require('fs');
const startProcess = require('./startProcess');

const choiceList = ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role'];

const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'initChoice',
        choices: choiceList,
    }
  ];

  function init() {
    inquirer.prompt(questions)
    .then((answers) => {
        const startChoice = startProcess(initChoice);

    })

    });
  };



  init();