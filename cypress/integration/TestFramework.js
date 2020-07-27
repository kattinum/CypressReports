/// <reference types="Cypress" />
import HomePage from '../support/pageObjects/HomePage'
import ProductPage from '../support/pageObjects/ProductPage'
describe('My First Test Suite', function() 
{
    before(function(){
        //runs once before all tests in the block
        cy.fixture('example').then(function(data)
        {
this.data=data
        })
    })

it('My FirstTest case', function() {
//Cypress.config('pageLoadTimeout', 100000) Configuration set using Cypress.config is only in scope for the current spec fil
const homepage=new HomePage()
const productpage=new ProductPage()
    //cy.visit('https://rahulshettyacademy.com/angularpractice/')
    cy.visit(Cypress.env('url')+"/angularpractice/")
    //cy.get('input[name="name"]:nth-child(2)').type(this.data.name)
    //cy.get('select').select(this.data.gender)
    //cy.get(':nth-child(4) > .ng-pristine').should('have.value',this.data.name)
    //cy.get('input[name="name"]:nth-child(2)').should('have.attr','minlength','2')
    //cy.get('#inlineRadio3').should('not.be.enabled')
    // cy.pause()
    //cy.get('li:nth-child(2) a.nav-link').click()
    
    //Replace locator by page object

    homepage.getEditBox().type(this.data.name)
    homepage.getGender().select(this.data.gender)
    homepage.getTwowayDataBinding().should('have.value',this.data.name)
    homepage.getEditBox().should('have.attr','minlength','2')
    homepage.getEntrepreneaur().should('not.be.enabled')
    homepage.getShopTab().click()


    // cy.get('h4.card-title').each(($el, index, $list) => {

    //             const text=$el.text()
    //             if(text.includes("Samsung Note 8"))
    //             {
    //                 cy.get('button.btn.btn-info').eq(index).click()
    //             }
    //         })

    //Able to use customize command in commands.js under support folder
    //cy.SelectProduct('Samsung Note 8')
    //cy.SelectProduct('iphone X')

    //Parametizing test data from json file
    this.data.productName.forEach(function(element) {

        cy.SelectProduct(element)
        })
    productpage.chkOutButton().click()
    var sum=0
    cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
        const amount=$el.text()
        var res= amount.split(" ")
        res= res[1].trim()
        sum=Number(sum)+Number(res)
        cy.log(res)
    
    }).then(function()
    {
        cy.log(sum)
    })
    cy.get('h3 strong').then(function(element)
    
    {
        const amount=element.text()
        var res= amount.split(" ")
        var total= res[1].trim()
        expect(Number(total)).to.equal(sum)
    })
    cy.get('button.btn.btn-success').click()
    cy.get('#country').type('ind')
    cy.get('.suggestions > :nth-child(1) > li > a').click()
    cy.get('#checkbox2').click({force: true})
    cy.contains('Purchase').click()
    //cy.get('.alert').should('include.text','Success! Thank you! Your order will be delivered in next few weeks :-).')
    cy.get('.alert').then(function(element)
    {
        const actualText=element.text()
        expect(actualText.includes("Success")).to.be.true
    })

     })

})