/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.js
Created:  2023-06-21T16:19:50.895Z
Modified: 2023-06-21T16:19:50.895Z

Description: description
*/

const dbConnection = require('./db/connection');
const productModel = require('./db/models/product')(dbConnection);

const listProducts = require('./commands/list-products');
const addProduct = require('./commands/add-product');

const { Command } = require('commander');
const program = new Command();

program
    .name('pricetracker')
    .description('Track prices of products on Amazon')
    .version('0.0.1');

program.command('list-products')
    .description('List all products being tracked')
    .action((str, options) => listProducts(str, options, dbConnection, productModel));

program.command('add-product <product_url>')
    .description('Add a product to be tracked')
    .action((product_url, options) => addProduct(product_url, options, dbConnection, productModel));

program.parse();