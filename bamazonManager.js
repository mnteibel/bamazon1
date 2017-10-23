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
	openingScreen();
});


function openingScreen() {
	inquirer.prompt([
	{
		name: "prompt",
		type: "list",
		message:"Manager Mode!",
		choices:["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
	}]).then(function(answer){
		var choice = answer.prompt
		console.log(choice)
		if (choice === "View Products for Sale") {
			viewProducts();
		}
		if (choice === "View Low Inventory") {
			viewLow();
		}
		if (choice === "Add to Inventory") {
			addTo();
		}
		if (choice === "Add New Product") {
			addNewProduct();
		}
	});
}

function viewProducts() {
	connection.query("SELECT * FROM products", function(err, res) {
		for(var i = 0; i < res.length; i++) {
			console.log(res[i].id + " " + res[i].product_name + " " + res[i].department_name + " $" + res[i].price + " " + res[i].stock_quantity)
		}
		askAgain();
	});
}

function viewLow() {
	console.log("Less than 5 in inventroy")
	connection.query("SELECT * FROM products", function(err, res) {
		for(var i = 0; i < res.length; i++) {
			if (res[i].stock_quantity < 6) {
				console.log(res[i].id + " " + res[i].product_name + " " + res[i].department_name + " $" + res[i].price + " " + res[i].stock_quantity)
			}
		}
		askAgain();
	})
}

function addTo() {
	connection.query("SELECT * FROM products", function(err, res) {
		inquirer.prompt([
		{
			name: "id",
			message: "What id number would you like to add too?"
		},
		{
			name: "quantity",
			message: "How many would you like to add?"
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
			newQuantity = parseFloat(currentQuantity) + parseFloat(quantity)
			connection.query("UPDATE products SET ? WHERE ?", 
				[{
					stock_quantity: newQuantity
				}, {
					id: idNumber
				}
				])
			console.log("Product Added")
		askAgain();
		})
	})
}

function addNewProduct() {
	inquirer.prompt([
	{
		name: "product",
		message: "What item would you like to database?"
	},
	{
		name: "category",
		message: "What category is this product in?"
	},
	{
		name: "price",
		message: "What is the price?"
	}, {
		name: "stock",
		message: "How much will be in stock?"
	}
	]).then(function(answers){
		var product = answers.product;
		var category = answers.category;
		var price = answers.price;
		var stock = answers.stock;
		var query = connection.query(
			"INSERT INTO products SET ?",
			{
				product_name: product,
				department_name: category,
				price: price,
				stock_quantity: stock
			})
		askAgain();
	})
}

function askAgain() {
	inquirer.prompt([
	{
		name: "ask",
		type: "list",
		message: "Would you like to manage anything else?",
		choices: ["Yes", "No"]
	}
	]).then(function(answer){
		var answer = answer.ask
		if (answer === "Yes") {
			openingScreen()
		}
		else {
			connection.end()
		}
	})
}
