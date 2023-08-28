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
]

function startProcess(initChoice) {
    let query;

    switch(initChoice) {
        case "View All Departments": 
            query = "SELECT * FROM departments";
            connection.query(query, (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    return;
                }
                console.log('All Departmeents:', results);
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
            return deptName, deptID;
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
            return roleName, roleID, roleSalary, roleDeptID;
        case "Add An Employee":
            query = inquirer.prompt(addAnEmp)
            .then((answers) => {
                const empFirstName = answers.empFirstName;
                const empLastName = answers.empLastName;
                const empDeptID = answers.empDeptID;
                const empRoleID = answers.empRoleID;
                const empMgrID = empMgrID;
                addEmployeeToDatabase(empFirstName, empLastName, empDeptID, empRoleID, empMgrID);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            return empFirstName, empLastName, empDeptID, empRoleID, empMgrID;
        case "Update An Employee Role":
            query = inquirer.prompt(updateRole)
            .then((answers) => { // Build out functionality
                const updtID = answers.updtID;
                const updtTitle = answers.updtTitle;
                const updtSalary = answers.updtSalary;
                const updtDeptID = answers.updtDeptID;
                updateRoleToDatabase(updtID, updtTitle, updtSalary, updtDeptID);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            return updtID, updTitle, updtSalary, updtDeptID;
    }
};

function addDepartmentToDatabase(deptName, deptID) {
    const query = 'INSERT INTO departments (deptName, deptID) VALUES (?, ?)';
    connection.query(query, [deptName, deptID], (err, result) => {
        if (err) {
            console.error('Error adding department:', err);
            return;
        }
        console.log('Department added successfully!');
    });
}

function addRoleToDatabase(roleName, roleID, roleSalary, roleDeptID) {
    const query = 'INSERT INTO roles (roleName, roleID, roleSalary, roleDeptID) VALUES (?, ?, ?, ?)';
    connection.query(query, [roleName, roleID, roleSalary, roleDeptID], (err, result) => {
        if (err) {
            console.error('Error adding role:', err);
            return;
        }
        console.log('Role added successfully!');
    });
}

function addEmployeeToDatabase(empFirstName, empLastName, empDeptID, empRoleID, empMgrID) {
    const query = 'INSERT INTO roles (empFirstName, empLastName, empDeptID, empRoleID, empMgrID) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [empFirstName, empLastName, empDeptID, empRoleID, empMgrID], (err, result) => {
        if (err) {
            console.error('Error adding role:', err);
            return;
        }
        console.log('Employee added successfully!');
    });
}

function updateRoleToDatabase(updtID, updtTitle, updtSalary, updtDeptID) {
    const query = 'UPDATE roles SET title = ?, salary = ?, deptartment_id = ? WHERE id = ?';
    connection.query(query, [updtTitle, updtSalary, updtDeptID, updtID], (err, result) => {
        if (err) {
            console.error('Error updating role:', err);
            return;
        }
        console.log('Role changed successfully!');
    });
}

function closeConnection() {
    connection.end(err => {
        if (err) {
            console.error('Error closing the connection:', err);
            return;
        }
        console.log('Connection closed');
    });
}

module.exports = startProcess;