const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
import commonElements from '../testElements/commonElements';
import productListPageElements from '../testElements/productListPage';
import productDescriptionPageElements from '../testElements/productDescriptionPage';
import shoppingCartPageElements from '../testElements/shoppingCartPage';
import shippingPageElements from '../testElements/shippingPage';

const commonElementObj = new commonElements();
const productListPageElementObj = new productListPageElements();
const productDescriptionPageElementObj = new productDescriptionPageElements();
const shoppingCartPageElementObj = new shoppingCartPageElements();
const shippingPageElementObj = new shippingPageElements();

let expectedProductDetails;
let allProductSubtotal = 0, expectedTotalQuantity = 0, expectedTotalPrice = 0;

Given('some products are added to my cart', (dataTable) => {
    let expectedProductName, expectedSalePrice, expectedDesignerName, expectedCollectionName,
    expectedCode, expectedFinish, expectedShade, expectedQuantity;
    expectedProductDetails = [];

    //add the given products to my cart one-by-one
    for(let i=1; i<dataTable.rawTable.length; i++){
        let productName = dataTable.rawTable[i][0], finish = dataTable.rawTable[i][1],
        shade = dataTable.rawTable[i][2], quantity = dataTable.rawTable[i][3],
        bulb = dataTable.rawTable[i][4];

        //search the given product
        cy.searchProduct(productName,productName);
        //click on the given product from the product list page
        productListPageElementObj.getProductName(productName).click({force:true});

        //select or enter the given product details
        cy.enterProductDetails(finish,shade,quantity,bulb).then(() => {
            //collect the product name, quantity, designer name, product price, collection name 
            //finish, shade and product code details
            productDescriptionPageElementObj.getProductName().then((productName) => {
                expectedProductName = productName.text();
            });
            productDescriptionPageElementObj.getProductDesignerName().then((designerName) => {
                expectedDesignerName = designerName.text();
            });
            productDescriptionPageElementObj.getHeaderProductPrice().then((headerPrice) => {
                expectedSalePrice = headerPrice.text();
            });
            productDescriptionPageElementObj.getCollectionName().then((collectionName) => {
                expectedCollectionName = collectionName.text();
            });
            productDescriptionPageElementObj.getProductCode().then((code) => {
                expectedCode = code.text();
            });
            expectedQuantity = quantity;
            expectedFinish = finish;
            expectedShade = shade.toLowerCase() !== 'no' ? shade : null;
        }).then(() => {
            //save all product details
            expectedProductDetails.push([expectedProductName,expectedSalePrice,expectedFinish,expectedShade,expectedQuantity,expectedCode,expectedDesignerName,expectedCollectionName]);
        }); 
        
        //click on the Add to cart button
        productDescriptionPageElementObj.getAddToCartButton().click();
        //close the 'Item Added to Cart' popup in the case of no bulb
        if(bulb.toLowerCase() === 'uncheck'){
            productDescriptionPageElementObj.getPopupCloseButton().click({force:true});
            cy.wait(1000);
        }

        //validate whether the success message contains the given product name or not
        productDescriptionPageElementObj.getProductAddedMessage().contains(productName,{matchCase:false}).scrollIntoView();
        cy.wait(1000);
    }
});

When('the user hovers on my cart icon', () => {
    //set focus on the my cart
    commonElementObj.getMyCartIcon().scrollIntoView();
    //hover on my cart icon
    commonElementObj.getMyCartHover().invoke('show');
    cy.wait(1000);
});

When('validates the {string} products list', (page) => {
    //get the expected product name list 
    let expectedProductNameList = [];
    for(let i=0; i<expectedProductDetails.length; i++){
        expectedProductNameList.push(expectedProductDetails[i][0].toLowerCase().trim());
    }

    //validate the products list of given page with the expected products list
    if(page.toLowerCase() === 'my cart'){
        cy.validateProductsList(page,expectedProductNameList,commonElementObj.getMyCartProductsList());
    }else if(page.toLowerCase() === 'shopping cart'){
        cy.validateProductsList(page,expectedProductNameList,shoppingCartPageElementObj.getShoppingCartProductsList().should('be.visible'));
    }else if(page.toLowerCase() === 'shipping'){
        cy.validateProductsList(page,expectedProductNameList,shippingPageElementObj.getShippingProductsList().should('be.visible'));
    }else{
        throw new Error('The given '+page+' name is not valid. It should be either \'My Cart\', \'Shopping Cart\' or \'Shipping\'.');
    }
});

