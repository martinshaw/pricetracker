/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: list-products.js
Created:  2023-06-21T16:27:49.264Z
Modified: 2023-06-21T16:27:49.264Z

Description: description
*/

const Table = require('cli-table');

const listProducts = async (_, options, dbConnection, productModel) => {

    await dbConnection.sync();

    const products = await productModel.findAll();

    if (products.length === 0) {
        console.log('No products found! Use the add-product command to add a product.');
        return;
    }

    console.log('Listing all ' + products.length + ' product' + (products.length === 1 ? '' : 's'));

    const productsTable = new Table({
        head: [
            'ID',
            'Amazon Product ID',
            'Product Name',
            'Product URL',
            'Product Image URL',
            'Latest Price',
        ],
    });
    
    products.forEach(product => {
        productsTable.push([
            product.product_id,
            product.product_amazon_id,
            product.product_name,
            product.product_url,
            product.product_image_url,
            product.product_latest_price + ' ' + product.product_currency,
        ]);
    });

    console.log(productsTable.toString());

};

module.exports = listProducts