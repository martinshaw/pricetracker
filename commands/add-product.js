/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: add-product.js
Created:  2023-06-21T16:58:32.270Z
Modified: 2023-06-21T16:58:32.270Z

Description: description
*/

const addProduct = async (product_url, options, dbConnection, productModel) => {

    await dbConnection.sync();

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

    const productCheck = await productModel.findOne({
        where: {
            product_amazon_id: productAmazonUrl
        }
    });

    if (productCheck) {
        console.log('Product is already being tracked!');
        return;
    }

    const newProduct = await productModel.create({
        product_amazon_id: productAmazonSID,
        product_name: 'Product Name',
        product_url: productAmazonUrl,
        product_image_url: 'https://amazon.com/images/product.png',
        product_latest_price: 123.45,
        product_currency: 'USD',
    });

    console.log('Product added successfully with ID: ' + newProduct.product_id + ' and Amazon ID: ' + newProduct.product_amazon_id + ' !');

};

module.exports = addProduct;