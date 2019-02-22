describe('Pets - Edit Pet', () => {

    it('should navigate to edit pet', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: 'http://localhost:8080/pet/pet',
            response: 'fixture:pets/pets.json'
        });
        cy.visit('/pets');
        cy.get('[data-testid="pets-list"] mat-card').should('have.length', 3);
        cy.get('[data-testid="pets-list"] mat-card a').first().eq(0).click({ force: true });
        cy.url().should('include', '/pets/5bf7092f8f2393195891902e');
        cy.get('[data-testid="pets-view"] mat-card mat-card-actions button').eq(1).click();
        cy.url().should('include', '/pets/5bf7092f8f2393195891902e/edit');
    });

    it('should application has the correct title!', () => {
        cy.validateTitle('Pet Edit');
    });

    it('should display navigation header toolbar', () => {
        cy.navigationHeader();
    });

    it('Application has the correct header title!', () => {
        cy.get('.main-heading').should('contain', 'EDIT PET');
    });

    it('should have back button', () => {
        cy.get('app-form-pet a').eq(0).should('contain', 'BACK');
    });

    it('should display navigation footer', () => {
        cy.navigationFooter();
    });

    it('should edit a pet', () => {
        cy.get('app-form-pet button').eq(0).should('contain', 'UPDATE');
        cy.server();
        cy.route({
            method: 'PUT',
            url: 'http://localhost:8080/pet/pet/5bf7092f8f2393195891902e',
            response: 'fixture:pets/pets-update.json'
        });
        cy.get('input').eq(0).type('Pelusa Update');
        cy.get('ngx-mat-file-input input');
        cy.uploadFile('ngx-mat-file-input input', 'pets/tiger.jpg', 'binary');
        cy.get('app-form-pet button').eq(0).click();
    });
});