When('clicks on the View Cart button', () => {
    //click on the View Cart button
    commonElementObj.getViewCartButton().click({force:true});
    cy.wait(2000);
});

When('clicks on the Begin Checkout button', () => {
    //wait till the order summary gets loaded
    shoppingCartPageElementObj.getOrderSubtotal().should('be.visible');
    //click on the Begin Checkout button
    shoppingCartPageElementObj.getBeginCheckoutButton().click({force: true});
    cy.wait(1000);
});

Then('the {string} page should get opened', (page) =>{
    //validate whether the correct page gets opened or not
    if(page.toLowerCase() === 'shopping cart'){
        cy.url().then((currentURL) => {
            expect(currentURL.endsWith('checkout/cart/')).to.be.true;
        });
    }else if(page.toLowerCase() === 'shipping'){
        cy.title().then((currentPageTitle) => {
            expect(currentPageTitle).to.equal('Checkout');
        }); 
    }else{
        throw new Error('The given '+page+' name is not valid. It should be either \'Shopping cart\' or \'Shipping\'.');
    }
});

Then('all product details should be displayed correctly on the My Cart popover', () => {
    //get the actual/displayed products list
    commonElementObj.getMyCartProductsList().then((list) => {
        //traverse each product from the list
        for(let i=0; i<list.length; i++){
            //get the displayed product name from the list
            commonElementObj.getMyCartProductName(i).then((productName) => {
                //get the expected products list and then traverse each product from the list
                for(let j=0; j<expectedProductDetails.length; j++){

                    /* check the actual/displayed product name with the expected product name and then 
                    validate its details if a match is found */
                    if(productName.text().toLowerCase().trim() === expectedProductDetails[j][0].toLowerCase().trim()){
                        //validate the displayed product price with the expected product price
                        commonElementObj.getMyCartProductPrice(expectedProductDetails[j][0]).should('have.text',expectedProductDetails[j][1].trim());
                        //validate the displayed product quantity with the expected product quantity
                        commonElementObj.getMyCartProductQty(expectedProductDetails[j][0]).scrollIntoView().should('have.attr','data-item-qty',expectedProductDetails[j][4]);
                        
                        //click on the 'See Details' link
                        commonElementObj.getMyCartProductSeeDetailsLink(expectedProductDetails[j][0]).click({force:true});
                        //get the product options and then traverse each option
                        commonElementObj.getMyCartProductShadeFinishLabels(expectedProductDetails[j][0]).each(($el, index, $list) => {
                            //get the option name
                            let label = $el.text().toLowerCase().trim();
                            //check the option name and then validate its value with expected value
                            if(label === 'finish'){
                                commonElementObj.getMyCartProductFinish(expectedProductDetails[j][0]).should('have.text',expectedProductDetails[j][2].trim());
                            }else if(label === 'shade'){
                                commonElementObj.getMyCartProductShade(expectedProductDetails[j][0]).should('have.text',expectedProductDetails[j][3].trim());
                            }else{
                                throw new Error('The unknown '+label+' label name is found. It should be either \'Finish\' or \'Shade\'.');
                            }
                        });
                        
                        /* calculate expected total quantity by the sum of all product qty */
                        //add the product quantity to the total quantity
                        expectedTotalQuantity += Number(expectedProductDetails[j][4]);

                        /* calculate expected total price by the multiplication of all product price and qty*/
                        //convert the product price into the number
                        cy.convertPriceToNumber(expectedProductDetails[j][1]).then((price) =>{
                            //add the product quantity and price to the total price after the multiplication 
                            expectedTotalPrice += Number(price) * Number(expectedProductDetails[j][4]);
                        });
                    }
                }
            });
        }
    });
});

Then('the number of items and subtotal also should be correct as per the added products', () => {
    //validate the displayed total quantity with the expected total quantity
    commonElementObj.getMyCartTotalProductQty().should('have.text',expectedTotalQuantity);
    
    //find the total product price on the my cart
    commonElementObj.getMyCartTotalProductPrice().then((price) => {
        //convert the displayed total price into the number
        cy.convertPriceToNumber(price.text()).then((totalPrice) => {
            //validate the displayed total price with the expected total price
            expect(Number(totalPrice)).to.equal(Number(expectedTotalPrice));
        });
    });
});

