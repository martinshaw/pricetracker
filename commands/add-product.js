/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: add-product.js
Created:  2023-06-21T16:58:32.270Z
Modified: 2023-06-21T16:58:32.270Z

Description: description
*/

const addProduct = async (product_url, databaseConnection, productModel) => {

    const validateAmazonProductUrl = (value) => {
        // get the product ID B0140RDK8W from the URL using regex
        //http://www.amazon.com/gp/product/B0140RDK8W/ref=s9_simh_gw_g107_i2_r?ie=UTF8&fpl=fresh&pf_rd_m=ATVPDKIKX0DER&pf_rd_s=desktop-1&pf_rd_r=0539QT0WGAX6VJZ73PV9&pf_rd_t=36701&pf_rd_p=2437869742&pf_rd_i=desktop
        
        const asinRegex = /(?:[/dp/]|$)([A-Z0-9]{10})/g;
        const match = asinRegex.exec(value);

        if (match && match.length > 1) return true;
        else return 'Please enter a valid Amazon URL';
    };

    const filterAmazonProductIdFromUrl = (value) => {
        const asinRegex = /(?:[/dp/]|$)([A-Z0-9]{10})/g;
        const match = asinRegex.exec(value);
        return match[1];
    };


    if (validateAmazonProductUrl(product_url) !== true) {
        console.log('Please enter a valid Amazon URL');
        return;
    }

    const productAmazonUrl = product_url;
    const productAmazonSID = filterAmazonProductIdFromUrl(product_url);

    if (productAmazonUrl == null || productAmazonUrl === '') {
        console.log('Please enter a valid Amazon URL');
        return;
    }

    // This line stops the program so that Sequelize can connect to the database and ensure that the latest
    //   changes are reflected in the database before we try to read from it.
    await databaseConnection.sync();

    // This returned an object containing the product data, or null if no product was found.
    const productCheck = await productModel.findOne({
        where: {
            productAmazonId: productAmazonSID,
        }
    });

    if (productCheck) {
        console.log('Product is already being tracked!');
        return;
    }

    // This creates a new product model instance and saves it to the database as a new table row. 
    const newProduct = await productModel.create({
        productAmazonId: productAmazonSID,
        productName: 'Product Name',
        productUrl: productAmazonUrl,
        productImageUrl: 'https://amazon.com/images/product.png',
        productLatestPrice: 123.45,
        productCurrency: 'USD',
    });

    console.log('Product added successfully with ID: ' + newProduct.productId + ' and Amazon ID: ' + newProduct.productAmazonId + ' !');

};

module.exports = addProduct;