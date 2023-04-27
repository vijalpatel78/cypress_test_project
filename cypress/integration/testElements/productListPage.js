class productListPageElements{
    
    getProductName(productName){
        return cy.get('div#amasty-shopby-product-list').find('div.product.details.product-item-details').find('a.product-item-link')
        .contains(productName,{matchCase:false}).scrollIntoView();
    }

    getProductPrice(productName){
        return cy.get('div#amasty-shopby-product-list').find('div.product.details.product-item-details').find('a.product-item-link')
        .contains(productName,{matchCase:false}).parents('div.product.details.product-item-details').find('span[data-price-type="finalPrice"]')
        .children('span.price');
    }

    getProductDesignerName(productName){
        return cy.get('div#amasty-shopby-product-list').find('div.product.details.product-item-details').find('a.product-item-link')
        .contains(productName,{matchCase:false}).parents('div.product.details.product-item-details').children('p.designer');
    }
      
} export default productListPageElements;