Then('all product details should be displayed correctly on the Shopping Cart page', () => {
    //get the actual/displayed products list
    shoppingCartPageElementObj.getShoppingCartProductsList().then((shoppingCartList) => {      
        //traverse each product from the list
        for(let i=0; i<shoppingCartList.length; i++){
            //get the displayed product name from the list
            shoppingCartPageElementObj.getShoppingCartProductName(i).scrollIntoView().then((shoppingCartProductName) => {
                //get the expected products list and then traverse each product from the list
                for(let j=0; j<expectedProductDetails.length; j++){
                    
                    /* check the actual/displayed product name with the expected product name and then 
                    validate its details if a match is found */
                    if(shoppingCartProductName.text().toLowerCase().trim() === expectedProductDetails[j][0].toLowerCase().trim()){
                        //validate the displayed product price with the expected product price
                        shoppingCartPageElementObj.getProductPrice(expectedProductDetails[j][0]).then((price) => {
                            expect(price.text().trim()).to.equal(expectedProductDetails[j][1].trim());
                        });
                        //validate the displayed product quantity with the expected product quantity
                        shoppingCartPageElementObj.getProductQty(expectedProductDetails[j][0]).then((qty) =>{
                            let displayedProductQty = qty.attr('data-item-qty');
                            expect(displayedProductQty.trim()).to.equal(expectedProductDetails[j][4].trim());
                        });
                        //validate the displayed product collection name with the expected collection name
                        shoppingCartPageElementObj.getCollectionName(expectedProductDetails[j][0]).then((collectionName) => {
                            expect(collectionName.text().toLowerCase().trim()).to.equal(expectedProductDetails[j][7].toLowerCase().trim());
                        });
                        //validate the displayed designer name with the expected designer name
                        shoppingCartPageElementObj.getDesignerName(expectedProductDetails[j][0]).then((designerName) => {
                            expect(designerName.text().toLowerCase().trim()).to.equal(expectedProductDetails[j][6].toLowerCase().trim());
                        });

                        //find the displayed product code
                        shoppingCartPageElementObj.getProductCode(expectedProductDetails[j][0]).then((codeText) => {
                            //remove the extra chars from the code
                            let code = codeText.text();
                            code = code.replace('Item #:\n','');
                            code = code.replace(/\s/g,'');
                            //validate the displayed product code with the expected code
                            expect(code.toLowerCase().trim()).to.include(expectedProductDetails[j][5].replace(/\s/g,'').toLowerCase().trim());
                        });

                        //find the displayed product subtotal
                        shoppingCartPageElementObj.getProductSubtotal(expectedProductDetails[j][0]).then((subtotalPrice) => {
                            //convert the displayed product subtotal into the number
                            cy.convertPriceToNumber(subtotalPrice.text()).then((productSubtotal) => {
                                //convert the expected product price into the number
                                cy.convertPriceToNumber(expectedProductDetails[j][1]).then((expectedProductPrice) => {
                                    //validate the displayed product subtotal with expected subtotal by the multiplication of product price and qty
                                    expect(Number(productSubtotal)).to.equal(Number(expectedProductPrice) * Number(expectedProductDetails[j][4]));
                                    /* calculate the expected order subtotal by the sum of all product subtotal */
                                    allProductSubtotal += Number(productSubtotal);
                                });
                            });
                        });

                        //get the product options and then traverse each option
                        shoppingCartPageElementObj.getShadeFinishLabels(expectedProductDetails[j][0]).each(($el, index, $list) => {
                            //get the option name
                            let label = $el.text().toLowerCase().trim();
                            //check the option name and then validate its value with expected value
                            if(label === 'finish'){
                                shoppingCartPageElementObj.getProductFinish(expectedProductDetails[j][0]).then((finish) => {
                                    expect(finish.text().toLowerCase().trim()).to.include(expectedProductDetails[j][2].toLowerCase().trim());
                                }); 
                            }else if(label === 'shade'){
                                shoppingCartPageElementObj.getProductShade(expectedProductDetails[j][0]).then((shade) => {
                                    expect(shade.text().toLowerCase().trim()).to.include(expectedProductDetails[j][3].toLowerCase().trim());
                                });
                            }else{
                                throw new Error('The unknown '+label+' label name is found. It should be either \'Finish\' or \'Shade\'.');
                            }
                        });
                    }
                }
            });
        }
    });
});

