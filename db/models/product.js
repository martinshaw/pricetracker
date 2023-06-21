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
        productId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productAmazonId: DataTypes.STRING,
        productName: DataTypes.STRING,
        productUrl: DataTypes.STRING,
        productImageUrl: DataTypes.STRING,
        productLatestPrice: DataTypes.FLOAT,
        productCurrency: DataTypes.STRING,
    }, {
        sequelize: connection,
        timestamps: true,
    });

    productModel.sync();

    return productModel;
};


module.exports = productModelBuilder;