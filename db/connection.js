/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: connection.js
Created:  2023-06-21T16:35:12.470Z
Modified: 2023-06-21T16:35:12.470Z

Description: description
*/

const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../database.db'),
    logging: false,
});

module.exports = sequelize;