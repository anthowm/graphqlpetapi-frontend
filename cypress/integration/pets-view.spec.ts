describe('Pets - View Pet', () => {
    beforeEach(() => {
        cy.server();
        cy.route({
            method: 'GET',
            url: 'http://localhost:8080/pet/pet/5bf7092f8f2393195891902e',
            response: 'fixture:pets/pets-view.json'
        });
        cy.visit('/pets/5bf7092f8f2393195891902e');
    });

    it('Application has the correct title!', () => {
        cy.validateTitle('Pet View');
    });

    it('should display navigation header toolbar', () => {
        cy.navigationHeader();
    });

    it('should show pet by id and buttons', () => {
        cy.getPet();
    });

    it('should navigate to /pets', () => {
        cy.get('[data-testid="pets-view"] mat-card mat-card-actions button').eq(0).click();
        cy.url().should('include', 'pets');
    });

    it('should navigate to edit pet by id', () => {
        cy.get('[data-testid="pets-view"] mat-card mat-card-actions button').eq(1).click();
        cy.url().should('include', '/pets/5bf7092f8f2393195891902e/edit');
    });

    it('should pop up a confirm delete dialog and close button', () => {
        cy.get('[data-testid="pets-view"] mat-card mat-card-actions button').eq(2).click();
        cy.get('mat-dialog-container h1').should('contain', 'REMOVE PET');
        cy.get('mat-dialog-container .mat-dialog-content')
            .should('contain', 'Are you sure you want to remove the pet Pelusa from the pet list?');
        cy.get('mat-dialog-container button').eq(0).children('span').children('mat-icon').should('contain', 'close');
        cy.get('mat-dialog-container button').eq(1).children('span').should('contain', 'Cancel');
        cy.get('mat-dialog-container button').eq(2).children('span').should('contain', 'Delete');
        cy.get('mat-dialog-container button').eq(0).click();
    });

    it('should hidden confirm delete dialog by click cancel button', () => {
        cy.get('[data-testid="pets-view"] mat-card mat-card-actions button').eq(2).click();
        cy.get('mat-dialog-container button').eq(1).click();
        cy.get('mat-dialog-container').should('not.exist');
    });

    it('should delete the pet selected', () => {
        cy.get('[data-testid="pets-view"] mat-card mat-card-actions button').eq(2).click();
        cy.server();
        cy.route({
            method: 'DELETE',
            url: 'http://localhost:8080/pet/pet/5bf7092f8f2393195891902e',
            response: 'fixture:pets/pets-view-delete.json'
        });
        cy.get('mat-dialog-container button').eq(2).click();
    });

    it('should display navigation footer', () => {
        cy.navigationFooter();
    });
});
