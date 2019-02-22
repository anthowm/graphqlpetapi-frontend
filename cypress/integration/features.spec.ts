
describe('Features', () => {
    beforeEach(() => {
        cy.visit('/features');
    });

    it('Application has the correct title!', () => {
        cy.validateTitle('Features');
    });

    it('should display navigation header toolbar', () => {
        cy.navigationHeader();
    });

    it('Application has the correct header title!', () => {
        cy.get('.main-heading').should('contain', 'Features');
    });

    it('should display features content', () => {
        cy.features();
    });

    it('should display navigation footer', () => {
        cy.navigationFooter();
    });

});
