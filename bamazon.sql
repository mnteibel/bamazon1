DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price INTEGER(100),
  stock_quantity INTEGER(100),
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tv", "Electronics", 200, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("T-Shirt", "Clothes", 25, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Camera", "Electronics", 150, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Potato Chips", "Food", 5, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Head Lamp", "Electronics", 50, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cookie Cake", "Food", 18, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Computer", "Electronics", 1000, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee Table", "Furniture", 50, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Catcher In The Rye", "Books", 10, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bonsai Tree", "Plants", 50, 2);

SELECT * FROM products