describe('Pets - Create Pet', () => {

    it('should navigate to create pet', () => {
        cy.visit('pets');
        cy.get('[data-testid="pets-create-button"]').click();
        cy.url().should('include', '/pets/create');
    });

    it('should application has the correct title!', () => {
        cy.validateTitle('Create Pet');
    });

    it('should display navigation header toolbar', () => {
        cy.navigationHeader();
    });

    it('Application has the correct header title!', () => {
        cy.get('.main-heading').should('contain', 'CREATE PET');
    });

    it('should create a new pet', () => {
        cy.get('app-form-pet button').eq(0).should('contain', 'CREATE');
        cy.server();
        cy.route({
            method: 'POST',
            url: 'http://localhost:8080/pet/pet',
            response: 'fixture:pets/pets-create.json'
        });
        cy.get('input').eq(0).type('Morty');
        cy.get('input').eq(1).type('Morty');
        cy.get('ngx-mat-file-input input');
        cy.uploadFile('ngx-mat-file-input input', 'pets/morty.jpg', 'binary');
        cy.get('app-form-pet button').eq(0).click();
    });

    it('should display navigation footer', () => {
        cy.navigationFooter();
    });

    it('should back to pets view', () => {
        cy.visit('pets');
        cy.get('[data-testid="pets-create-button"]').click();
        cy.url().should('include', '/pets/create');
        cy.get('app-form-pet a').eq(0).should('contain', 'BACK');
        cy.get('app-form-pet a').eq(0).click();
        cy.url().should('include', '/pets');
    });
});
