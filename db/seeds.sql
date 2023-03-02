INSERT INTO departments (id, department_name)
VALUES (1,"Delivery"),
       (2,"Engineering"),
       (3,"Quality"),
       (4,"Legal"),
       (5,"Procurement");

INSERT INTO roles (id, role_title, role_salary, department_id)
VALUES (1,"Product Owner",30000 , 1),
       (2,"Tech Lead", 40000, 2),
       (3,"Frontend Engineer", 35000, 2),
       (4,"Backend Engineer", 35000, 2),
       (5,"Scrum Master", 40000, 1),
       (6,"Delivery Manager", 45000, 1),
       (7,"Tester", 35000, 3);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Baker", "Reed", 1,2),
       (2,"Orla","Phillips",2,2),
       (3, "Clark", "Brock",2,4),
       (4, "Cameron", "Norris", 3,6),
       (5, "Madaline", "Waters", 3,1),
       (6, "Quinn", "Marshall", 4,1),
       (7, "Imani", "Pratt", 5,2),
       (8, "Giselle", "Chan", 6,5),
       (9, "Samson", "Chapman", 7,6), 
       (10, "Elvis", "Atkinson", 7,1);