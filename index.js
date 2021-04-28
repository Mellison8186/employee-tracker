const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

// Start-up Menu
const menu = () => {
return inquirer.prompt([
    {
        type: 'list',
        name: 'menu',
        message: 'Would you like to',
        choices: ['View all departments', 
        'View all roles', 
        'View all employees', 
        'Add a department', 
        'Add a role', 
        'Add an employee', 
        'Update an employee role',
        'DELETE an employee']
    }
  ])
  .then(answer => {
      if (answer.menu === 'View all departments') {
          return (db.query(`SELECT * FROM departments`, (err, data) =>
              {
              console.table(data)
              return menu()
          }));
      }
      if (answer.menu === 'View all roles') {
          console.log(true)
        return (db.query(`SELECT * FROM roles`, (err, data) =>
        {
        console.table(data)
        return menu()
    }))}
    if (answer.menu === 'View all employees') {
        console.log(true)
      return (db.query(`SELECT * FROM employees`, (err, data) =>
      {
      console.table(data)
      return menu()
  }
    ));
  }   
   if (answer.menu === 'Add a department') {
      inquirer.prompt({ 
        type: 'input',
      name: 'deptName',
      message: 'Input department name'}).then(item => {
        return (db.query(`INSERT INTO departments (name) VALUES (?)`, item.deptName,(err, data) =>
        {
        return menu()
      }))
      })
}
if (answer.menu === 'Add a role') {
    inquirer.prompt([{ 
      type: 'input',
    name: 'roleName',
    message: 'Input role name'

},
{
    type: 'input',
    name: 'roleSalary',
    message: 'Input role salary'
}]).then(item => {
      return (db.query(`INSERT INTO role (title, salary) VALUES (?,?)`, [item.roleName, item.roleSalary],(err, data) =>
      {
      return menu()
    }))
    })
}
// if (answer.menu === 'DELETE an employee') {
//   console.log(true)
// return (db.query(`SELECT FROM employees WHERE id = ?`, (err, data) =>
// {
// console.table(data)
// return menu()
// }
// ));
// }
});
};
menu();