Then('the order summary details also should be correct as per the added products', () => {
    let displayedShippingCharge;

    //set focus on the order summary
    shoppingCartPageElementObj.getShoppingCartText().should('be.visible').scrollIntoView();

    //find the displayed order subtotal
    shoppingCartPageElementObj.getOrderSubtotal().should('be.visible').then((orderSubtotalPrice) => {
        //convert the displayed order subtotal into the number
        cy.convertPriceToNumber(orderSubtotalPrice.text()).then((orderSubtotal) => {
            //validate the displayed order subtotal with the expected subtotal
            expect(Number(orderSubtotal)).to.equal(Number(allProductSubtotal));
        });
    });

    //find the displayed shipping charge and then convert it into the number
    shoppingCartPageElementObj.getShippingCharge().should('be.visible').then((chargeAmt) => {
        cy.convertPriceToNumber(chargeAmt.text()).then((shippingCharge) => {
            displayedShippingCharge = Number(shippingCharge);
        });
    });
    //find the displayed merchandise total
    shoppingCartPageElementObj.getMerchandiseTotal().should('be.visible').then((total) => {
        //convert the displayed merchandise total into the number
        cy.convertPriceToNumber(total.text()).then((merchandiseTotal) => {
            //validate the displayed merchandise total with the expected total by sum of all product subtotal and shipping charge 
            expect(Number(merchandiseTotal)).to.equal(Number(allProductSubtotal) + displayedShippingCharge);
        });
    });
});

Then('all product details should be displayed correctly on the Shipping page', () => {
    //get the actual/displayed products list
    shippingPageElementObj.getShippingProductsList().then((list) => {
        //traverse each product from the list
        for(let i=0; i<list.length; i++){
            //get the displayed product name from the list
            shippingPageElementObj.getShippingProductName(i).then((productName) => {
                //get the expected products list and then traverse each product from the list
                for(let j=0; j<expectedProductDetails.length; j++){
                    
                    /* check the actual/displayed product name with the expected product name and then 
                    validate its details if a match is found */
                    if(productName.text().toLowerCase().trim() === expectedProductDetails[j][0].toLowerCase().trim()){
                        //find the displayed product subtotal
                        shippingPageElementObj.getProductSubtotal(expectedProductDetails[j][0]).then((subtotal) => {
                            //convert the displayed product subtotal into the number
                            cy.convertPriceToNumber(subtotal.text()).then((shippingProductSubtotal) => {
                                //convert the product price into the number
                                cy.convertPriceToNumber(expectedProductDetails[j][1]).then((expectedProductAmt) => {
                                    //validate the displayed product subtotal with the expected subtotal by the multiplication of product price and qty 
                                    expect(Number(shippingProductSubtotal)).to.equal(Number(expectedProductAmt) * Number(expectedProductDetails[j][4]));
                                });
                            });
                        });

                        //validate the displayed product qty with expected product qty
                        shippingPageElementObj.getProductQty(expectedProductDetails[j][0]).should('have.text',expectedProductDetails[j][4]);
                        
                        //click on the 'See Details' link
                        shippingPageElementObj.getSeeDetailsLink(expectedProductDetails[j][0]).click({force:true});
                        //get the product options and then traverse each option                        
                        shippingPageElementObj.getShadeFinishLabels(expectedProductDetails[j][0]).each(($el, index, $list) => {
                            //get the option name                            
                            let label = $el.text().toLowerCase().trim();
                            //check the option name and then validate its value with expected value
                            if(label === 'finish'){
                                shippingPageElementObj.getProductFinish(expectedProductDetails[j][0]).should('have.text',expectedProductDetails[j][2].trim());
                            }else if(label === 'shade'){
                                shippingPageElementObj.getProductShade(expectedProductDetails[j][0]).should('have.text',expectedProductDetails[j][3].trim());
                            }else{
                                throw new Error('The unknown '+label+' label name is found. It should be either \'Finish\' or \'Shade\'.');
                            }
                        });
                    }
                }
            });
        }
    });              
});