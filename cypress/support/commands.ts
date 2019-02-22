declare global {
    namespace Cypress {
        interface Chainable {
            features: () => void;
            getPets: () => void;
            getPet: () => void;
            navigationHeader: () => void;
            navigationFooter: () => void;
            validateTitle: (title) => void;
            uploadFile: (selector, fileUrl, type) => Chainable<any>;

        }
    }
}


export const checkNavigationHeader = () => {
    cy.get('[data-testid="navigation-logo-lg"]').find('img').should('be.visible');
    cy.get('[data-testid="navigation-logo-lg"]').should('contain', 'ANGULAR PET API');
    cy.get('mat-toolbar button.nav-button').should(navItems => {
        expect(navItems).to.have.length(3);
        expect(navItems.eq(0)).to.contain('Home');
        expect(navItems.eq(1)).to.contain('Pets');
        expect(navItems.eq(2)).to.contain('Features');
    });
    cy.get('[data-testid="navigation-settings"]').find('svg').should('be.visible');
    cy.get('[data-testid="navigation-github"]').find('svg').should('be.visible');
    cy.get('[data-testid="navigation-language-select"] .mat-select-value-text span').eq(0).should('contain', 'EN');
};

export const checkNavigationFooter = () => {
    cy.get('[data-testid="navigation-footer-links"] a').eq(0).find('svg').should('be.visible');
    cy.get('[data-testid="navigation-footer-links"] a').eq(0).get('span').should('contain', 'Github');
    cy.get('[data-testid="navigation-footer-links"] a').eq(1).find('svg').should('be.visible');
    cy.get('[data-testid="navigation-footer-links"] a').eq(1).get('span').should('contain', 'Twitter');
    cy.get('[data-testid="navigation-footer-links"] a').eq(2).find('svg').should('be.visible');
    cy.get('[data-testid="navigation-footer-links"] a').eq(2).get('span').should('contain', 'Youtube');
    cy.get('[data-testid="footer-year"]').should(
        'contain',
        new Date().getFullYear().toString()
    );

};

export const checkFeatures = () => {
    cy.fixture('features').then((data) => {
        const features = data.data;
        let counter = 0;
        cy.get('[data-testid="features-features"] mat-card').each(($el, index) => {
            cy.wrap($el).get('mat-card-title').should('contain', features[index].name);
            cy.wrap($el).get('mat-card-title code').should('contain', features[index].version);
            cy.wrap($el).get('mat-card-subtitle').should('contain', features[index].description);
            if (features[index].github) {
                cy.wrap($el).get('mat-card-actions a').eq(counter).find('svg').should('be.visible');
                cy.wrap($el).get('mat-card-actions a').eq(counter).should('have.attr', 'href').and('include', features[index].github);
                counter = counter + 1;
                cy.wrap($el).get('mat-card-actions a').eq(counter).find('svg').should('be.visible');
                cy.wrap($el).get('mat-card-actions a').eq(counter).should('contain', 'Docs');
                cy.wrap($el).get('mat-card-actions a')
                    .eq(counter).should('have.attr', 'href').and('include', features[index].documentation);
                counter = counter + 1;
                if (features[index].medium) {
                    cy.wrap($el).get('mat-card-actions a').eq(counter).find('svg').should('be.visible');
                    cy.wrap($el).get('mat-card-actions a').eq(counter).should('contain', 'Guide');
                    cy.wrap($el).get('mat-card-actions a')
                        .eq(counter).should('have.attr', 'href').and('include', features[index].medium);
                    counter = counter + 1;
                }
            } else if (!features[index].github) {
                cy.wrap($el).get('mat-card-actions a').eq(counter).find('svg').should('be.visible');
                cy.wrap($el).get('mat-card-actions a').eq(counter).should('contain', 'Docs');
                cy.wrap($el).get('mat-card-actions a')
                    .eq(counter).should('have.attr', 'href').and('include', features[index].documentation);
                counter = counter + 1;
                if (features[index].medium) {
                    cy.wrap($el).get('mat-card-actions a').eq(counter).find('svg').should('be.visible');
                    cy.wrap($el).get('mat-card-actions a').eq(counter).should('contain', 'Guide');
                    cy.wrap($el).get('mat-card-actions a')
                        .eq(counter).should('have.attr', 'href').and('include', features[index].medium);
                    counter = counter + 1;
                }
            }
        });
    });
};

export const checkTitle = (title) => {
    const finalTitle = `${title} - Angular pet api`;
    cy.title().should('include', finalTitle);
};

export const checkGetPets = () => {
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
    cy.visit('/pets');
    cy.get('[data-testid="pets-create-button"]').click();
    cy.url().should('include', '/pets/create');
};

export const checkGetPet = () => {
    cy.get('[data-testid="pets-view"] mat-card mat-card-actions button').eq(0).children('span').should('contain', 'BACK');
    cy.get('[data-testid="pets-view"] mat-card mat-card-actions button').eq(1).children('span').should('contain', 'EDIT');
    cy.get('[data-testid="pets-view"] mat-card mat-card-actions button').eq(2).children('span').should('contain', 'DELETE');
};


// Transversal Commands

// Integration Commands
Cypress.Commands.add('features', checkFeatures);
Cypress.Commands.add('getPets', checkGetPets);
Cypress.Commands.add('getPet', checkGetPet);
Cypress.Commands.add('navigationHeader', checkNavigationHeader);
Cypress.Commands.add('navigationFooter', checkNavigationFooter);
Cypress.Commands.add('validateTitle', checkTitle);
/**
 * Uploads a file to an input
 * @memberOf Cypress.Chainable#
 * @name upload_file
 * @function
 * @param {String} selector - element to target
 * @param {String} fileUrl - The file url to upload
 * @param {String} type - content type of the uploaded file
 */
Cypress.Commands.add('uploadFile', (selector, fileUrl, type = '') => {
    return cy.get(selector).then(subject => {
        return cy
            .fixture(fileUrl, 'base64')
            .then(Cypress.Blob.base64StringToBlob)
            .then(blob => {
                return cy.window().then(win => {
                    const el = subject[0];
                    const nameSegments = fileUrl.split('/');
                    const name = nameSegments[nameSegments.length - 1];
                    const testFile = new File([blob], name, { type });
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(testFile);
                    el.files = dataTransfer.files;
                    return subject;
                });
            });
    });
});
