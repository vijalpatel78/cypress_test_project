@all @addToCart
Feature: Add To Cart

    The add-to-cart is a feature of ecommerce stores that allows customers to choose items to purchase without 
    actually completing the payment.

    Background: Preconditions
        Given the user is on the Home page
        And the user is not logged-in
    
    #--------------------------------------------------- Case:1 --------------------------------------------------------
    
    Scenario Outline: The user should be able to add a product to the cart
        When the user clicks on the '<submenu>' sub-menu of '<menu>' menu
        Then the products list page of '<menu>'>>'<submenu>' sub-menu should get opened
        When collects the name, price and designer name of '<name>' product from the products list
            And clicks on the '<name>' product from the products list
        Then the product description page of '<name>' product should get opened
            And product name, price and designer name on the product description page should be displayed correctly
        When selects '<finish>' finish & '<shade>' shade and enters '<quantity>' quantity with '<bulb>' bulb
            And clicks on the Add to Cart button
            And closes the Item Added to Cart popup 
        Then the success message including '<name>' product name should get displayed
            And the count of My Cart should get increased by the entered number of product '<quantity>' quantity

    Examples:
        | menu  | submenu    | name                | finish          | shade                  | quantity | bulb      |
        | Table | Decorative | Linden Medium Lamp  | Plaster White   | 13" x 17" x 12" Linen  | 2        | Uncheck   |
       #| Floor | Task       | Alma Floor Lamp     | Polished Nickel and Black Marble | No    | 3        | Uncheck   |

    #--------------------------------------------------- Case:2 -----------------------------------------------------------
    
    Scenario Outline: The user should be able to search the product and add it to the cart 
        When the user search '<searchText>' and select '<searchOption>' from the search suggestions
        Then the products list of '<searchOption>' search text should get opened
        When collects the name, price and designer name of '<name>' product from the products list
            And clicks on the '<name>' product from the products list
        Then the product description page of '<name>' product should get opened
            And product name, price and designer name on the product description page should be displayed correctly
        When selects '<finish>' finish & '<shade>' shade and enters '<quantity>' quantity with '<bulb>' bulb
            And clicks on the Add to Cart button
        Then the success message including '<name>' product name should get displayed
            And the count of My Cart should get increased by the entered number of product '<quantity>' quantity

    Examples:
        | searchText | searchOption | name                  | finish                                      | shade | quantity | bulb |
        | Fan        | Ceiling Fan  | Aspen 70" Ceiling Fan | Matte White Housing With Matte White Blades | No    | 3        | No   |

