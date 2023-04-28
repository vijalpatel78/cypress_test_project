class productDescriptionPageElements{
    
    getProductName(){
        return cy.get('div.product-info-main').find('span[itemprop="name"]');
    }

    getProductDesignerName(){
        return cy.get('div.product-info-main').find('div[itemprop="designer"]');
    }

    getCollectionName(){
        return cy.get('div.product-info-main').find('div[itemprop="brand"]');
    }

    getHeaderProductPrice(){
        return cy.get('div.product-info-main').find('span[data-price-type="finalPrice"]').children('span.price').eq(0);
    }

    getFooterProductPrice(){
        return cy.get('div.product-info-main').find('span[data-price-type="finalPrice"]').children('span.price').eq(1).scrollIntoView();
    }

    getProductCode(){
        return cy.get('div.product-info-main').find('div.product.attribute.sku').children('div[itemprop="sku"]').eq(0);
    }

    getFinishDropdown(){
        return cy.get('select#attribute2461');
    }

    getShadeDropdown(){
        return cy.get('select#attribute1651');
    }
    
    getQuantityTextbox(){
        return cy.get('input#qty');
    }

    getAddToCartButton(){
        return cy.get('button#product-addtocart-button');
    }

    getLEDBulbCheckbox(){
        return cy.get('input[name="lightbulb[0][id]"]');
    }

    getProductAddedMessage(){
        return cy.get('div.page.messages').find('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]').scrollIntoView();
    }

    getPopupCloseButton(){
        return cy.get('aside.modal-popup.modal-slide._show').find('button[data-role="closeBtn"]');
    }

} export default productDescriptionPageElements;