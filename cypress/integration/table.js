describe('Table Validation using cypress', function () {

    it('Table Validation', function () {

        cy.visit('http://demo.guru99.com/test/web-table-element.php');
        cy.get('tr td:nth-child(1)').each(($e1, index, $list) => {
            const s = $e1.text()
            if (s.includes("Ltd")) {
                cy.get('tr td:nth-child(1)').eq(index).next().next().next().then(function (Price) {
                    const pr = Price.text()
                    expect(pr).to.includes(".")
                })
            }
        })
    })


    it('My FirstTest case', function () {

        //Check boxes
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        cy.get('tr td:nth-child(2)').each(($e1, index, $list) => {

            const text = $e1.text()
            if (text.includes("Python")) {

                cy.get("tr td:nth-child(2)").eq(index).next().then(function (price) {
                    const priceText = price.text()
                    expect(priceText).to.equal('25')
                })
            }

        })

    })
})