describe("test our form inputs", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/pizza");
    });
    it("adds text to inputs and submits form", () => {
        //TEXT - name
        cy.get('#name-input')
            .type("Victoria")
            .clear()
            .type("Victoria")
            .should("have.value", "Victoria");

        // //CHECKBOXES - doesn't need to be selected to submit
        cy.get('#topping1-check')
        .check()
        //.uncheck()

        //DROPDOWN
        cy.get('#size-dropdown')
            .select(1)
            .invoke("val")
            .should("eq", "Small");
        //DROPDOWN - choose 0 value to get an error
        cy.get('#size-dropdown')
            .select(0)
            .invoke("val");
         //DROPDOWN - remove error msg
         cy.get('#size-dropdown')
            .select(1)
            .invoke("val")
            .should("eq", "Small");
        
        //TEXT - special
        cy.get('#special-text')
            .type("n")
            .clear()
            .type("n")
            
        //SUBMIT
        cy.get('#order-button')
            .click();

    });
})