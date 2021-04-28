INSERT INTO departments (name)
VALUES ('Ranch'),
('Barn'),
('Stable');

INSERT INTO roles (title, salary, department_id)
VALUES ('Rancher', 7000.00, 1),
('Vet', 10000.00, 1),
('Manager', 8000.00, 2),
('Milker', 5000.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Jan', 'Pol', 2, 1),
('Foster', 'Farm', 1, 2),
('Maribel', 'Ellison', 3, 2),
('Justin', 'Ellison', 3, 2),
('Coco', 'Milk', 4, 3);