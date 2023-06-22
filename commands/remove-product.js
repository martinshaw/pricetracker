/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: remove-product.js
Created:  2023-06-21T16:58:32.270Z
Modified: 2023-06-21T16:58:32.270Z

Description: description
*/

const removeProduct = async (product_id, databaseConnection, productModel) => {

    if (product_id == null || product_id === '') {
        console.log('Please enter a valid product ID. Use list-products to find the ID of the product you want to remove.');
        return;
    }

    // This line stops the program so that Sequelize can connect to the database and ensure that the latest
    //   changes are reflected in the database before we try to read from it.
    await databaseConnection.sync();

    // This finds the product table row which has the primary key column value of product_id
    //   and returns an object containing the product data, or null if no product was found.
    const product = await productModel.findByPk(product_id);

    if (product == null) {
        console.log('A product with that ID could not be found.');
        return;
    }

    // This deletes the product table row.
    // In a real-world application, you would probably use the 'paranoid' option which Sequelize provides,
    //   also known as 'soft deleting' which adds the current date to a 'deletedAt' column instead of
    //   actually deleting the row. This allows you to recover the data later if you need to.
    // When this model is used, the 'getter' functions like 'findOne' and 'findByPk' will not return
    //   rows that have been soft deleted.
    await product.destroy();

    console.log('Product removed successfully!');

};

module.exports = removeProduct;