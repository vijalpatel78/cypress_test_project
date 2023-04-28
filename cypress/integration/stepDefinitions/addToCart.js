const { When, Then } = require('@badeball/cypress-cucumber-preprocessor');
import commonElements from '../testElements/commonElements';
import productListPageElements from '../testElements/productListPage';
import productDescriptionPageElements from '../testElements/productDescriptionPage';

const commonElementObj = new commonElements();
const productListPageElementObj = new productListPageElements();
const productDescriptionPageElementObj = new productDescriptionPageElements();

let expectedProductName, expectedSalePrice, expectedDesignerName;

When('the user clicks on the {string} sub-menu of {string} menu', (subMenuName,menuName) => {
    //click on the navigation menu icon button
    commonElementObj.getMenuButton().click();
    //click on the given menu name
    commonElementObj.getMainMenuName(menuName).click();
    //click on the given sub menu name
    commonElementObj.getSubMenuName(menuName,subMenuName).click();
    cy.wait(1000);
});

When('the user search {string} and select {string} from the search suggestions', (searchText,searchOption) => {
    //search and select the given text
    cy.searchProduct(searchText,searchOption);
});

When('collects the name, price and designer name of {string} product from the products list', (productName) => {
    //find & collect the name, price and designer name of the given product name 
    productListPageElementObj.getProductName(productName).then((name) => {
        expectedProductName = name.text();
    });
    productListPageElementObj.getProductPrice(productName).then((price) => {
        expectedSalePrice = price.text();
    });
    productListPageElementObj.getProductDesignerName(productName).then((designerName) => {
        expectedDesignerName = designerName.text();
    });
});

When('clicks on the {string} product from the products list', (productName) => {
    //click on the given product name
    productListPageElementObj.getProductName(productName).click({force:true});
});

When('selects {string} finish & {string} shade and enters {string} quantity with {string} bulb', (finish,shade,quantity,bulb) => {
    //select or enter the given product details
    cy.enterProductDetails(finish,shade,quantity,bulb);
});

When('clicks on the Add to Cart button', () => {
    //click on the Add to cart button
    productDescriptionPageElementObj.getAddToCartButton().click();
});

When('closes the Item Added to Cart popup', () => {
    //close the popup
    productDescriptionPageElementObj.getPopupCloseButton().click({force:true});
    cy.wait(1000);
});

Then('the products list page of {string}>>{string} sub-menu should get opened', (subMenuName,menuName) => {
    //validate whether the current URL contains the menu and sub-menu name or not
    cy.url().should('have.string',menuName.toLowerCase()).and('have.string',subMenuName.toLowerCase());
});

Then('the products list of {string} search text should get opened', (searchOption) => {
    //validate whether the search result header contains the given search option or not
    commonElementObj.getSearchResultText().contains(searchOption,{matchCase:false});
});

Then('the product description page of {string} product should get opened', (productName) => {

});

Then('product name, price and designer name on the product description page should be displayed correctly', () => {
    //validate actual/displayed product name, price and designer name with the expected product details
    productDescriptionPageElementObj.getProductName().then((productName) => {
        expect(productName.text().trim().toLowerCase()).to.equal(expectedProductName.trim().toLowerCase());
    });
    productDescriptionPageElementObj.getProductDesignerName().then((designerName) => {
        expect(designerName.text().trim().toLowerCase()).to.equal(expectedDesignerName.trim().toLowerCase());
    });
    productDescriptionPageElementObj.getHeaderProductPrice().then((headerPrice) => {
        expect(headerPrice.text()).to.equal(expectedSalePrice);
    });
    productDescriptionPageElementObj.getFooterProductPrice().then((footerPrice) => {
        expect(footerPrice.text()).to.equal(expectedSalePrice);
    });
});

Then('the success message including {string} product name should get displayed', (productName) => {
    //validate whether the success message contains the given product name or not
    productDescriptionPageElementObj.getProductAddedMessage().contains(productName,{matchCase:false}).scrollIntoView();
});

Then('the count of My Cart should get increased by the entered number of product {string} quantity', (quantity) => {
    //validate the actual/displayed cart count with the expected count
    commonElementObj.getCartCount().should('have.text',quantity).scrollIntoView();
    cy.wait(1000);
});