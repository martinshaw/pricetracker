/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: list-products.js
Created:  2023-06-21T16:27:49.264Z
Modified: 2023-06-21T16:27:49.264Z

Description: description
*/

const Table = require('cli-table');

const listProducts = async (databaseConnection, productModel) => {

    // This line stops the program so that Sequelize can connect to the database and ensure that the latest
    //   changes are reflected in the database before we try to read from it.
    await databaseConnection.sync();

    // This returned an array containing all the products in the database.
    // In a real-world application, you would probably want to limit the number of products returned,
    //   because returning thousands of products would be very slow.
    const products = await productModel.findAll();

    if (products.length === 0) {
        console.log('No products found! Use the add-product command to add a product.');
        return;
    }

    console.log('Listing all ' + products.length + ' product' + (products.length === 1 ? '' : 's'));

    // table-cli is a library that helps us to display data in a nice table format in the terminal
    const productsTable = new Table({
        // First we need to tell the table what the headings of each column are
        head: [
            'ID',
            'Amazon Product ID',
            'Product Name',
            'Product URL',
            'Product Image URL',
            'Latest Price',
            'Created At',
            'Updated At',
        ],
    });
    
    products.forEach(product => {
        // Then we add each product to the table as a row
        productsTable.push([
            product.productId,
            product.productAmazonId,
            product.productName,
            product.productUrl,
            product.productImageUrl,
            product.productLatestPrice + ' ' + product.productCurrency,
            product.createdAt,
            product.updatedAt,
        ]);
    });

    // Finally, we display the table in the terminal using the .toString() method which the table-cli library provides
    console.log(productsTable.toString());

};

module.exports = listProducts