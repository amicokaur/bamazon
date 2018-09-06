DROP DATABASE IF EXISTS bamazon_db;
CREATE DATEBASE bamazon_db;
USE bamazon_db;
CREATE TABLE products(
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price DECIMAL(10, 2),
    stock_quantity INTEGER(10),
    PRIMARY KEY(id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Play-Doh', 'Toys', 20.99, 10), ('Rocketbook Notebook', 'office products', 26.99, 7);