const inquirer = require('inquirer');
const sequelize = require('./config/connection');
const department = require('./models/department');
const employee = require('./models/employee');
const role = require('./models/role');

const choiceList = ['View All Departments', 'View All Roles', 'View All Employees', 'View all Employees by Manager', 'View all Employees by Department', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Manager', 'Sum Salaries by Department', 'Delete a Department', 'Delete a Role', 'Delete an Employee', 'Exit'];

// Inquirer prompt to start the process
const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'initChoice',
        choices: choiceList,
    }
  ];


const viewByMgr = [
    {
        type: 'input',
        message:  'What is the MANAGER ID of whom you want to view direct reports?',
        name: 'mgrID'
    }
];

const viewByDept = [
    {
        type: 'input',
        message:  'What is the Department ID of whom you want to view direct reports?',
        name: 'deptID'
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
        message:  'What is the TITLE of the role?',
        name: 'roleTitle'
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

const updateMgr = [
    {
        type: 'input',
        message:  'What is the EMPLOYEE ID that needs a manager update?',
        name: 'updtID'
    },
    {
        type: 'input',
        message:  'What is the new MANAGER ID for this employee?',
        name: 'updtMgrID'
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

const deleteRole = [
    {
        type: 'input',
        message:  'What is the ROLE ID you want to delete?',
        name: 'dltRoleID'
    },
];

const deleteEmp = [
    {
        type: 'input',
        message:  'What is the EMPLOYEE ID you want to delete?',
        name: 'dltEmpID'
    },
];
// async loop to queue up selections and to allow for loop exit
async function startProcess() {
    let shouldContinue = true;

    do {
        const { initChoice } = await inquirer.prompt(questions);

    switch(initChoice) {
        case "View All Departments": 
            (async () => {
            try {
                const departments = await departments.findAll();
                console.log(departments);
            } catch (err) {
                console.error('Error:', err);
            }
            })();
            break;
        
            
        case "View All Roles":
            (async () => {
                try {
                    const roles = await roles.findAll();
                    console.log(roles);
                } catch (err) {
                    console.error('Error:', err);
                }
                })();
                break;

        case "View All Employees":
            (async () => {
                try {
                    const employees = await employees.findAll();
                    console.log(employees);
                } catch (err) {
                    console.error('Error:', err);
                }
                })();
                break;
        
        case "View All Employees by Manager":
            inquirer.prompt(viewByMgr)
            .then(async (answers) => { 
                const mgrID = answers.mgrID;

                try {
                    const employees = await employee.findAll({
                        where: { manager_id: mgrID }
                    });
                    console.log(employees);
                } catch (err) {
                    console.error('Error:', err);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
            break;

        case "View All Employees by Department":
            inquirer.prompt(viewByDept)
            .then(async (answers) => { 
                const deptID = answers.deptID;

                try {
                    const employees = await employee.findAll({
                        include: [
                            {
                                model: Role,
                                where: {
                                    department_id: deptID
                                }
                            }
                        ]
                    });
                    console.log(employees);
                } catch (err) {
                    console.error('Error:', err);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
            break;

        case "Add A Department":
            inquirer.prompt(addADept)
            .then(async (answers) => {
                const deptName = answers.deptName;
                const deptID = answers.deptID;
                try {
                    const newDepartment = await department.create({
                        dept_name: deptName,
                        id: deptID
                    });
                    console.log('New department added:', newDepartment)
                } catch (err) {
                    console.log('Error adding department:', err);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
            break;

        case "Add A Role":
            inquirer.prompt(addARole)
            .then(async (answers) => {
                const roleTitle = answers.roleTitle;
                const roleID = answers.roleID;
                const roleSalary = answers.roleSalary;
                const roleDeptID = answers.roleDeptID;
                try {
                    const newRole = await role.create({
                        id: roleID,
                        title: roleTitle,
                        salary: roleSalary,
                        dept_id: roleDeptID
                    });
                    console.log('New role added:', newRole)
                } catch (err) {
                    console.log('Error adding department:', err);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
            break;

        case "Add An Employee":
            inquirer.prompt(addAnEmp)
            .then(async (answers) => {
                const empFirstName = answers.empFirstName;
                const empLastName = answers.empLastName;
                const empID = answers.empID;
                const empRoleID = answers.empRoleID;
                const empMgrID = answers.empMgrID;
                try {
                    const newEmp = await employee.create({
                        id: empID,
                        first_name: empFirstName,
                        last_name: empLastName,
                        role_id: empRoleID,
                        manager_id: empMgrID
                    });
                    console.log('New role added:', newEmp)
                } catch (err) {
                    console.log('Error adding employee:', err);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
            break;

        case "Update An Employee Manager":
            inquirer.prompt(updateMgr)
            .then(async (answers) => { 
                const updtID = answers.updtID;
                const updtMgrID = answers.updtMgrID;

                try {
                    const [numRowsUpdated, updatedMgr] = await employee.update(
                        {
                            manager_ID: updtMgrID,
                        },
                        {
                            where: { id: updtID }
                        }
                    );
                    if (numRowsUpdated > 0) {
                        console.log('Employee manager updated successfully:', updatedMgr);
                    } else {
                        console.log('No role was updated.');
                    }
                } catch (err) {
                    console.error('Error updating employee:', err);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
            break;

        case "Sum Salaries by Department":
            inquirer.prompt(sumSalaries)
            .then(async (answers) => { 
                const sumDeptID = answers.sumDeptID;

                try {
                    const sumResult = await role.sum('salary', {
                        include: [
                            {
                                model: employee,
                                where: {
                                    '$role.department_id$': sumDeptID
                                }
                            }
                        ],
                        includeIgnoreAttributes: false,
                        includeModel: role
                    });
                    console.log(`Total salary for department ${sumDeptID}: ${sumResult}`);
            } catch (error) {
                console.error('Error:', error);
            }
        });
        break;

        case "Delete a Department":
            inquirer.prompt(deleteDept)
            .then(async (answers) => { 
                const dltDeptID = answers.dltDeptID;
                
                try {
                    const numRowsDeleted = await department.destroy({
                        where: { id: dltDeptID }
                    });

                    if (numRowsDeleted > 0) {
                        console.log('Role deleted succesfully.');
                    } else {
                        console.log('No role was deleted.');
                    }
                } catch (err) {
                    console.error('Error deleting role:', err);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
            break;

        case "Delete a Role":
        inquirer.prompt(deleteRole)
        .then(async (answers) => { 
            const dltRoleID = answers.dltRoleID;
            
            try {
                const numRowsDeleted = await role.destroy({
                    where: { id: dltRoleID }
                });

                if (numRowsDeleted > 0) {
                    console.log('Role deleted succesfully.');
                } else {
                    console.log('No role was deleted.');
                }
            } catch (err) {
                console.error('Error deleting role:', err);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        break;

        case "Delete an Employee":
            inquirer.prompt(deleteEmp)
            .then(async (answers) => { 
                const dltEmpID = answers.dltEmpID;
                
                try {
                    const numRowsDeleted = await employee.destroy({
                        where: { id: dltEmpID }
                    });

                    if (numRowsDeleted > 0) {
                        console.log('Role deleted succesfully.');
                    } else {
                        console.log('No role was deleted.');
                    }
                } catch (err) {
                    console.error('Error deleting role:', err);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
            break;

        case "Exit":
            console.log("Exiting...");
            shouldContinue = false;
            break;
        
        }
    } while (shouldContinue);
}

module.exports = startProcess;