describe('Pets', () => {
    beforeEach(() => {
        cy.visit('/pets');
    });

    it('Application has the correct title!', () => {
        cy.visit('/pets');
        cy.validateTitle('Pet List');
    });

    it('should display navigation header toolbar', () => {
        cy.navigationHeader();
    });

    it('Application has the correct header title!', () => {
        cy.get('.main-heading').should('contain', 'Pets');
    });

    it('should show list of pets', () => {
        cy.getPets();
    });

    it('should display navigation footer', () => {
        cy.navigationFooter();
    });
});

