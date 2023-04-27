class commonElements{

    //-------------------------- Login Elements ---------------------

    getLoginButton(){
        return cy.get('div.header-panel-right').find('li.link.authorization-link').children('a').contains('Login',{matchCase:false});
    }

    //--------------------------- Menu Elements ---------------------

    getMenuButton(){
        return cy.get('span.action.nav-toggle',{timeout:60000});
    }

    getMainMenuName(menuName){
        return cy.get('ul#rw-menutop',{timeout:60000}).children('li').children('a').contains(menuName,{matchCase:false}).prev('span.rootmenu-click',{timeout:60000});
    }

    getSubMenuName(menuName,subMenuName){
        return cy.get('ul#rw-menutop').children('li').children('a').contains(menuName,{matchCase:false}).next('div.megamenu.fullmenu.clearfix.categoriesmenu',{timeout:60000})
        .find('div.title.cat-name',{timeout:60000}).children('a').contains(subMenuName,{matchCase:false});
    }

    //--------------------------- My Cart Elements ---------------------

    getCartCount(){
        return cy.get('span.counter-number');
    }

    getMyCartIcon(){
        return cy.get('a.action.showcart');
    }

    getMyCartHover(){
        return cy.get('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.mage-dropdown-dialog');
    }

    getViewCartButton(){
        return cy.get('div#minicart-content-wrapper').find('a[data-bind="attr: {href: shoppingCartUrl}"]')
        .contains('View Cart',{matchCase:false});
    }

    getMyCartProductsList(){
        return cy.get('div.minicart-items-wrapper').children('ol#mini-cart').children('li[data-role="product-item"]');
    }

    getMyCartProductName(index){
        return cy.get('div.minicart-items-wrapper').children('ol#mini-cart').children('li[data-role="product-item"]')
        .eq(index).find('a[data-bind="attr: {href: product_url}, html: product_name"]');
    }

    getMyCartProductPrice(productName){
        return cy.get('div.minicart-items-wrapper').children('ol#mini-cart').children('li[data-role="product-item"]')
        .find('a[data-bind="attr: {href: product_url}, html: product_name"]').contains(productName,{matchCase:false})
        .parents('div.product-item-details').find('span.minicart-price').find('span.price');
    }

    getMyCartProductQty(productName){
        return cy.get('div.minicart-items-wrapper').children('ol#mini-cart').children('li[data-role="product-item"]')
        .find('a[data-bind="attr: {href: product_url}, html: product_name"]').contains(productName,{matchCase:false})
        .parents('div.product-item-details').find('div.qty-edit').find('input.item-qty.cart-item-qty');
    }

    getMyCartProductSeeDetailsLink(productName){
        return cy.get('div.minicart-items-wrapper').children('ol#mini-cart').children('li[data-role="product-item"]')
        .find('a[data-bind="attr: {href: product_url}, html: product_name"]').contains(productName,{matchCase:false})
        .parents('div.product-item-details').find('div.product.options').find('span.toggle');
    }

    getMyCartProductShadeFinishLabels(productName){
        return cy.get('div.minicart-items-wrapper').children('ol#mini-cart').children('li[data-role="product-item"]')
        .find('a[data-bind="attr: {href: product_url}, html: product_name"]').contains(productName,{matchCase:false})
        .parents('div.product-item-details').find('div.product.options').find('dl.product.options.list').find('dt');
    }

    getMyCartProductShade(productName){
        return cy.get('div.minicart-items-wrapper').children('ol#mini-cart').children('li[data-role="product-item"]')
        .find('a[data-bind="attr: {href: product_url}, html: product_name"]').contains(productName,{matchCase:false})
        .parents('div.product-item-details').find('div.product.options').find('dl.product.options.list').find('dt')
        .contains('shade',{matchCase:false}).next('dd').children('span[data-bind="text: option.value"]');
    }

    getMyCartProductFinish(productName){
        return cy.get('div.minicart-items-wrapper').children('ol#mini-cart').children('li[data-role="product-item"]')
        .find('a[data-bind="attr: {href: product_url}, html: product_name"]').contains(productName,{matchCase:false})
        .parents('div.product-item-details').find('div.product.options').find('dl.product.options.list').find('dt')
        .contains('finish',{matchCase:false}).next('dd').children('span[data-bind="text: option.value"]');
    }

    getMyCartTotalProductQty(){
        return cy.get('div#minicart-content-wrapper').find('span.count');
    }

    getMyCartTotalProductPrice(){
        return cy.get('div#minicart-content-wrapper').find('div.subtotal').find('span.price');
    }

    //--------------------------- Search Elements ---------------------

    getSearchIcon(){
        return cy.get('div.header-panel-right').find('label[for="search"]');
    }

    getSearchTextbox(){
        return cy.get('input#search');
    }
    
    getSearchOption(searchOption){
        return cy.get('div.blm-autosuggest-search-results').children().find('a').contains(searchOption,{matchCase:false});
    }

    getSearchResultText(){
        return cy.get('div.page-title-wrapper').find('span.base');
    }

} export default commonElements;