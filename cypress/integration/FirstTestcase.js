// <reference types="Cypress" />
/// <reference types="cypress-xpath" />

describe('Verify home page of shopping website', function () {

    it('check the homepage page', function () {


        cy.visit('http://automationpractice.com/index.php')
        cy.get('a[class="login"]').should('be.visible')

    })

    it('Verify Signin Button', function () {

        cy.get('a[class="login"]').should('be.visible').click()


    })
    it('Verify user is able to enter dress in search bar and clicks on search', function () {
        cy.get('input[placeholder="Search"]').type('Dress').should('be.visible')
        cy.get('button[name="submit_search"]').should('be.visible').click();


    })
    it('Verify User is able to see only 7 dresses in the list and add anyone in the cart', function () {
        cy.get('ul[class="product_list grid row"]').find('div[class="product-container"]').eq(3).contains('Add to cart')//.click().click()
        //cy.wait(10000)
        // cy.xpath('//a[@title="Proceed to checkout"]',{ delay: 4000 }).click()

    })
    it('Verify blouse is added to the cart', function(){
        
        cy.get('ul[class="product_list grid row"]').find('div[class="product-container"]').each(($el, index, $list) => {

            const s = $el.find('ul li div div h5 a.product-name').text()
            if (s.includes('Blouse')) {
              $el.find('a[title="Add to cart"]').click().click()
            }

        })


    })
})