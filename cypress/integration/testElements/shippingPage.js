class shippingPageElements{
    
    getShippingProductsList(){
        return cy.get('div.opc-block-summary',{timeout:60000}).find('div.content.minicart-items',{timeout:60000})
        .find('ol.minicart-items',{timeout:60000}).children('li.product-item',{timeout:60000});
    }

    getShippingProductName(index){
        return cy.get('div.opc-block-summary',{timeout:60000}).find('div.content.minicart-items',{timeout:60000})
        .find('ol.minicart-items',{timeout:60000}).children('li.product-item',{timeout:60000}).eq(index)
        .find('strong.product-item-name',{timeout:60000});
    }

    getProductSubtotal(productName){
        return cy.get('div.opc-block-summary').find('div.content.minicart-items').find('ol.minicart-items').children('li.product-item')
        .find('strong.product-item-name').contains(productName,{matchCase:false}).parents('div.product-item-details')
        .find('span.cart-price').find('span.price');
    }

    getProductQty(productName){
        return cy.get('div.opc-block-summary').find('div.content.minicart-items').find('ol.minicart-items').children('li.product-item')
        .find('strong.product-item-name').contains(productName,{matchCase:false}).parents('div.product-item-details')
        .find('div.details-qty').find('span.value');
    }

    getSeeDetailsLink(productName){
        return cy.get('div.opc-block-summary').find('div.content.minicart-items').find('ol.minicart-items').children('li.product-item')
        .find('strong.product-item-name').contains(productName,{matchCase:false}).parents('div.product-item-details')
        .find('div.product.options').find('span.toggle');
    }

    getShadeFinishLabels(productName){
        return cy.get('div.opc-block-summary').find('div.content.minicart-items').find('ol.minicart-items').children('li.product-item')
        .find('strong.product-item-name').contains(productName,{matchCase:false}).parents('div.product-item-details')
        .find('div.product.options').find('dl.item-options').find('dt.label');
    }

    getProductShade(productName){
        return cy.get('div.opc-block-summary').find('div.content.minicart-items').find('ol.minicart-items').children('li.product-item')
        .find('strong.product-item-name').contains(productName,{matchCase:false}).parents('div.product-item-details').find('div.product.options').find('dl.item-options').find('dt.label')
        .contains('shade',{matchCase:false}).next('dd.values');
    }

    getProductFinish(productName){
        return cy.get('div.opc-block-summary').find('div.content.minicart-items').find('ol.minicart-items').children('li.product-item')
        .find('strong.product-item-name').contains(productName,{matchCase:false}).parents('div.product-item-details').find('div.product.options').find('dl.item-options').find('dt.label')
        .contains('finish',{matchCase:false}).next('dd.values');
    }
       
} export default shippingPageElements;