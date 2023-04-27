@all @checkout
Feature: Checkout

    The ecommerce checkout is the process a customer follows when buying items from an online store. It starts 
    after a customer adds items to their shopping cart and ends when they receive a confirmation for a 
    successful purchase. 

    Background: Preconditions
        Given the user is on the Home page
        And the user is not logged-in
        And some products are added to my cart
            | product name             | finish        | shade                 | quantity | bulb      |
            | Linden Medium Lamp       | Plaster White | 13" x 17" x 12" Linen | 2        | Uncheck   |
            | Geneva Sconce            | Aged Iron     | No                    | 1        | No        |

    #---------------------------------------------- Case:3 ------------------------------------------------------
    
    Scenario: The product details should be displayed correctly on the 'My Cart' popover
        When the user hovers on my cart icon
            And validates the 'My Cart' products list
        Then all product details should be displayed correctly on the My Cart popover
            And the number of items and subtotal also should be correct as per the added products

    #---------------------------------------------- Case:4 ------------------------------------------------------
    
    Scenario: The product details should be displayed correctly on the 'Shopping Cart' page
        When the user hovers on my cart icon
            And clicks on the View Cart button
        Then the 'Shopping Cart' page should get opened
        When validates the 'Shopping Cart' products list
        Then all product details should be displayed correctly on the Shopping Cart page
            And the order summary details also should be correct as per the added products

    #---------------------------------------------- Case:5 ------------------------------------------------------
    
    Scenario: The product details should be displayed correctly on the 'Shipping' page
        When the user hovers on my cart icon
            And clicks on the View Cart button
        Then the 'Shopping Cart' page should get opened
        When clicks on the Begin Checkout button 
        Then the 'Shipping' page should get opened 
        When validates the 'Shipping' products list
        Then all product details should be displayed correctly on the Shipping page