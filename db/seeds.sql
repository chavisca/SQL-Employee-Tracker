INSERT INTO departments (id, dept_name)
VALUES (10000, "Frontier"),
    (11000, "R&D"),
    (12000, "Futures"),
    (99000, "Admin")

INSERT INTO roles (id, title, salary, department_id)
VALUES (10001, "Scouting", 54000.00, 10000),
       (10999, "Scouting Manager", 177600.00, 10000),
       (11001, "R&D Guinea", 60000.00, 11000),
       (11999, "R&D Manager", 120000.00, 11000),
       (12001, "Delivery Crew", 55000.00, 12000),
       (12999, "Delivery Manager", 80000.00, 12000)
       (99999, "Council of Ricks", 999999.00, 99000)

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Daniel", "Boone", 10001, 9901),
    (002, "David", "Crockett", 10001, 9901),
    (003, "Martin", "McFly", 11001, 9997),
    (004, "Doctor", "Zoidberg", 12001, 9998),
    (005, "Philip", "Frye", 12001, 9998),
    (006, "Amy", "Wong", 12001, 9998),
    (007, "Turanga", "Leela", 12001, 9998),
    (008, "Bender", "Robot", 12001, 9998),
    (9901, "Paul", "Bunyan", 10099, 9999),
    (9997, "Doctor", "Brown", 11999, 9999),
    (9998, "Hermes", "Conrad", 12999, 9999),
    (9999, "Rick", "Sanchez", 99999, NULL)