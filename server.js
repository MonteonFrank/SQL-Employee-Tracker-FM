//Import and require express
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
//Import and require inquirer
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Connect to database
const db = mysql.createConnection(
  {
    //MySQL Host
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password and database
    password: 'test123',
    database: 'employee_tracker_db'
  },
  console.log(`Connected to the employee_tracker_db database. 🤪`)
);


//Initial Function using to show options to the user and call functions based on the selection
function init (){
    inquirer.prompt([{
          type: 'list',
          message: 'Please add select an option',
          name: 'employeetracker',
          choices: ['View all departments', 'View all roles', 'View all employees', 'Add Department', 'Add Role', 'Add Employee', 'Update an employee Role', 'Quit Program'],
      }])
    .then((answer) => {
      //Function to show all the departments
      if (answer.employeetracker == 'View all departments'){
          db.query(`SELECT * from departments;`, (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);
            console.log('\n')
            init();
          });
      }
      //Function to show all the roles
      else if (answer.employeetracker  == 'View all roles'){
        db.query(`SELECT roles.id, roles.role_title, departments.department_name, roles.role_salary FROM roles JOIN departments ON roles.department_id = departments.id;`, (err, result) => {
          if (err) {
            console.log(err);
          }
          console.table(result);
          console.log('\n')
          init();
        });
        }
      //Function to show all employees
      else if (answer.employeetracker  == 'View all employees'){
          db.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.role_title, departments.department_name, roles.role_salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager_name FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS managers ON employees.manager_id = managers.id;`, (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);
            console.log('\n')
            init();
          });
      }
      //Calls function to add a new department
      else if (answer.employeetracker  == 'Add Department'){
            console.log('Add Department')
            console.log('\n')
            adddepartment();
      }
      //Calls function to add a new fole
      else if (answer.employeetracker  == 'Add Role'){
            console.log('Add Role')
            console.log('\n')
            addrole();
      }
      //Calls function to add new a new employee
      else if (answer.employeetracker  == 'Add Employee'){
            console.log('Add Employee')
            addemployee();
      }
      //Calls function to update the employee's role
      else if (answer.employeetracker  == 'Update an employee Role'){
            console.log('Update an employee Role');
            updateEmployeeRole();
      }
      //Calls the quit program to close the program
      else if(answer.employeetracker  == 'Quit Program'){
            console.log('Quit Program')
            quitProgram()
        }
      });
}

//Function to add new deparment
async function adddepartment (){
    inquirer.prompt([
        {
          type: 'input',
          message: 'What is the new department name?',
          name: 'department_name',
        }
      ]).then((answer) => {
        db.query('INSERT INTO departments SET ?', answer, (err, res) => {
            if (err) {
                 console.error(err);
                  return;
            }
            console.log(`New department ${answer.department_name} added!`);
            console.log('\n')
          
            //Go back to the main menu
            init();
       
      });
      });
}

//Function to add a new employee
async function addemployee(){

    // Wrap query to get roles in a Promise to get the list of existing roles
    const getRoles = () => {
        return new Promise((resolve, reject) => {
              db.query('SELECT id, role_title FROM roles', (err, results) => {
                  if (err) {
                        reject(err);
                  }else {
                        resolve(results);
                  }
              });
        });
    };
  // Await roles before prompting user for input
    let roles = await getRoles();
    const roleslist = roles.map(role => {
        return {
                name: role.role_title,
                value: role.id
         }
    });
      // Wrap query to get managers in a Promise to get the list of existing managers
      const getManagers = () => {
        return new Promise((resolve, reject) => {
          db.query('SELECT DISTINCT CONCAT(m.first_name, " ", m.last_name) AS manager_name, e.manager_id AS manager_id FROM employees e JOIN employees m ON e.manager_id = m.id WHERE e.manager_id IS NOT NULL', (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      };
    //Save the list of managers in a variables to show in the inquierer function
    const managers = await getManagers();
    const managerlist = managers.map(manager => {
        return {
            name: manager.manager_name,
            value: manager.manager_id
        };
    });
  //Ask the user for information to include in the database
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the new employee\'s first name?',
            name: 'firstname',
        },
        {
            type: 'input',
            message: 'What is the new employee\'s last name?',
            name: 'lastname',
        },
        {
            //With the results of the promise, provide the list of existing roles
            type: 'list',
            message: 'What is the new employee\'s role?',
            name: 'roles',
            choices: roleslist,
        },
        {
            //With the results of the promise, provide the list of existing managers
            type: 'list',
            message: 'Who is the new employee\'s manager?',
            name: 'manager',
            choices: managerlist,
        }
      ]).then((answers) => {

        //Add the information provided from the user to the database
        const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        const params = [answers.firstname, answers.lastname, answers.roles, answers.manager];
        db.query(query, params, (err, result) => {
              if (err) {
                    console.log(err);
              } else {
                    console.log(`Added new employee: ${answers.firstname} ${answers.lastname}`);
                    console.log('\n');
                    init ();
              }
        })})
}


//Add a new role
async function addrole(){
    // Wrap query to get departments in a Promise
    const getDepartments = () => {
      return new Promise((resolve, reject) => {
          db.query('SELECT id, department_name FROM departments', (err, results) => {
               if (err) {
                    reject(err);
                } else {
                     resolve(results);
                }
          });
      });
    };

  // Await departments before prompting user for input
    const departments = await getDepartments();
    const departmentlist = departments.map(department => {
          return {
                name: department.department_name,
                value: department.id
          }
    });

    //Ask the user for information to add into the DB
    inquirer.prompt([
          {
              type: 'input',
              message: 'What is the new role name?',
              name: 'title',
          },
          {
              type: 'input',
              message: 'What is the salary of the new role?',
              name: 'salary',
          },
          { 
              //Show list of departments based on the roles list
              type: 'list',
              message: 'To which department does the new role belong to?',
              name: 'department',
              choices: departmentlist,
          }
    ]).then((answers) => {
      //Add inforation into the database
      const query = 'INSERT INTO roles (role_title, role_salary, department_id) VALUES (?, ?, ?)';
      const params = [answers.title, answers.salary, answers.department];
              db.query(query, params, (err, result) => {
                    if (err) {
                         console.log(err);
                    } else {
                         console.log(`Added new role: ${answers.title}`);
                    }
              // Return to main menu
              init();
      });
    });
}


//Function to update an employee's role
async function updateEmployeeRole() {
  // Get list of employees
  const employees = await getEmployees();
  const employeeList = employees.map(employee => {
    return {
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    }
  });

  // Get list of roles
  const roles = await getRoles();
  const roleList = roles.map(role => {
    return {
      name: role.role_title,
      value: role.id
    }
  });

  // Prompt user to select an employee and a new role
  inquirer.prompt([
    {
      type: 'list',
      message: 'Which employee do you want to update?',
      name: 'employee_id',
      choices: employeeList
    },
    {
      type: 'list',
      message: 'What is the employee\'s new role?',
      name: 'role_id',
      choices: roleList
    }
  ]).then((answers) => {
    // Update the employee's role in the database
    db.query(`UPDATE employees SET role_id = ? WHERE id = ?`, [answers.role_id, answers.employee_id], (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`Employee role updated successfully.`);
      console.log('\n');
      // Go back to the main menu
      init();
    });
  });
}

// Promise to retrieve list of employees
const getEmployees = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM employees`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Promise to retrieve list of roles
const getRoles = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM roles`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function quitProgram() {
  console.log("Goodbye!");
  process.exit();
}



//Fun the init function which allows user to select the opcions
init();

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});