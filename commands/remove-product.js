/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: remove-product.js
Created:  2023-06-21T16:58:32.270Z
Modified: 2023-06-21T16:58:32.270Z

Description: description
*/

const removeProduct = async (product_id, options, databaseConnection, productModel) => {

    if (product_id == null || product_id === '') {
        console.log('Please enter a valid product ID. Use list-products to find the ID of the product you want to remove.');
        return;
    }

    await databaseConnection.sync();

    const product = await productModel.findByPk(product_id);

    if (product == null) {
        console.log('A product with that ID could not be found.');
        return;
    }

    await product.destroy();

    console.log('Product removed successfully!');

};

module.exports = removeProduct;