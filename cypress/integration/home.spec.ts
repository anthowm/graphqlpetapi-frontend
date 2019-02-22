describe('Home', () => {
    beforeEach(() => {
        cy.visit('/home');
    });

    it('Application has the correct title!', () => {
        cy.validateTitle('Home');
    });

    it('should display navigation header toolbar', () => {
        cy.navigationHeader();
    });

    it('should display main heading', () => {
        cy.get('h1').should('contain', 'ANGULAR PET API');
    });

    it('first action button should lead to "Home" route ', () => {
        cy.get('.actions a')
            .first()
            .click();
    });

    it(' second action should lead to "Features"', () => {
        cy.get('.actions a')
            .eq(1)
            .click();
        cy.url().should('include', 'features');
    });

    it('third action should lead to "Pets', () => {
        cy.get('.actions a')
            .eq(2)
            .click();
        cy.url().should('include', 'pets');
    });


    it('should display "Description" section', () => {
        cy.get('[data-testid="home-description"]').should('contain', 'Description');
    });

    it('should display description content section', () => {
        cy.get('[data-testid="home-description-p"]').should('contain', 'This is an example with Angular Material + MEAN + NGRX');
    });

    it('should display "Getting Started" section', () => {
        cy.get('[data-testid="get-started"]').should('contain', 'Get Started');
    });

    it('should display navigation footer', () => {
        cy.navigationFooter();
    });

});
