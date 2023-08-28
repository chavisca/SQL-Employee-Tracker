const inquirer = require('inquirer');
const startProcess = require('./startProcess');

const choiceList = ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Exit'];

// Inquirer prompt to start the process (continued on startProcess.js)
const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'initChoice',
        choices: choiceList,
    }
  ];

  // Initial function to run process scripts
  function init() {
    inquirer.prompt(questions)
    .then((answers) => {
        const startChoice = answers.initChoice;
        startProcess(startChoice);

    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

  init();