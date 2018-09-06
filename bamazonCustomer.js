var mysql = require("mysql");
 var inquirer = require("inquirer");
const cTable = require('console.table');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "bootcamp",
    database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    // start();
    displayConnection()
});

function displayConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            //manuplating res to display $ sign in price
            var pString = "$ "
            pString += res[i].price
            res[i].price = pString
            //res[i].price = "$ " + res[i].price (other way of manuplating)
        }
        console.table(res);
        start();
    });
}

function start() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "Enter Item code?"
            },
            {
                name: "quantity",
                type: "input",
                message: "Enter Quantity?"
            }
        ])

        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            quantityCheck(answer)
        });
}
function quantityCheck (answer) {
    var query= "SELECT * FROM products WHERE item_id =" 
    query+= answer.item
    connection.query(query,
         function (err, res) { 
        if (err) throw err;
        if(answer.quantity< res[0].stock_quantity){
            var x = res[0].stock_quantity-answer.quantity
            var query2 = `UPDATE products SET stock_quantity = ? WHERE item_id = ?;`
            connection.query(query2, [x, answer.item])
            displayConnection()
            var total = res[0].price*answer.quantity
            console.log("Order has been placed\n Your total $"+ total);
            
        }
else{
    console.log("SORRY! Insufficient quantity")
    displayConnection()
    }

                
 });


}
//updating query string