import OrangeHrmLogin from '../PajeObjects/OrangeHrmLogin'
const orangehrmlogin = new OrangeHrmLogin()

describe('Orange HCM validation', function () {

    before(function () {

        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/auth/login')
        cy.fixture('OrangeHCMInputs').then(function (data) {

          //  const orangehrmlogin = new OrangeHrmLogin()
            this.data = data
        })

        
    })

    it('Login to OrangeHCM',function(){
    
        orangehrmlogin.SendUsername().type(this.data.username).should('be.visible')
        orangehrmlogin.Sendpassword().type(this.data.password).should('be.visible')        
        orangehrmlogin.ClickSingInButton().click().should('be.visible')
        cy.get('h1').should('have.text','Dashboard');
       
    })
})