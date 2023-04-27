class shoppingCartPageElements{
    
    getShoppingCartProductsList(){
        return cy.get('form#form-validate',{timeout:120000}).find('table#shopping-cart-table').children('tbody.cart.item',{timeout:120000});
    }

    getShoppingCartProductName(index){
        return cy.get('form#form-validate').find('table#shopping-cart-table').children('tbody.cart.item')
        .eq(index).children('tr.item-info').find('strong.product-item-name',{timeout:120000});
    }

    getProductPrice(productName){
        return cy.get('form#form-validate').find('table#shopping-cart-table').children('tbody.cart.item')
        .children('tr.item-info').find('strong.product-item-name').contains(productName,{matchCase:false})
        .parents('tr.item-info').find('td[data-th="Price"]').find('span.price');
    }

    getProductQty(productName){
        return cy.get('form#form-validate').find('table#shopping-cart-table').children('tbody.cart.item')
        .children('tr.item-info').find('strong.product-item-name').contains(productName,{matchCase:false})
        .parents('tr.item-info').find('td[data-th="Qty"]').find('input.input-text.qty');
    }

    getShadeFinishLabels(productName){
        return cy.get('form#form-validate').find('table#shopping-cart-table').children('tbody.cart.item')
        .children('tr.item-info').find('strong.product-item-name').contains(productName,{matchCase:false})
        .parents('div.product-item-details').find('dl.item-options').find('dt');
    }

    getProductShade(productName){
        return cy.get('form#form-validate').find('table#shopping-cart-table').children('tbody.cart.item').children('tr.item-info')
        .find('strong.product-item-name').contains(productName,{matchCase:false}).parents('div.product-item-details')
        .find('dl.item-options').find('dt').contains('shade',{matchCase:false}).next('dd');
    }

    getProductFinish(productName){
        return cy.get('form#form-validate').find('table#shopping-cart-table').children('tbody.cart.item').children('tr.item-info')
        .find('strong.product-item-name').contains(productName,{matchCase:false}).parents('div.product-item-details')
        .find('dl.item-options').find('dt').contains('finish',{matchCase:false}).next('dd');
    }

    getCollectionName(productName){
        return cy.get('form#form-validate').find('table#shopping-cart-table').children('tbody.cart.item').children('tr.item-info')
        .find('strong.product-item-name').contains(productName,{matchCase:false}).parents('div.product-item-details').find('span.brand');
    }

    getDesignerName(productName){
        return cy.get('form#form-validate').find('table#shopping-cart-table').children('tbody.cart.item').children('tr.item-info')
        .find('strong.product-item-name').contains(productName,{matchCase:false}).parents('div.product-item-details').find('span.designer');
    }

    getProductCode(productName){
        return cy.get('form#form-validate').find('table#shopping-cart-table').children('tbody.cart.item').children('tr.item-info')
        .find('strong.product-item-name').contains(productName,{matchCase:false}).parents('div.product-item-details').find('div.product-item-sku');
    }

    getProductSubtotal(productName){
        return cy.get('form#form-validate').find('table#shopping-cart-table').children('tbody.cart.item').children('tr.item-info')
        .find('strong.product-item-name').contains(productName,{matchCase:false}).parents('tr.item-info').find('td[data-th="Subtotal"]').find('span.price');
    }

    getOrderSubtotal(){
        return cy.get('div.cart-summary',{timeout:120000}).children('div#cart-totals',{timeout:120000}).find('table.data.table.totals',{timeout:120000}).find('tr.totals.sub',{timeout:120000})
        .children('td.amount',{timeout:120000}).children('span.price',{timeout:120000});
    }

    getShippingCharge(){
        return cy.get('div.cart-summary').children('div#cart-totals').find('table.data.table.totals').find('tr.totals.shipping.excl',{timeout:120000})
        .children('td.amount',{timeout:120000}).children('span.price',{timeout:120000});
    }
    
    getMerchandiseTotal(){
        return cy.get('div.cart-summary').children('div#cart-totals').find('table.data.table.totals').find('tr.grand.totals',{timeout:120000})
        .find('span.price',{timeout:120000});
    }

    getShoppingCartText(){
        return cy.get('h1.page-title',{timeout:120000}).contains('Shopping Cart',{matchCase:false});
    }

    getBeginCheckoutButton(){
        return cy.get('div.cart-summary').find('li.item').find('button[data-role="proceed-to-checkout"]');
    } 

} export default shoppingCartPageElements;