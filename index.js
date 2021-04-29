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
            return
          }));
      }
      if (answer.menu === 'View all roles') {
        return (db.query(`SELECT * FROM roles`, (err, data) =>
        {
        console.table(data)
        return
    }))}
    if (answer.menu === 'View all employees') {
      return (db.query(`SELECT * FROM employees`, (err, data) =>
      {
      console.table(data)
      return
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
    name: 'roleTitle',
    message: 'Input role title'
},
{
    type: 'input',
    name: 'roleSalary',
    message: 'Input role salary'
},
{
  type: 'input',
  name: 'roleDept',
  message: 'Input the department number that this role is in'
}
]).then(item => {
      return (db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`,[item.roleTitle, item.roleSalary, item.roleDept],(err, data) =>
      {
      return menu()
    }))
    })
}
if (answer.menu === 'Add an employee') {
  inquirer.prompt([{ 
  type: 'input',
  name: 'firstName',
  message: 'Input first name'
},
{
  type: 'input',
  name: 'lastName',
  message: 'Input last name'
},
{
  type: 'input',
  name: 'roleID',
  message: 'Input role ID'
},
{
  type: 'input',
  name: 'mgrID',
  message: 'Input manager ID'
}]).then(item => {
    return (db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [item.firstName, item.lastName, item.roleID, item.mgrID],(err, data) =>
    {
    return menu()
  }))
  })
}
if (answer.menu === 'Update an employee role') {
  inquirer.prompt([{
    type: 'input',
    name: 'updateEmployee',
    message: 'Input employee ID in order to update'
  },
  {
    type: 'input',
    name: 'updateRoleID',
    message: `Input employee's new role ID`
  }]).then(item => {
return (db.query(`UPDATE employees SET role_id = ? WHERE id = ?`, [item.updateRoleID, item.updateEmployee], (err, data) =>
{
return menu()
}))
})
}
if (answer.menu === 'DELETE an employee') {
  inquirer.prompt([{
    type: 'input',
    name: 'employeeID',
    message: 'Input employee ID to delete employee'
  }]).then(item => {
return (db.query(`DELETE FROM employees WHERE id = ?`, item.employeeID, (err, data) =>
{
return menu()
}))
})
}}
)}
menu();