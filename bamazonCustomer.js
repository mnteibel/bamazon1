var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	connection.query("SELECT * FROM products", function(err, res) {
		for(var i = 0; i < res.length; i++) {
			console.log(res[i].id + " " + res[i].product_name + " $" + res[i].price)
		}
	})
	buyItem();
});

function buyItem() {
	connection.query("SELECT * FROM products", function(err, res) {
		inquirer.prompt([
		{
			name: "id",
			message: "What id number would you like to buy?"
		},
		{
			name: "quantity",
			message: "How many would you like to buy?"
		}]).then(function(answers){
			var idNumber = answers.id;
			var quantity = answers.quantity;

			var currentQuantity;
			var newQuantity;
			for (var i = 0; i < res.length; i++) {
				if (parseFloat(idNumber) === res[i].id) {
					currentQuantity = res[i].stock_quantity
				}
			}
			if (currentQuantity - quantity < 0) {
				console.log("Insufficient quantity!")
				updateQuantity(idNumber, currentQuantity)
			}
			else {
				newQuantity = currentQuantity - quantity
				console.log(newQuantity)
				updateQuantity(idNumber, newQuantity)
			}
		})
	})
}

function updateQuantity(item,quantity) {
	var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [{
        stock_quantity: quantity
    }, {
        id: item
    }
    ])
    connection.end();
}