/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.js
Created:  2023-06-21T16:19:50.895Z
Modified: 2023-06-21T16:19:50.895Z

Description: description
*/

// This database connection describes how to connect to our database file (database.db)
const databaseConnection = require('./database/connection');

// This model describes the structure of the Product table in the database
const productModel = require('./database/models/product')(databaseConnection);

// Because the code behind each of these commands can become very long, we have moved them into separate files as functions
const listProducts = require('./commands/list-products');
const addProduct = require('./commands/add-product');
const removeProduct = require('./commands/remove-product');

// Commander is a useful library for creating command line tools.
//   It provides a help menu when you run the program with no arguments, and it handles parsing arguments for us.
const { Command } = require('commander');
const program = new Command();

program
    .name('pricetracker')
    .description('Track prices of products on Amazon')
    .version('0.0.1');

program.command('list-products')
    .description('List all products being tracked')
    .action(() => listProducts(databaseConnection, productModel));

program.command('add-product <product_url>')
    .description('Add a product to be tracked')
    .action((product_url) => addProduct(product_url, databaseConnection, productModel));

program.command('remove-product <product_id>')
    .description('Remove a product')
    .action((product_id) => removeProduct(product_id, databaseConnection, productModel));

// Now that I have described the program to Commander, this line tells Commander to parse the 
//   arguments and run the appropriate command
program.parse();