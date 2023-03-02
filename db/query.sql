SELECT * from departments;



SELECT roles.id, roles.role_title, departments.department_name, roles.role_salary 
FROM roles 
JOIN departments ON roles.department_id = departments.id;



SELECT employees.id, employees.first_name, employees.last_name, roles.role_title, departments.department_name, roles.role_salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager_name FROM employees
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees AS managers ON employees.manager_id = managers.id;

