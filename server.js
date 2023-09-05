const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createPool(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

app.use((req, res) => {
  res.status(404).end();
});

const inquirer = require('inquirer');

const choiceList = ['View All Departments', 'View All Roles', 'View All Employees', 'View All Employees by Manager', 'View All Employees by Department', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Manager', 'Sum Salaries by Department', 'Delete a Department', 'Delete a Role', 'Delete an Employee', 'Exit'];

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
    },
];

const viewByDept = [
    {
        type: 'input',
        message:  'What is the Department ID of whom you want to view direct reports?',
        name: 'deptID'
    },
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
    },
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
    },
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
    },
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
    },
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
    console.log('Starting process...');

    while (true) {
        const { initChoice } = await inquirer.prompt(questions);
        console.log('Selected choice:', initChoice);

    switch(initChoice) {
        case "View All Departments": 
            try {
                const [departments] = await db.query('SELECT * FROM departments');
                console.table(departments);
            } catch (err) {
                console.error('Error:', err);
            }
            break;
        
          case "View All Roles":
            try {
                const [roles] = await db.query(`
                    SELECT
                        r.id AS Role_ID,
                        r.title AS Role_Title,
                        r.salary AS Salary,
                        d.dept_name AS Department_Name
                    FROM roles r
                    LEFT JOIN departments d ON r.department_id = d.id
                `);
                console.table(roles);
            } catch (err) {
                console.error('Error:', err);
            }
            break;

            case "View All Employees":
              try {
                  const query = `
                      SELECT 
                          e.id AS employee_id,
                          e.first_name,
                          e.last_name,
                          r.title AS role_title,
                          d.dept_name AS department,
                          r.salary,
                          CONCAT(m.first_name, ' ', m.last_name) AS manager
                      FROM employees e
                      LEFT JOIN roles r ON e.role_id = r.id
                      LEFT JOIN departments d ON r.department_id = d.id
                      LEFT JOIN employees m ON e.manager_id = m.id
                  `;
                  const [employees] = await db.query(query);
                  console.table(employees);
              } catch (err) {
                  console.error('Error:', err);
              }
              break;
      
        case "View All Employees by Manager":              
                try {
                  const answers = await inquirer.prompt(viewByMgr);
                  const mgrID = answers.mgrID;
                  const [employees] = await db.query(`SELECT * FROM employees WHERE manager_id = ?`, mgrID);
                  console.table(employees);
                } catch (err) {
                    console.error('Error:', err);
                }
            break;

        case "View All Employees by Department":
                try {
                  const answers = await inquirer.prompt(viewByDept);
                  const deptID = answers.deptID;
                  const [employees] = await db.query(`
                  SELECT employees.id, employees.first_name, employees.last_name
                  FROM employees 
                  INNER JOIN roles ON employees.role_id = roles.id
                  WHERE roles.department_id = ?`, deptID);
                  console.table(employees);
                } catch (err) {
                    console.error('Error:', err);
                }
            break;

        case "Add A Department":
                try {
                    const answers = await inquirer.prompt(addADept);
                    const deptID = answers.deptID;
                    const deptName = answers.deptName;
                    const newDepartment = await db.query(`INSERT INTO departments (id, dept_name) VALUES (?, ?) `, [deptID, deptName]);
                    console.log('New department added:');
                } catch (err) {
                    console.log('Error adding department:', err);
                }
            break;

        case "Add A Role":
                try {
                  const answers = await inquirer.prompt(addARole);
                  const roleTitle = answers.roleTitle;
                  const roleID = answers.roleID;
                  const roleSalary = answers.roleSalary;
                  const roleDeptID = answers.roleDeptID;
                    const newRole = await db.query(`INSERT INTO roles (id, title, salary, department_id) VALUES (?, ?, ?, ?) `, [roleID, roleTitle, roleSalary, roleDeptID]);
                    console.log('New role added:');
                } catch (err) {
                    console.log('Error adding department:', err);
                }
            break;

        case "Add An Employee":
                try {
                    const answers = await inquirer.prompt(addAnEmp);
                    const empFirstName = answers.empFirstName;
                    const empLastName = answers.empLastName;
                    const empID = answers.empID;
                    const empRoleID = answers.empRoleID;
                    const empMgrID = answers.empMgrID;
                    const newEmp = await db.query(`INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?) `, [empID, empFirstName, empLastName, empRoleID, empMgrID]);
                    console.log('New role added:')
                } catch (err) {
                    console.log('Error adding employee:', err);
                }
            break;

        case "Update An Employee Manager":
                try {
                    const answers = await inquirer.prompt(updateMgr);
                    const updtID = answers.updtID;
                    const updtMgrID = answers.updtMgrID;
                    const updtEmpMgr = await db.query(`UPDATE employees SET manager_id = ? WHERE id = ?`, [updtMgrID, updtID]);
                    console.log('Employee Manager updated:');
                } catch (err) {
                    console.log('Error updating employee:', err);
                }
              break;

        case "Sum Salaries by Department": 
                try {
                    const answers = await inquirer.prompt(sumSalaries);
                    const sumDeptID = answers.sumDeptID;
                    const [result] = await db.query(`
                    SELECT SUM(roles.salary) AS total_budget 
                    FROM employees
                    INNER JOIN roles ON employees.role_id = roles.id
                    WHERE roles.department_id = ?`, sumDeptID);
                    console.log(`Total salary for department ${sumDeptID}: ${result[0].total_budget}`);
            } catch (error) {
                console.error('Error:', error);
            }
        break;

        case "Delete a Department":
                try {
                    const answers = await inquirer.prompt(deleteDept);
                    const dltDeptID = answers.dltDeptID;
                    const dltDept = await db.query(`DELETE FROM departments WHERE id = ?`, dltDeptID);
                    console.log('Department deleted');
                } catch (err) {
                    console.error('Error deleting role:', err);
                }
            break;

        case "Delete a Role":
            try {
                const answers = await inquirer.prompt(deleteRole);
                const dltRoleID = answers.dltRoleID;
                const dltRole = await db.query(`DELETE FROM roles WHERE id = ?`, dltRoleID);
                    console.log('Role deleted');
            } catch (err) {
                console.error('Error deleting role:', err);
            }
        break;

        case "Delete an Employee":
                try {
                    const answers = await inquirer.prompt(deleteEmp);
                    const dltEmpID = answers.dltEmpID;
                    const dltEmp = await db.query(`DELETE FROM employees WHERE id = ?`, dltEmpID);
                    console.log('Employee deleted');
                } catch (err) {
                    console.error('Error deleting employee:', err);
                }
            break;

        case "Exit":
            console.log("Exiting...");
            return;
        
        }
      
  }
}

startProcess();