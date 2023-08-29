const inquirer = require('inquirer');
const connection = require('./config/connection');

const choiceList = ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Sum Salaries by Department', 'Delete a Department', 'Exit'];

// Inquirer prompt to start the process (continued on startProcess.js)
const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'initChoice',
        choices: choiceList,
    }
  ];


const addADept = [
    {
        type: 'input',
        message:  'What is the NAME of the department?',
        name: 'deptName'
    },
    {
        type: 'input',
        message:  'What is the ID of the department?',
        name: 'deptID'
    }
];

const addARole = [
    {
        type: 'input',
        message:  'What is the NAME of the role?',
        name: 'roleName'
    },
    {
        type: 'input',
        message:  'What is the ID of the role?',
        name: 'roleID'
    },
    {
        type: 'input',
        message:  'What is the SALARY of the role?',
        name: 'roleSalary'
    },
    {
        type: 'input',
        message:  'What is the DEPARTMENT ID of the role?',
        name: 'roleDeptID'
    }
];

const addAnEmp = [
    {
        type: 'input',
        message:  'What is the FIRST NAME of the employee?',
        name: 'empFirstName'
    },
    {
        type: 'input',
        message:  'What is the LAST NAME of the employee?',
        name: 'empLastName'
    },
    {
        type: 'input',
        message:  'What is the ID NUMBER of the employee?',
        name: 'empID'
    },
    {
        type: 'input',
        message:  'What is the ROLE ID of the employee?',
        name: 'empRoleID'
    },
    {
        type: 'input',
        message:  'What is the MANAGER ID of the employee?',
        name: 'empMgrID'
    }
];

const updateRole = [
    {
        type: 'input',
        message:  'What is the ROLE ID you want to update?',
        name: 'updtID'
    },
    {
        type: 'input',
        message:  'What is the TITLE of the role?',
        name: 'updtTitle'
    },
    {
        type: 'input',
        message:  'What is the SALARY of the role?',
        name: 'updtSalary'
    },
    {
        type: 'input',
        message:  'What is the DEPARTMENT ID of the role?',
        name: 'updtDeptID'
    }
];

const sumSalaries = [
    {
        type: 'input',
        message:  'What is the DEPT ID you want to sum for salaries?',
        name: 'sumDeptID'
    },
];

const deleteDept = [
    {
        type: 'input',
        message:  'What is the DEPT ID you want to delete?',
        name: 'dltDeptID'
    },
];


