class OrangeHrmLogin
{
    SendUsername()
    {
       return cy.get('#txtUsername')
    }
    Sendpassword()
    {
        return cy.get('input#txtPassword')
    }
    ClickSingInButton()
    {
        return cy.get('input#btnLogin')
    }
}

export default OrangeHrmLogin