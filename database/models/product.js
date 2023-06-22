/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: product.js
Created:  2023-06-21T16:32:11.327Z
Modified: 2023-06-21T16:32:11.327Z

Description: description
*/

const { Sequelize, DataTypes } = require('sequelize');

// We define the database table in a database-ambiguous way here. This means that we can use the same code
//   to create the table in any database that Sequelize supports (e.g. MySQL, PostgreSQL, SQLite)

// The object returned by this function is a model (the M in MVC). We can use this model to create, read, update
//   and delete rows in the database table without having to write any SQL.

const productModelBuilder = (connection) => {
    const productModel = connection.define('Product', {

        // This provides a column 'productId' which is an auto-incrementing (meaning that we don't
        //   need to provide a number, the ID will be the highest existing ID + 1) and a primary key
        //   (meaning that it is unique and it is faster to search for a row by this ID because it is indexed)
        productId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        productAmazonId: DataTypes.STRING,
        productName: DataTypes.STRING,
        productUrl: DataTypes.STRING,
        productImageUrl: DataTypes.STRING,

        // FYI, float is just a number with a decimal point (e.g. 1.99)
        productLatestPrice: DataTypes.FLOAT,
        productCurrency: DataTypes.STRING,

    }, {
        sequelize: connection,

        // This provides columns 'createdAt' and 'updatedAt' which are automatically populated with timestamps when rows are created or updated
        timestamps: true,
    });

    // This creates the table in the database if it doesn't already exist
    productModel.sync();

    return productModel;
};


module.exports = productModelBuilder;