// async loop to queue up selections and to allow for loop exit
async function startProcess() {
    let shouldContinue = true;

    do {
        const { initChoice } = await inquirer.prompt(questions);

    switch(initChoice) {
        case "View All Departments": 
            query = "SELECT * FROM departments";
            connection.query(query, (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    return;
                }
                console.log('All Departments:', results);
            });
            break;
            
        case "View All Roles":
            query = "SELECT * FROM roles";
            connection.query(query, (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    return;
                }
                console.log('All Roles:', results);
            });
            break;

        case "View All Employees":
            query = "SELECT * FROM employees";
            connection.query(query, (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    return;
                }
                console.log('All Roles:', results);
            });
            break;

        case "Add A Department":
            query = inquirer.prompt(addADept)
            .then((answers) => {
                const deptName = answers.deptName;
                const deptID = answers.deptID;
                addDepartmentToDatabase(deptName, deptID);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            break;

        case "Add A Role":
            query = inquirer.prompt(addARole)
            .then((answers) => {
                const roleName = answers.roleName;
                const roleID = answers.roleID;
                const roleSalary = answers.roleSalary;
                const roleDeptID = answers.roleDeptID;
                addRoleToDatabase(roleName, roleID, roleSalary, roleDeptID);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            break;

        case "Add An Employee":
            query = inquirer.prompt(addAnEmp)
            .then((answers) => {
                const empFirstName = answers.empFirstName;
                const empLastName = answers.empLastName;
                const empDeptID = answers.empDeptID;
                const empRoleID = answers.empRoleID;
                const empMgrID = answers.empMgrID;
                addEmployeeToDatabase(empFirstName, empLastName, empDeptID, empRoleID, empMgrID);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            break;

        case "Update An Employee Role":
            query = inquirer.prompt(updateRole)
            .then((answers) => { 
                const updtID = answers.updtID;
                const updtTitle = answers.updtTitle;
                const updtSalary = answers.updtSalary;
                const updtDeptID = answers.updtDeptID;
                updateRoleToDatabase(updtID, updtTitle, updtSalary, updtDeptID);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            break;

        case "Sum Salaries by Department":
            query = inquirer.prompt(sumSalaries)
            .then((answers) => { 
                const sumDeptID = answers.sumDeptID;
                sumSalariesByDepartment(sumDeptID);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            break;

        case "Delete a Department":
            query = inquirer.prompt(deleteDept)
            .then((answers) => { 
                const dltDeptID = answers.dltDeptID;
                deleteDepartmentFromDatabase(dltDeptID);
            })
            .catch(error => {
                console.error('Error:', error);
            })
            break;

        case "Exit":
            console.log("Exiting...");
            shouldContinue = false;
            break;
        
        default: console.log("Invalid choice.");
            break;
        }
    } while (shouldContinue);
}

// Adds new department to database
function addDepartmentToDatabase(deptName, deptID) {
    const query = 'INSERT INTO departments (deptName, deptID) VALUES (?, ?)';
    connection.query(query, [deptName, deptID], (err, results) => {
        if (err) {
            console.error('Error adding department:', err);
            return;
        }
        console.log('Department added successfully!');
    });
}

// Adds new role to database
function addRoleToDatabase(roleName, roleID, roleSalary, roleDeptID) {
    const query = 'INSERT INTO roles (roleName, roleID, roleSalary, roleDeptID) VALUES (?, ?, ?, ?)';
    connection.query(query, [roleName, roleID, roleSalary, roleDeptID], (err, results) => {
        if (err) {
            console.error('Error adding role:', err);
            return;
        }
        console.log('Role added successfully!');
    });
}

// Adds new employee to database
function addEmployeeToDatabase(empFirstName, empLastName, empDeptID, empRoleID, empMgrID) {
    const query = 'INSERT INTO roles (empFirstName, empLastName, empDeptID, empRoleID, empMgrID) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [empFirstName, empLastName, empDeptID, empRoleID, empMgrID], (err, results) => {
        if (err) {
            console.error('Error adding role:', err);
            return;
        }
        console.log('Employee added successfully!');
    });
}

// Updates an existing database role
function updateRoleToDatabase(updtID, updtTitle, updtSalary, updtDeptID) {
    const query = 'UPDATE roles SET title = ?, salary = ?, deptartment_id = ? WHERE id = ?';
    connection.query(query, [updtTitle, updtSalary, updtDeptID, updtID], (err, results) => {
        if (err) {
            console.error('Error updating role:', err);
            return;
        }
        console.log('Role changed successfully!');
    });
}

function sumSalariesByDepartment(sumDeptID) {
    const query = `
        SELECT d.dept_name, SUM(r.salary) AS total_salary
        FROM departments d
        JOIN roles r ON d.id = r.department_id
        WHERE d.id = ?
        GROUP BY d.id, d.dept_name;
    `;

    connection.query(query, [sumDeptID], (err, results) => {
        if (err) {
            console.error('Error calculating salaries by department:', err);
            return;
        }

        console.log('Salaries by Department:', results);
    });
}

function deleteDepartmentFromDatabase(dltDeptID) {
    const getDeptNameQuery = 'SELECT dept_name FROM departments WHERE id = ?';
    connection.query(getDeptNameQuery, [dltDeptID], (err, results) => {
        if (err) {
            console.error('Error retrieving department name:', err);
            return;
        }

        const departmentName = result[0].dept_name;

    inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'confirmDelete',
                message: `Are you sure you want to delete the department "${departmentName}"?`,
            }
        ])
        .then((answers) => {
            if (answers.confirmDelete) {
                const deleteQuery = 'DELETE FROM departments WHERE id = ?';
                connection.query(deleteQuery, [dltDeptID], (err, result) => {
                    if (err) {
                        console.error('Error deleting department:', err);
                        return;
                    }
                    console.log('Department deleted successfully!');
                });
            } else {
                console.log('Deletion cancelled.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
)};

module.exports = startProcess;