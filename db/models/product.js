/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: product.js
Created:  2023-06-21T16:32:11.327Z
Modified: 2023-06-21T16:32:11.327Z

Description: description
*/

const { Sequelize, DataTypes } = require('sequelize');

const productModelBuilder = (connection) => {
    const productModel = connection.define('Product', {
        product_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product_amazon_id: DataTypes.STRING,
        product_name: DataTypes.STRING,
        product_url: DataTypes.STRING,
        product_image_url: DataTypes.STRING,
        product_latest_price: DataTypes.FLOAT,
        product_currency: DataTypes.STRING,
    }, {
        sequelize: connection,
        timestamps: true,
    });

    productModel.sync();

    return productModel;
};


module.exports = productModelBuilder;