/* This file contains all common functions which are used in multiple step definitions
*/

import commonElements from '../integration/testElements/commonElements';
import productDescriptionPageElements from '../integration/testElements/productDescriptionPage';
import shoppingCartPageElements from '../integration/testElements/shoppingCartPage';
import shippingPageElements from '../integration/testElements/shippingPage';

const commonElementObj = new commonElements();
const productDescriptionPageElementObj = new productDescriptionPageElements();
const shoppingCartPageElementObj = new shoppingCartPageElements();
const shippingPageElementObj = new shippingPageElements();


Cypress.Commands.add('searchProduct', (searchText,searchOption) => {
    //click on the search icon
    commonElementObj.getSearchIcon().scrollIntoView().click({force:true});
    //enter the given search text into the search box
    commonElementObj.getSearchTextbox().clear().type(searchText);
    cy.wait(2000);
    //click on the given search option
    commonElementObj.getSearchOption(searchOption).click({force:true});
    cy.wait(1000);

    //validate whether the search result header contains the given search option or not
    commonElementObj.getSearchResultText().contains(searchOption,{matchCase:false});
});

Cypress.Commands.add('enterProductDetails', (finish,shade,quantity,bulb) => {
    //select the given finish value
    productDescriptionPageElementObj.getFinishDropdown().should('be.visible').scrollIntoView().select(finish);

    //select the given shade value only if the given value is not 'No'
    /* 'No' value means the shade dropdown is not present that's why the value is not provided for it */
    if(shade.toLowerCase() !== 'no'){
        productDescriptionPageElementObj.getShadeDropdown().should('be.visible').scrollIntoView().select(shade);
    }else{
        cy.log('Shade dropdown not found');
    }

    //check/uncheck the LED bulb checkbox
    /* 'No' value means the LED bulb checkbox is not present that's why the value is not provided for it */
    if(bulb.toLowerCase() === 'uncheck'){
        productDescriptionPageElementObj.getLEDBulbCheckbox().click({force:true});
    } 
    else if(bulb.toLowerCase() === 'no'){
        cy.log('LED bulb checkbox not found');
    }else{
        throw new Error('The given '+bulb+' value is not valid. It should be either \'Uncheck\' or \'No\'.');
    }

    //enter the given quantity
    productDescriptionPageElementObj.getQuantityTextbox().should('be.visible').clear().type(quantity);
});

Cypress.Commands.add('convertPriceToNumber', (price) => {
    //remove extra chars and then return the price as a number
    let num = price.split('$');
    num = num[1].trim();
    num = num.replace(',','')
    return num;   
});

Cypress.Commands.add('validateProductsList', (page,expectedProductNameList,productsListElement) => {
    //get the actual/displayed products list
    productsListElement.then((list) => {
       //traverse each product from the list
        for(let i=0; i<list.length; i++){
            //check the page name to validate list
            if(page.toLowerCase() === 'my cart'){
                //get the displayed product name from the list
                commonElementObj.getMyCartProductName(i).scrollIntoView().then((productName) => {
                    //validate whether the displayed product name is one of the expected products list or not
                    expect(productName.text().toLowerCase().trim()).to.be.oneOf(expectedProductNameList);
                });
            }else if(page.toLowerCase() === 'shopping cart'){
                //get the displayed product name from the list
                shoppingCartPageElementObj.getShoppingCartProductName(i).should('be.visible').scrollIntoView().then((productName) => {
                    //validate whether the displayed product name is one of the expected products list or not
                    expect(productName.text().toLowerCase().trim()).to.be.oneOf(expectedProductNameList);
                });
            }else if(page.toLowerCase() === 'shipping'){
                //get the displayed product name from the list
                shippingPageElementObj.getShippingProductName(i).should('be.visible').scrollIntoView().then((productName) => {
                    //validate whether the displayed product name is one of the expected products list or not
                    expect(productName.text().toLowerCase().trim()).to.be.oneOf(expectedProductNameList);
                });
            }else{
                throw new Error('The given '+page+' name is not valid. It should be either \'My Cart\', \'Shopping Cart\' or \'Shipping\'.');
            }
        }
    });
});

/*
Cypress.Commands.add('validateProductOptions', (optionsElement,finishValElement,expectedFinishVal,shadeValElement,expectedShadeVal) => {
    optionsElement.each(($el, index, $list) => {
        let label = $el.text().toLowerCase().trim();
        if(label === 'finish'){
            finishValElement.should('have.text',expectedFinishVal);
        }else if(label === 'shade'){
            shadeValElement.should('have.text',expectedShadeVal);
        }else{
            throw new Error('The unknown '+label+' label name is found. It should be either \'Finish\' or \'Shade\'.');
        }
    });
});

Cypress.Commands.add('collectDisplayedText',(fieldElement) => {
    fieldElement.then((field) => {
        return field.text();
    });
});
*/